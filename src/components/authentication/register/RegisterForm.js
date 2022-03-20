import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { Alert } from "@mui/material";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const date = new Date();
  const [mostrarAlert, setMostrarAlert] = useState(false);
  const [mostrarAlertPos, setMostrarAlertPos] = useState(false);

  const RegisterSchema = Yup.object().shape({//Se validan los campos 
    name: Yup.string()
      .min(2, "El nombre es muy corto")
      .max(30, "El nombre es muy largo")
      .required("El nombre es obligatorio"),
    lastNameP: Yup.string()
      .min(2, "El apellido es muy corto")
      .max(30, "El apellido es muy largo")
      .required("El apellido es obligatorio"),
    lastNameM: Yup.string()
      .min(2, "El apellido es muy corto")
      .max(30, "El apellido es muy largo"),
    email: Yup.string()
      .email("El correo electrónico debe ser una dirección válida")
      .required("El correo electrónico es obligatorio")
      .matches(
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@itcj.edu.mx/,
        'Ingrese su correo institucional, por ejemplo: "user@itcj.edu.mx" '
      ),
    password: Yup.string()
      .required("La contraseña es obligatoria")
      .min(8, "La contraseña debe tener minimo 8 caracteres por seguridad"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      lastNameP: "",
      lastNameM: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema, //Si Cumple con todos los argumentos se valida que el correo sea nuevo
    onSubmit: () => {
      setMostrarAlert(false);
      setMostrarAlertPos(false);
      busquedaUser(getFieldProps("email").value); //Se inicializa la busqueda / modifica (seEncuentra)
      if (seEncuentra === false) {
        //Si no existe una cuenta con el correo se agrega
        peticionPost();
        setMostrarAlertPos(true);
      } else {
        setMostrarAlert(true);
      }//Se limpian los campos
      setFieldValue("name", "", false);
      setFieldValue("lastNameP", "", false);
      setFieldValue("lastNameM", "", false);
      setFieldValue("email", "", false);
      setFieldValue("password", "", false);
    },
  });

  const baseUrl = "https://localhost:44397/api/users";
  const [data, setData] = useState([]);

  //Petición para traer los datos de la BD
  const peticionesGet = async () => {
    await axios
      .get(baseUrl)
      .then((Response) => {
        setData(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Petición para insertar los datos 
  const peticionPost = async () => {
    await axios
      .post(baseUrl, {
        userx_code: "" + getFieldProps("email").value.split("@", 1), //Corta el correo para obtener el ID del User,
        userx_name: "" + getFieldProps("name").value,
        userx_lastname: "" + getFieldProps("lastNameP").value,
        userx_mother_lastname: "" + getFieldProps("lastNameM").value,
        userx_email: "" + getFieldProps("email").value,
        userx_password: "" + getFieldProps("password").value,
        userx_remember: "N",
        userx_phone: "",
        userx_type: "N",
        userx_istmp_password: "N",
        userx_date: date.toISOString(),
        userx_islockedout: "N",
        userx_islockedout_date: date.toISOString(),
        userx_islockedout_enable_date: date.toISOString(),
        userx_last_login_date: date.toISOString(),
        userx_lastfailed_login_date: date.toISOString(),
        userx_status: "A",
        userx_image: "",
      })
      .then((response) => {
        setData(data.concat(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Se ejecuta por defecto cada vez que se actualiza
  useEffect(() => {
    peticionesGet();
  }, []);

  var seEncuentra = false;

  const busquedaUser = (terminoBusqueda) => {
    data.filter((elemento) => {
      //Se busca el correo ingresado
      if (elemento.userx_email.toLowerCase() === terminoBusqueda.toLowerCase()) {
        console.log(elemento.userx_email.toLowerCase());
        console.log(terminoBusqueda.toLowerCase());
        seEncuentra = true;
        console.log(seEncuentra);
      }
    });
  };

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Nombre"
            name="nameTxt"
            {...getFieldProps("name")}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Apellido Paterno"
              {...getFieldProps("lastNameP")}
              error={Boolean(touched.lastNameP && errors.lastNameP)}
              helperText={touched.lastNameP && errors.lastNameP}
            />

            <TextField
              fullWidth
              label="Apellido Materno"
              {...getFieldProps("lastNameM")}
              error={Boolean(touched.lastNameM && errors.lastNameM)}
              helperText={touched.lastNameM && errors.lastNameM}
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
          {mostrarAlertPos ? (
            <Alert severity="success">
              Se ha realizado el registro con éxito, Inicie sesión y configure
              su perfil para hacer uso de las funcionalidades
            </Alert>
          ) : null}
          {mostrarAlert ? (
            <Alert border-radius="12px" severity="error">
              Ya existe una cuenta asociada con el correo ingresado
            </Alert>
          ) : null}
        </Stack>
      </Form>
    </FormikProvider>
  );
}

export default RegisterForm;
