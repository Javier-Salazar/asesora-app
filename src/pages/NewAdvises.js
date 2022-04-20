import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { sentenceCase } from 'change-case';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { Card, Stack, Avatar, Container, Typography, TextField, Switch, Snackbar, Alert } from '@mui/material';
import Page from '../components/Page';
import { LoadingButton } from '@mui/lab';
import Label from '../components/Label';
import { useFormik, Form, FormikProvider } from 'formik';
import Scrollbar from '../components/Scrollbar';
import MockImgAvatar from '../utils/mockImages';
import axios from "axios";
import CryptoJS from 'crypto-js';

const ContainerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

function changeLabelStatus(bool) {
  if (bool) {
    return sentenceCase('virtual');
  } else {
    return sentenceCase('presencial');
  }
}

function NewAdvises() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const date = new Date();

  const [admin, setAdmin] = useState(false);
  const [advisor, setAdvisor] = useState(false);
  const [modality, setModality] = useState(false);
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState({ message: '', show: false });
  const [showAlertPost, setShowAlertPost] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

//   const baseUrl = "https://localhost:44397/api/";

//   const peticionesGet = async () => {
//     await axios.get(`${baseUrl}users`)
//       .then((Response) => {
//         setData(Response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   useEffect(() => {
//     peticionesGet();
//   }, []);

//   useEffect(() => {
//     if (!cookies.get('UserCode')) {
//       navigate('/');
//     }
//   });

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'El nombre es muy corto')
      .max(30, 'El nombre es muy largo')
      .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/, "Ingrese solamente letras")
      .required('El nombre es obligatorio')
  });
  
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      motherLastName: '',
      email: '',
      school: 'Instituto Tecnológico de Ciudad Juárez',
      dateRegister: date.toLocaleString().split(' ', 1),
      password: '',
      phone: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      searchUser();
      validateUserType();

      if (isFind === false) {
        if (advisor === false && admin === false) {
          if (isTypeAorS) {
            setShowAlert({
              message: 'Selecciona el tipo de cuenta',
              show: true,
            });
            setOpen(true);
          } else {
            // peticionPostUser('N');
          }
        }
      }
      else {
        setShowAlert({
          message: 'Ya existe una cuenta asociada al correo electrónico ingresado',
          show: true,
        });
        setOpen(true);
      }
    },
  });

  var isFind = false;
  const searchUser = () => {
    data.filter((element) => {
      if (element.userx_email.toLowerCase() === email.toLowerCase()) {
        isFind = true;
      }
      return 0;
    });
  };

  var isTypeAorS = false;
  function validateUserType() {
    var Aux = email.split('@');
    var code = Aux[0].slice(1);
    if (email.charAt(0) === "l" && /^[0-9]*$/.test(code)) {
      isTypeAorS = false;
    } else {
      isTypeAorS = true;
    }
  }

  function clearData() {
    setEmail("");
    setFieldValue("firstName", "", false);
    setFieldValue("lastName", "", false);
    setFieldValue("motherLastName", "", false);
    setFieldValue("phone", "", false);
    setFieldValue("password", "", false);
    setShowAlert({ message: '', show: false });
    setShowAlertPost(false);
    setAdmin(false);
    setAdvisor(false);
    setModality(false);
  }

//   const peticionPostUser = async (type) => {
//     var arrayCode = email.split('@');
//     var arrayDate = date.toISOString().split('T');
//     await axios.post(`${baseUrl}users`, {
//       userx_code: arrayCode[0],
//       userx_name: getFieldProps("firstName").value,
//       userx_lastname: getFieldProps("lastName").value,
//       userx_mother_lastname: getFieldProps("motherLastName").value,
//       userx_email: email,
//       userx_password: encryptPassword(getFieldProps("password").value),
//       userx_salt: key,
//       userx_remember: "N",
//       userx_phone: getFieldProps("phone").value,
//       userx_type: type,
//       userx_istmp_password: "N",
//       userx_date: arrayDate[0],
//       userx_islockedout: "N",
//       userx_islockedout_date: arrayDate[0],
//       userx_islockedout_enable_date: arrayDate[0],
//       userx_last_login_date: arrayDate[0],
//       userx_lastfailed_login_date: arrayDate[0],
//       userx_status: accountStatus ? 'A' : 'I',
//       userx_image: ""
//     })
//       .then((response) => {
//         if (type === 'N') {
//           peticionPostStudent();
//         } else if (type === 'A') {
//           peticionPostAdvisor();
//         } else {
//           clearData();
//           setShowAlertPost(true);
//           setOpen(true);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const peticionPostStudent = async () => {
//     var arrayCode = email.split('@');

