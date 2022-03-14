import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import upcScan from '@iconify/icons-bi/upc-scan';
import { Stack, Button, Divider, Typography, Tooltip, Dialog, DialogContent } from '@mui/material';
import Slide from '@mui/material/Slide';
import googleFill from '@iconify/icons-flat-color-icons/google';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AuthSocial() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const baseUrl = "https://localhost:44397/api/users"

  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  {/** Petición para TRAER los datos de la BD*/ }
  const peticionesGet = async () => {
    await axios.get(baseUrl)
      .then(Response => {
        setTablaUsuarios(Response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  {/**Se ejecuta por defecto cada vez que el componente se actualiza*/ }
  useEffect(() => {
    peticionesGet();
  }, [])


  const responseGoogle = (response) => {
    //Se hace una búsqueda en APIAsesora con el correo que envia la API de Google
    busquedaUser(response.profileObj.email);
  }


  const cookies = new Cookies();
  const busquedaUser = (terminoBusqueda) => {
    var seEncuentra = 0;
    //Se compara el correo del login (Google) con los correos de la BD
    tablaUsuarios.filter((elemento) => {
      if (elemento.userx_email.toLowerCase() == terminoBusqueda.toLowerCase()) {
        //Si se encontro se realiza otra busqueda dependiento el tipo que sea
        seEncuentra = 1;
        if (elemento.userx_type == "N") {//Si es Normal (Alumno)
          const Url = "https://localhost:44397/api/students/" + elemento.userx_code
          axios.get(Url)
            .then(Response => {
              //Se llenan las Cookies con la información obtenida
              cookies.set('stuCode', Response.data.student_code, { path: '/' });
              cookies.set('stuName', Response.data.userx_name, { path: '/' });
              cookies.set('stuLastnameF', Response.data.userx_lastname, { path: '/' });
              cookies.set('stuLastnameM', Response.data.userx_mother_lastname, { path: '/' });
              cookies.set('stuEmail', Response.data.userx_email, { path: '/' });
              cookies.set('stuPhone', Response.data.userx_phone, { path: '/' });
              cookies.set('stuType', 'N', { path: '/' });
              cookies.set('stuDate', Response.data.userx_date, { path: '/' });
              cookies.set('stuSchool', Response.data.student_school, { path: '/' });
              cookies.set('stuSchoolName', Response.data.school_name, { path: '/' });
              cookies.set('stuCareer', Response.data.student_career, { path: '/' });
              cookies.set('stuCareerName', Response.data.career_name, { path: '/' });
              cookies.set('stuMajor', Response.data.student_major, { path: '/' });
              cookies.set('stuMajorCode', Response.data.major_name, { path: '/' });
              cookies.set('stuSemester', Response.data.student_semester, { path: '/' });
              cookies.set('stuImagen', '/static/mock-images/avatars/User.png', { path: '/' });
              navigate('/asesoraTec', { replace: true });
            }).catch(error => {
              console.log(error);
            })
        }
      }
    })
    if (seEncuentra == 0) {
      window.alert('El correo seleccionado no se encuentra registrado');
    }
  }

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Tooltip title="Escanear credencial" placement="top" enterDelay={200} arrow>
          <Button style={{ width: '50%' }} size="large" color="inherit" variant="outlined" onClick={handleClickOpen}>
            <Icon icon={upcScan} color="#454F5B" height={24} />
          </Button>
        </Tooltip>


        <Tooltip title="Iniciar sesión con Google" placement="top" enterDelay={200} arrow>
          <GoogleLogin
            clientId="426150153305-rj17j27t93g525tdqhoacl3umdm142mr.apps.googleusercontent.com"
            render={renderProps => (
              <Button style={{ width: '50%' }} size="large" color="inherit" variant="outlined" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <Icon icon={googleFill} height={24} />
              </Button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </Tooltip>

      </Stack>


      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          O
        </Typography>
      </Divider>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {'test'}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AuthSocial;