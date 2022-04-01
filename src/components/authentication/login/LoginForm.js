import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel, Snackbar, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from "axios";
import CryptoJS from 'crypto-js';
import Cookies from 'universal-cookie';

function LoginForm() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("El correo electrónico debe ser una dirección válida")
      .required("El correo electrónico es obligatorio")
      .matches(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@itcj.edu.mx/,
        'Ingrese su correo institucional, por ejemplo: user@itcj.edu.mx'),
    password: Yup.string()
      .required('La contraseña es obligatoria')
  });

  const baseUrl = "https://localhost:44397/api/users";
  const [showAlert, setShowAlert] = useState({ message: '', show: false });
  const [open, setOpen] = useState(false);


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      const Url = `${baseUrl}/${getFieldProps("email").value.split('@', 1)}`;
      axios.get(Url)
        .then(Response => {
          if (decryptPassword(Response.data.userx_password, Response.data.userx_salt) === getFieldProps("password").value) {
            cookies.set('UserCode', Response.data.userx_code, { path: '/' });
            cookies.set('UserType', Response.data.userx_type, { path: '/' });
            navigate('/dashboard', { replace: true });
          } else {
            setShowAlert({
              message: 'Datos erróneos. Por favor, inténtelo otra vez',
              show: true,
            });
            setOpen(true);
          }
        }).catch(error => {
          setShowAlert({
            message: 'El correo ingresado no se encuentra registrado',
            show: true,
          });
          setOpen(true);
        })
    },
  });

  const decryptPassword = (text, key) => {
    var bytes = CryptoJS.AES.decrypt(text, key);
    var decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedText;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setShowAlert(false);
  };


  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
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
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember}
              style={{ borderRadius: 12 }} />}
            label="Recuérdame"
          />

          <Link to="/reset-password" target="_self" rel="noopener" component={RouterLink} variant="subtitle2">
            ¿Olvidaste tú contraseña?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Iniciar sesión
        </LoadingButton>
        {
          showAlert.show
            ?
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {showAlert.message}
              </Alert>
            </Snackbar>
            :
            null
        }
      </Form>
    </FormikProvider>
  );
}

export default LoginForm;