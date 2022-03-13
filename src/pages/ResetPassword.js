import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import Page from '../components/Page';
import { Stack, TextField, Button, Container, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

function ResetPassword({email}) {
    const RootStyle = styled(Page)(({ theme }) => ({
        [theme.breakpoints.up('md')]: {
          display: 'flex'
        }
    }));

    const SectionStyle = styled('div')(({ theme }) => ({
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }));
  
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
    //   navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <RootStyle title="AsesoraApp | Restablecer contraseña">
        <SectionStyle>
            <Container maxWidth="sm">
                <Typography variant="h3" sx={{mb: 2}}>
                    ¿Olvidaste tu contraseña?
                </Typography>
                <Typography variant="body1" sx={{mb: 4}}>
                Introduce la dirección de correo electrónico asociada a tu cuenta y 
                te enviaremos un enlace para restablecer tu contraseña.
                </Typography>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                autoComplete="username"
                                type="email"
                                label="Correo electrónico"
                                value={email}
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
            </Container>
        </SectionStyle>
    </RootStyle>
  );
}

export default ResetPassword;