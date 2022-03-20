import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useState } from 'react';
import { sentenceCase } from 'change-case';
import styled from '@emotion/styled';
import { Card, Stack, Avatar, Container, Typography, TextField, Switch } from '@mui/material';
import Page from '../components/Page';
import { LoadingButton } from '@mui/lab';
import Label from '../components/Label';
import { useFormik, Form, FormikProvider } from 'formik';
import Scrollbar from '../components/Scrollbar';

const ContainerStyle = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center'
    }
}));

function UserEdit({status}) {
  status = 'inactivo';
  const [admin, setAdmin] = useState(false);
  const [advisor, setAdvisor] = useState(false);
  const [accountStatus, setStatus] = useState(status);
  
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'El nombre es muy corto')
      .max(30, 'El nombre es muy largo')
      .required('El nombre es obligatorio'),
    lastName: Yup.string()
      .min(2, 'El apellido es muy corto')
      .max(30, 'El apellido es muy largo')
      .required('El apellido es obligatorio'),
    email: Yup.string()
      .email('El correo electrónico debe ser una dirección válida')
      .required('El correo electrónico es obligatorio'),
    password: Yup.string()
      .required('La contraseña es obligatoria'),
    phone: Yup.string()
      .min(2, 'El telefono es muy corto')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/');
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  return (
    <Page title="AsesoraApp | Mi perfil">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Mi perfil
          </Typography>
        </Stack>

        <ContainerStyle>
            <Card sx={ theme => ({
                width: '32%',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                [theme.breakpoints.down('md')]: {
                    width: '100%',
                    marginBottom: '24px'
                }
            })}>
              <div style={{width: '100%', display: 'flex', flexDirection: 'row-reverse', marginBottom: '24px'}}>
                <Label
                    variant="ghost"
                    color={(accountStatus === 'inactivo' && 'error') || 'success'}
                >
                    {sentenceCase(accountStatus)}
                </Label>
              </div>

              <Avatar sx={{width: '106px', height: '106px', margin: 'auto'}} />

              <div style={{width: '100%', display: 'flex', justifyContent: 'center',
                alignItems: 'center', marginTop: '16px', marginBottom: '8px'
              }}>
                <Typography variant='caption' sx={{width: '70%', wordWrap: 'break-word', textAlign: 'center'}}>
                  Permitido *.jpeg, *.jpg, *.png tamaño maximo de 3 MB
                </Typography>
                  
              </div>

              <div style={{width: '100%', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginTop: '24px'
              }}>
                <div style={{display: 'flex', flexDirection: 'column', maxWidth: '80%'}}>
                  <Typography variant='subtitle2' sx={{wordWrap: 'break-word'}}>
                    Estatus
                  </Typography>
                  <Typography variant='body2' sx={{wordWrap: 'break-word'}}>
                    Definir el estado de la cuenta
                  </Typography>
                </div>
                <Switch sx={{pl: 2}} onChange={() => setStatus(accountStatus === 'inactivo' ? 'activo' : 'inactivo')} checked={accountStatus === 'inactivo' ? false : true}/>
              </div>

              <div style={{width: '100%', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginTop: '24px'
              }}>
                <div style={{display: 'flex', flexDirection: 'column', maxWidth: '80%'}}>
                  <Typography variant='subtitle2' sx={{wordWrap: 'break-word'}}>
                    Asesor
                  </Typography>
                  <Typography variant='body2' sx={{wordWrap: 'break-word'}}>
                    Activar convertir en asesor
                  </Typography>
                </div>
                <Switch sx={{pl: 2}} onChange={() => {setAdvisor(!advisor); setAdmin(false);}} checked={advisor}/>
              </div>

              <div style={{width: '100%', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginTop: '24px'
              }}>
                <div style={{display: 'flex', flexDirection: 'column', maxWidth: '80%'}}>
                  <Typography variant='subtitle2' sx={{wordWrap: 'break-word'}}>
                    Administrador
                  </Typography>
                  <Typography variant='body2' sx={{wordWrap: 'break-word'}}>
                    Activar convertir en adnimistrador
                  </Typography>
                </div>
                <Switch sx={{pl: 2}} onChange={() => {setAdmin(!admin); setAdvisor(false);}} checked={admin}/>
              </div>
                
            </Card>

            <Card sx={ theme => ({
                width: '66%',
                [theme.breakpoints.down('md')]: {
                    width: '100%'
                }
            })}>
            <Scrollbar>
                <FormikProvider value={formik} sx={{padding: '24px'}}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Stack spacing={2} sx={{padding: '24px'}}>
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
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
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
                                label="Contraseña"
                                disabled
                                {...getFieldProps('password')}
                              />
                              
                              <TextField
                                fullWidth
                                label="Teléfono"
                                {...getFieldProps('phone')}
                                error={Boolean(touched.phone && errors.phone)}
                                helperText={touched.phone && errors.phone}
                              />
                          </Stack>

                          <Stack style={{display: 'flex', alignItems: 'flex-end'}}>
                            <LoadingButton
                              type="submit"
                              variant="contained"
                              loading={isSubmitting}
                              style={{width: 'fit-content'}}
                            >
                              Guardar cambios
                            </LoadingButton>
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

export default UserEdit;