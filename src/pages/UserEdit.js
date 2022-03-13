import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useState } from 'react';
import { sentenceCase } from 'change-case';
import styled from '@emotion/styled';
import { Card, Stack, Avatar, Button, Checkbox, Container, Typography, TextField,
    IconButton, InputAdornment } from '@mui/material';
import Page from '../components/Page';
import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import Label from '../components/Label';
import { useFormik, Form, FormikProvider } from 'formik';
import Scrollbar from '../components/Scrollbar';
import USERLIST from '../_mocks_/user';

//Esto es un comentario de prueba
const TABLE_HEAD = [
  { id: 'name', label: 'Nombre', alignRight: false },
  { id: 'email', label: 'Correo', alignRight: false },
  { id: 'role', label: 'Tipo de usuario', alignRight: false },
  { id: 'userCode', label: 'Código', alignRight: false },
  { id: 'status', label: 'Estatus', alignRight: false },
  { id: '' }
];

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
    status = 'inactivo'

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

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
      .required('La contraseña es obligatoria')
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
      navigate('#', { replace: true });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  return (
    <Page title="AsesoraApp | Editar Usuario">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Editar usuario
          </Typography>
        </Stack>

        <ContainerStyle>
            <Card sx={ theme => ({
                width: '32%',
                padding: '24px',
                [theme.breakpoints.down('md')]: {
                    width: '100%',
                    marginBottom: '24px'
                }
            })}>
                <Label
                    variant="ghost"
                    color={(status === 'inactivo' && 'error') || 'success'}
                >
                    {sentenceCase(status)}
                </Label>
                
            </Card>

            <Card sx={ theme => ({
                width: '66%',
                padding: '24px',
                [theme.breakpoints.down('md')]: {
                    width: '100%'
                }
            })}>
            <Scrollbar>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <TextField
                            fullWidth
                            label="Nombre"
                            {...getFieldProps('firstName')}
                            error={Boolean(touched.firstName && errors.firstName)}
                            helperText={touched.firstName && errors.firstName}
                            />

                            <TextField
                            fullWidth
                            label="Apellido"
                            {...getFieldProps('lastName')}
                            error={Boolean(touched.lastName && errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                            />
                        </Stack>

                        <TextField
                            fullWidth
                            autoComplete="username"
                            type="email"
                            label="Correo electrónico"
                            {...getFieldProps('email')}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                        />

                        <TextField
                            fullWidth
                            autoComplete="current-password"
                            type={showPassword ? 'text' : 'password'}
                            label="Contraseña"
                            {...getFieldProps('password')}
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                                </IconButton>
                                </InputAdornment>
                            )
                            }}
                            error={Boolean(touched.password && errors.password)}
                            helperText={touched.password && errors.password}
                        />

                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                        >
                            Registrarse
                        </LoadingButton>
                        </Stack>
                    </Form>
                </FormikProvider>
                <Button variant="contained">
                    Guardar cambios
                </Button>
            </Scrollbar>
            </Card>
        </ContainerStyle>
      </Container>
    </Page>
  );
}

export default UserEdit;