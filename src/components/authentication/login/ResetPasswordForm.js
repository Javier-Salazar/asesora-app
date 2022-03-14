import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

function ResetPasswordForm({func}) {
    const navigate = useNavigate();

    const RegisterSchema = Yup.object().shape({
        email: Yup.string()
        .email('El correo electrónico debe ser una dirección válida')
        .required('El correo electrónico es obligatorio')
    });

    const formik = useFormik({
        initialValues: {
        email: ''
        },
        validationSchema: RegisterSchema,
        onSubmit: () => {
            
        }
    });

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