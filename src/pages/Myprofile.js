import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { Card, Stack, Avatar, Container, Typography, TextField, Switch, Snackbar, Alert } from '@mui/material';
//import { Autocomplete } from '@mui/material';
import Page from '../components/Page';
import { LoadingButton } from '@mui/lab';
import Label from '../components/Label';
import { useFormik, Form, FormikProvider } from 'formik';
import Scrollbar from '../components/Scrollbar';
import Cookies from 'universal-cookie';
import axios from 'axios';

const ContainerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

function changeLabelStatus(text) {
  if (text === 'A') return 'Activo';
  if (text === 'I') return 'Inactivo';
}

//const options = ['Option 1', 'Option 2'];

const cookies = new Cookies();
function UserEdit({ status }) {
  const baseUrl = `https://localhost:44397/api/users/${cookies.get('UserCode')}`;
  const [user, setUser] = useState({
    userx_code: "",
    userx_name: "",
    userx_lastname: "",
    userx_mother_lastname: "",
    userx_email: "",
    userx_phone: "",
    userx_type: "",
    userx_status: "",
    userx_image: "",
    userx_date: ""
  });
  const [photo, setPhoto] = useState("");
  const [changePhoto, setChangePhoto] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [open, setOpen] = useState(false);

  const peticionesGet = async () => {
    await axios.get(baseUrl)
      .then(Response => {
        setUser(Response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    peticionesGet();
  })


  const peticionPut = async () => {
    await axios.put(baseUrl, {
      userx_code: getFieldProps("code").value,
      userx_name: getFieldProps("firstName").value,
      userx_lastname: getFieldProps("lastName").value,
      userx_mother_lastname: getFieldProps("motherLastName").value,
      userx_email: getFieldProps("email").value,
      userx_password: getFieldProps("password").value === "PasswordUser" ? user.userx_password : getFieldProps("password").value,
      userx_salt: 'N',
      userx_remember: user.userx_remember,
      userx_phone: getFieldProps("phone").value,
      userx_type: user.userx_type,
      userx_istmp_password: user.userx_istmp_password,
      userx_date: user.userx_date,
      userx_islockedout: user.userx_islockedout,
      userx_islockedout_date: user.userx_islockedout_date,
      userx_islockedout_enable_date: user.userx_islockedout_enable_date,
      userx_last_login_date: user.userx_last_login_date,
      userx_lastfailed_login_date: user.userx_lastfailed_login_date,
      userx_status: user.userx_status,
      userx_image: changePhoto ? photo : user.userx_image
    })
      .then(response => {
        setShowAlert(true);
        setOpen(true);
      }).catch(error => {
        console.log(error);
      })
  }

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'El nombre es muy corto')
      .max(30, 'El nombre es muy largo')
      .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/, "Ingrese solamente letras")
      .required('El nombre es obligatorio'),
    lastName: Yup.string()
      .min(2, 'El apellido es muy corto')
      .max(30, 'El apellido es muy largo')
      .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/, "Ingrese solamente letras")
      .required('El apellido es obligatorio'),
    motherLastName: Yup.string()
      .min(2, 'El apellido es muy corto')
      .max(30, 'El apellido es muy largo')
      .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/, "Ingrese solamente letras"),
    email: Yup.string()
      .email('El correo electrónico debe ser una dirección válida')
      .required('El correo electrónico es obligatorio'),
    password: Yup.string()
      .required('La contraseña es obligatoria')
      .min(8, "La contraseña debe contener mínimo 8 caracteres"),
    phone: Yup.string()
      .min(2, 'El telefono es muy corto')
      .max(7, 'El telefono es muy largo')
      .matches(/[0-9]/, "Ingrese solamente números")
  });


  const formik = useFormik({
    initialValues: {
      code: user.userx_code,
      firstName: user.userx_name,
      lastName: user.userx_lastname,
      motherLastName: user.userx_mother_lastname,
      email: user.userx_email,
      school: 'Instituto Tecnológico de Ciudad Juárez',
      dateRegister: (user.userx_date).split("T", 1),
      password: 'PasswordUser',
      phone: user.userx_phone
    },
    enableReinitialize: true,
    validationSchema: RegisterSchema,
    onSubmit: () => {
      peticionPut();
    }
  });


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const convertBase64 = (photo) => {
    Array.from(photo).forEach(ele => {
      var reader = new FileReader();
      reader.readAsDataURL(ele);
      reader.onload = function () {
        var arrayAux = [];
        var base64 = reader.result;
        arrayAux = base64.split(',');
        setPhoto(arrayAux[1]);
        setChangePhoto(true);
      }
    })
  }

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  return (
    <Page title="AsesoraApp | Mi perfil">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Mi perfil
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
                color={(user.userx_status === 'I' && 'error') || 'success'}
              >
                {changeLabelStatus(user.userx_status)}
              </Label>
            </div>

            {
              changePhoto ?
                <Avatar src={'data:image/png;base64,' + photo} sx={{ width: '106px', height: '106px', margin: 'auto' }} />
                :
                <Avatar src={'data:image/png;base64,' + user.userx_image} sx={{ width: '106px', height: '106px', margin: 'auto' }} />

            }

            <input accept="image/*" id="icon-button-file" type="file" width="32px" onChange={(e) => convertBase64(e.target.files)} />

            <div style={{
              width: '100%', display: 'flex', justifyContent: 'center',
              alignItems: 'center', marginTop: '16px', marginBottom: '8px'
            }}>
              <Typography variant='caption' sx={{ width: '70%', wordWrap: 'break-word', textAlign: 'center' }}>
                Permitido *.jpeg, *.jpg, *.png tamaño maximo de 3 MB
              </Typography>

            </div>

            <div style={{
              width: '100%', display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginTop: '24px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '80%' }}>
                <Typography variant='subtitle2' sx={{ wordWrap: 'break-word' }}>
                  Estatus
                </Typography>
                <Typography variant='body2' sx={{ wordWrap: 'break-word' }}>
                  Definir el estado de la cuenta
                </Typography>
              </div>
              <Switch sx={{ pl: 2 }} checked={user.userx_status === 'I' ? false : true} disabled />
            </div>

            <div style={{
              width: '100%', display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginTop: '24px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '80%' }}>
                <Typography variant='subtitle2' sx={{ wordWrap: 'break-word' }}>
                  Asesor
                </Typography>
                <Typography variant='body2' sx={{ wordWrap: 'break-word' }}>
                  Esta cuenta es asesor
                </Typography>
              </div>
              <Switch sx={{ pl: 2 }} checked={user.userx_type === 'A' ? true : false} disabled />
            </div>

            <div style={{
              width: '100%', display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginTop: '24px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '80%' }}>
                <Typography variant='subtitle2' sx={{ wordWrap: 'break-word' }}>
                  Administrador
                </Typography>
                <Typography variant='body2' sx={{ wordWrap: 'break-word' }}>
                  Esta cuenta es administrador
                </Typography>
              </div>
              <Switch sx={{ pl: 2 }} checked={user.userx_type === 'S' ? true : false} disabled />
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
                        {...getFieldProps('code')}
                        disabled
                      />

                      <TextField
                        fullWidth
                        type="email"
                        label="Correo electrónico"
                        {...getFieldProps('email')}
                        disabled
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
                    {/** 
                          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                              <Autocomplete
                                fullWidth
                                disablePortal
                                options={options}
                                renderInput={(params) => <TextField {...params} label="Carrera" />}
                              />
                              
                              <Autocomplete
                                fullWidth
                                disablePortal
                                options={options}
                                renderInput={(params) => <TextField {...params} label="Especialidad" />}
                              />
                          </Stack>
*/}
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
                    </Stack>
                  </Stack>
                </Form>
              </FormikProvider>
              {
                showAlert ?
                  <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                      ¡Se guardaron los cambios con éxito!
                    </Alert>
                  </Snackbar>
                  :
                  null
              }
            </Scrollbar>
          </Card>
        </ContainerStyle>
      </Container>
    </Page>
  );
}

export default UserEdit;