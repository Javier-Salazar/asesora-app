import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import emailjs from '@emailjs/browser';

function ResetPasswordForm({ func }) {
    const navigate = useNavigate();
    const RegisterSchema = Yup.object().shape({
        email: Yup.string()
            .email('El correo electrónico debe ser una dirección válida')
            .required('El correo electrónico es obligatorio')
            .matches(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@itcj.edu.mx/,
                'Ingrese su correo institucional, por ejemplo: user@itcj.edu.mx')
    });

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: RegisterSchema,
        onSubmit: () => {
            if (searchUser(getFieldProps('email').value)) {
                console.log('Encuentra el correo');
                //emailjs.send('service_r1b24ph', 'template_rmxjflb', templateParams[0], 'bpH5lyWRIbIT4L-oh');
            } else {
                console.log('No encuentra el correo');
            }
        }
    });

    const baseUrl = "https://localhost:44397/api/";
    const [data, setData] = useState([]);

    const peticionesGet = async () => {
        await axios.get(`${baseUrl}users`)
            .then((Response) => {
                setData(Response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        peticionesGet();
    }, []);


    const templateParams = [];

    const searchUser = (finded) => {
        var isFind = false;
        data.filter((element) => {
            if (element.userx_email.toLowerCase() === finded.toLowerCase()) {
                isFind = true;
                templateParams[0] = {
                    name: element.userx_name,
                    password: decryptPassword(element.userx_password, element.userx_salt),
                    email: element.userx_email
                }
            }
            return 0;
        });
        return isFind;
    };

    const decryptPassword = (text, key) => {
        var bytes = CryptoJS.AES.decrypt(text, key);
        var decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedText;
    }

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

    func(isSubmitting, 'formik');

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        autoComplete="email"
                        type="email"
                        label="Correo electrónico"
                        {...getFieldProps('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />

                    <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                    >
                        Restablecer contraseña
                    </LoadingButton>
                    <Button
                        fullWidth
                        size="large"
                        variant="text"
                        role="link"
                        onClick={() => {
                            navigate('/login');
                        }}
                    >
                        Regresar
                    </Button>
                </Stack>
            </Form>
        </FormikProvider>
    );
}

export default ResetPasswordForm;