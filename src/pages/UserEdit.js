import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, } from 'react';
import * as Yup from 'yup';
import { sentenceCase } from 'change-case';
import styled from '@emotion/styled';
import { Card, Stack, Avatar, Container, Typography, TextField, Switch } from '@mui/material';
import Page from '../components/Page';
import { LoadingButton } from '@mui/lab';
import Label from '../components/Label';
import { useFormik, Form, FormikProvider } from 'formik';
import Scrollbar from '../components/Scrollbar';
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

function UserEdit({ status }) {
  var params = useParams();
  var idUser = params.userID;

  const baseUrl = `https://localhost:44397/api/users/${idUser}`;

  const [user, setUser] = useState({
    userx_code: "",
    userx_name: "",
    userx_lastname: "",
    userx_mother_lastname: "",
    userx_email: "",
    userx_password: "",
    userx_salt: "",
    userx_remember: "",
    userx_phone: "",
    userx_type: "",
    userx_istmp_password: "",
    userx_date: "",
    userx_islockedout: "",
    userx_islockedout_date: "",
    userx_islockedout_enable_date: "",
    userx_last_login_date: "",
    userx_lastfailed_login_date: "",
    userx_status: "",
    userx_image: ""
  });

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
  status = 'activo';

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
    console.log(user);
  }


  const [admin, setAdmin] = useState(false);
  const [advisor, setAdvisor] = useState(false);
  const [accountStatus, setStatus] = useState(status);
  const [phone, setPhone] = useState('');


  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'El nombre es muy corto')
      .max(30, 'El nombre es muy largo')
      .required('El nombre es obligatorio'),
    lastName: Yup.string()
      .min(2, 'El apellido es muy corto')
      .max(30, 'El apellido es muy largo')
      .required('El apellido es obligatorio'),
    motherLastName: Yup.string()
      .min(2, "El apellido es muy corto")
      .max(30, "El apellido es muy largo"),
    email: Yup.string()
      .email('El correo electrónico debe ser una dirección válida')
      .required('El correo electrónico es obligatorio')
      .matches(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@itcj.edu.mx/,
        'Ingrese su correo institucional, por ejemplo: user@itcj.edu.mx'),
    phone: Yup.string()
      .matches(/[0-9]+/, "Ingrese solamente números")
      .min(7, 'El telefono es muy corto')
      .max(10, 'El telefono es muy largo')
  });

  const formik = useFormik({
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/');
    }
  });

  const handleInput = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
    console.log(phone);
  };

  function formatPhoneNumber(value) {
    if (!value) {
      return value;
    }

    const phoneNumber = value.replace(/[^\d]/g, '');

    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 3) {
      return phoneNumber;
    }

    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }

    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  }

  const { errors, touched, handleSubmit, isSubmitting } = formik;
  return (
    <Page title="AsesoraApp | Editar Usuario">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Editar usuario
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
                color={(accountStatus === 'inactivo' && 'error') || 'success'}
              >
                {sentenceCase(accountStatus)}
              </Label>
            </div>

            <Avatar src={`data:image/png;base64, ${user.userx_image}`} alt="image" sx={{ width: '106px', height: '106px', margin: 'auto' }} />

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
              <Switch sx={{ pl: 2 }} onChange={() => setStatus(accountStatus === 'I' ? 'A' : 'I')} checked={accountStatus === 'I' ? false : true} />
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
                  Activar convertir en asesor
                </Typography>
              </div>
              <Switch sx={{ pl: 2 }} onChange={() => { setAdvisor(!advisor); setAdmin(false); }} checked={advisor} />
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
                  Activar convertir en adnimistrador
                </Typography>
              </div>
              <Switch sx={{ pl: 2 }} onChange={() => { setAdmin(!admin); setAdvisor(false); }} checked={admin} />
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
                        value={user.userx_code}
                        disabled
                      />

                      <TextField
                        fullWidth
                        name="userx_email"
                        value={user.userx_email}
                        onChange={handleChange}
                        type="email"
                        label="Correo electrónico"
                        //{...getFieldProps('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Stack>

                    <TextField
                      fullWidth
                      label="Nombre"
                      name='userx_name'
                      value={user.userx_name}
                      onChange={handleChange}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField
                        fullWidth
                        label="Apellido paterno"
                        value={user.userx_lastname}
                        error={Boolean(touched.lastName && errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                      />

                      <TextField
                        fullWidth
                        label="Apellido materno"
                        value={user.userx_mother_lastname}
                        error={Boolean(touched.motherLastName && errors.motherLastName)}
                        helperText={touched.motherLastName && errors.motherLastName}
                      />
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField
                        fullWidth
                        type="password"
                        label="Contraseña"
                        disabled
                        value={"Password"}
                      />

                      <TextField
                        fullWidth
                        label="Teléfono"
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        value={user.userx_phone}
                        error={Boolean(touched.phone && errors.phone)}
                        helperText={touched.phone && errors.phone}
                      />
                    </Stack>

                    <Stack style={{ display: 'flex', alignItems: 'flex-end' }}>
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                        style={{ width: 'fit-content' }}
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