//     await axios.post(baseUrl + "students", {
//       student_code: arrayCode[0],
//       student_school: "ITCJC1",
//       student_career: "SINCS",
//       student_major: "SINES",
//       student_semester: 1,
//       student_status: accountStatus ? 'A' : 'I',
//     })
//       .then((response) => {
//         clearData();
//         setShowAlertPost(true);
//         setOpen(true);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const peticionPostAdvisor = async () => {
//     var arrayCode = email.split('@');

//     await axios.post(`${baseUrl}advisors`, {
//       advisor_code: arrayCode[0],
//       advisor_rating: 5,
//       advisor_comments: "",
//       advisor_status: accountStatus ? 'A' : 'I',
//     })
//       .then((response) => {
//         clearData();
//         setShowAlertPost(true);
//         setOpen(true);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const { errors, touched, handleSubmit, getFieldProps, setFieldValue } = formik;

  return (
    <Page title="AsesoraApp | Mis Asesorías">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Agregar Asesoría
          </Typography>
        </Stack>

        <ContainerStyle>
          <Card sx={theme => ({
            width: '32%',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.down('md')]: {
              width: '100%',
              marginBottom: '24px'
            }
          })}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row-reverse', marginBottom: '24px' }}>
              <Label
                variant="ghost"
                color={(modality === false && 'default') || 'virtual'}
              >
                {changeLabelStatus(modality)}
              </Label>
            </div>

            <Avatar src={`data:image/png;base64,${MockImgAvatar()}`} sx={{ width: '106px', height: '106px', margin: 'auto' }} />

            <div style={{
              width: '100%', display: 'flex', justifyContent: 'center',
              alignItems: 'center', marginTop: '16px', marginBottom: '8px'
            }}>

            </div>

            <div style={{
              width: '100%', display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginTop: '24px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '80%' }}>
                <Typography variant='subtitle2' sx={{ wordWrap: 'break-word' }}>
                  Modalidad
                </Typography>
                <Typography variant='body2' sx={{ wordWrap: 'break-word' }}>
                  Definir la modalidad de la asesoría
                </Typography>
              </div>
              <Switch sx={{ pl: 2 }} onChange={() => setModality(!modality)} checked={modality} />
            </div>

          </Card>

          <Card sx={theme => ({
            width: '66%',
            [theme.breakpoints.down('md')]: {
              width: '100%'
            }
          })}>
            <Scrollbar>
              <FormikProvider value={formik} sx={{ padding: '24px' }}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                  <Stack spacing={2} sx={{ padding: '24px' }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField
                        fullWidth
                        label="Clave"
                        value={email.split('@', 1)}
                        disabled
                      />

                      <TextField
                        fullWidth
                        id="email"
                        name="email"
                        type="email"
                        label="Correo electrónico"
                        value={email}
                        onChange={handleChange}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField
                        fullWidth
                        label="Escuela"
                        disabled
                        {...getFieldProps('school')}
                      />

                      <TextField
                        fullWidth
                        label="fecha de registro"
                        disabled
                        {...getFieldProps('dateRegister')}
                      />
                    </Stack>

                    <TextField
                      fullWidth
                      label="Nombre"
                      {...getFieldProps('firstName')}
                      error={Boolean(touched.firstName && errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField
                        fullWidth
                        label="Apellido paterno"
                        {...getFieldProps('lastName')}
                        error={Boolean(touched.lastName && errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                      />

                      <TextField
                        fullWidth
                        label="Apellido materno"
                        {...getFieldProps('motherLastName')}
                      />
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField
                        fullWidth
                        type="password"
                        label="Contraseña"
                        {...getFieldProps('password')}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                      />

                      <TextField
                        fullWidth
                        label="Teléfono"
                        {...getFieldProps('phone')}
                        error={Boolean(touched.phone && errors.phone)}
                        helperText={touched.phone && errors.phone}
                      />
                    </Stack>

                    <Stack style={{ display: 'flex', alignItems: 'flex-end' }}>
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        style={{ width: 'fit-content' }}
                      >
                        Guardar cambios
                      </LoadingButton>
                      {
                        showAlertPost
                        ?
                          <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%', boxShadow: 10 }}>
                              Se ha registrado con éxito
                            </Alert>
                          </Snackbar>
                        :
                          null
                      }
                      {
                        showAlert.show
                        ?
                          <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error" sx={{ width: '100%', boxShadow: 10 }}>
                              {showAlert.message}
                            </Alert>
                          </Snackbar>
                        :
                          null
                      }
                    </Stack>
                  </Stack>
                </Form>
              </FormikProvider>
            </Scrollbar>
          </Card>
        </ContainerStyle>
      </Container>
    </Page>
  );
}

export default NewAdvises;