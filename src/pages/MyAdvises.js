import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { sentenceCase } from 'change-case';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { Card, Stack, Avatar, Container, Typography, TextField, Switch, Snackbar, Alert } from '@mui/material';
import Page from '../components/Page';
import { LoadingButton } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
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

function changeLabelModality(bool) {
  if (bool) {
    return sentenceCase('virtual');
  } else {
    return sentenceCase('presencial');
  }
}

function MyAdvises() {
//   const cookies = new Cookies();
  const navigate = useNavigate();

  const [modality, setModality] = useState(false);
  const [showAlert, setShowAlert] = useState({ message: '', show: false });
  const [showAlertPost, setShowAlertPost] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (newValue) => {
    setValue(newValue);
  }

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
      lastName: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {

    },
  });

  function clearData() {
    setFieldValue("firstName", "", false);
    setShowAlert({ message: '', show: false });
    setShowAlertPost(false);
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
                {changeLabelModality(modality)}
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
                        label="Nombre"
                        value="Margarita Bailón"
                        disabled
                      />
                      
                      <TextField
                        fullWidth
                        label="Escuela"
                        disabled
                        {...getFieldProps('school')}
                      />

                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          renderInput={(props) => <TextField fullWidth {...props} />}
                          label="Fecha de inicio"
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          ampm={false}
                        />
                        
                        <DateTimePicker
                          renderInput={(props) => <TextField fullWidth {...props} />}
                          label="Fecha de fin"
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          ampm={false}
                        />
                      </LocalizationProvider>
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField
                        fullWidth
                        label="Materia"
                        {...getFieldProps('subject')}
                        error={Boolean(touched.subject && errors.subject)}
                        helperText={touched.subject && errors.subject}
                      />

                      <TextField
                        fullWidth
                        label="Tema"
                        {...getFieldProps('topic')}
                      />
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField
                        fullWidth
                        label="Etiqueta uno"
                        {...getFieldProps('tag1')}
                        error={Boolean(touched.tag1 && errors.tag1)}
                        helperText={touched.tag1 && errors.tag1}
                      />

                      <TextField
                        fullWidth
                        label="Etiqueta dos"
                        {...getFieldProps('tag2')}
                        error={Boolean(touched.tag2 && errors.tag2)}
                        helperText={touched.tag2 && errors.tag2}
                      />
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField
                        fullWidth
                        label="Etiqueta tres"
                        {...getFieldProps('tag3')}
                        error={Boolean(touched.tag3 && errors.tag3)}
                        helperText={touched.tag3 && errors.tag3}
                      />

                      <TextField
                        fullWidth
                        label="Etiqueta cuatro"
                        {...getFieldProps('tag4')}
                        error={Boolean(touched.tag4 && errors.tag4)}
                        helperText={touched.tag4 && errors.tag4}
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

export default MyAdvises;