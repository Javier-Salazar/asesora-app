import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Stack, TextField, IconButton, InputAdornment, Snackbar, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';

function RegisterForm() {
  const date = new Date();
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertPost, setShowAlertPost] = useState(false);
  const [open, setOpen] = useState(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "El nombre es muy corto")
      .max(30, "El nombre es muy largo")
      .required("El nombre es obligatorio"),
    lastName: Yup.string()
      .min(2, "El apellido es muy corto")
      .max(30, "El apellido es muy largo")
      .required("El apellido es obligatorio"),
    motherLastName: Yup.string()
      .min(2, "El apellido es muy corto")
      .max(30, "El apellido es muy largo"),
    email: Yup.string()
      .email("El correo electrónico debe ser una dirección válida")
      .required("El correo electrónico es obligatorio")
      .matches(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@itcj.edu.mx/,
        'Ingrese su correo institucional, por ejemplo: user@itcj.edu.mx'),
    password: Yup.string()
      .required("La contraseña es obligatoria")
      .min(8, "La contraseña debe contener mínimo 8 caracteres")
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      motherLastName: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      setShowAlert(false);
      setShowAlertPost(false);
      searchUser(getFieldProps("email").value);
      if (isFind === false) {
        peticionPost();
      }
      else {
        setShowAlert(true);
        setOpen(true);
      }
      setFieldValue("name", "", false);
      setFieldValue("lastName", "", false);
      setFieldValue("motherLastName", "", false);
      setFieldValue("email", "", false);
      setFieldValue("password", "", false);
    },
  });

  const baseUrl = "https://localhost:44397/api/users";
  const [data, setData] = useState([]);

  const peticionesGet = async () => {
    await axios.get(baseUrl)
      .then((Response) => {
        setData(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPost = async () => {
    var arrayCode = getFieldProps("email").value.split('@');
    var arrayDate = date.toISOString().split('T');
    await axios.post(baseUrl, {
      userx_code: arrayCode[0],
      userx_name: getFieldProps("name").value,
      userx_lastname: getFieldProps("lastName").value,
      userx_mother_lastname: getFieldProps("motherLastName").value,
      userx_email: getFieldProps("email").value,
      userx_password: getFieldProps("password").value,
      userx_salt: "N",
      userx_remember: "N",
      userx_phone: "",
      userx_type: "N",
      userx_istmp_password: "N",
      userx_date: arrayDate[0],
      userx_islockedout: "N",
      userx_islockedout_date: arrayDate[0],
      userx_islockedout_enable_date: arrayDate[0],
      userx_last_login_date: arrayDate[0],
      userx_lastfailed_login_date: arrayDate[0],
      userx_status: "A",
      userx_image: ""
    })
      .then((response) => {
        setShowAlertPost(true);
        setOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    peticionesGet();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  var isFind = false;

  const searchUser = (finded) => {
    data.filter((element) => {
      if (element.userx_email.toLowerCase() === finded.toLowerCase()) {
        console.log(element.userx_email.toLowerCase());
        console.log(finded.toLowerCase());
        isFind = true;
        console.log(isFind);
      }
      return 0;
    });
  };

  const { errors, touched, handleSubmit, getFieldProps, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            {...getFieldProps("name")}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Apellido paterno"
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />

            <TextField
              fullWidth
              label="Apellido materno"
              {...getFieldProps("motherLastName")}
              error={Boolean(touched.motherLastName && errors.motherLastName)}
              helperText={touched.motherLastName && errors.motherLastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Correo electrónico"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Contraseña"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Registrarse
          </LoadingButton>

          {
            showAlertPost
            ?
              <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  Se ha registrado con éxito, Inicie sesión y configure
                  su perfil para hacer uso de las funcionalidades
                </Alert>
              </Snackbar>
            :
              null
          }
          {
            showAlert
            ?
              <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                  Ya existe una cuenta asociada a este correo electrónico
                </Alert>
              </Snackbar>
            :
              null
          }
        </Stack>
      </Form>
    </FormikProvider>
  );
}

export default RegisterForm;