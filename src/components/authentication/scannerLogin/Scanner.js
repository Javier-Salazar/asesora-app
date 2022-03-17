import ScannerQuagga from './ScannerQuagga'
import { useNavigate } from 'react-router-dom';
import Quagga from 'quagga'
import axios from 'axios';
import Cookies from 'universal-cookie';
import React, { useEffect, useState } from 'react';
import { Alert, Typography } from '@mui/material';
import "./styles.css";


export default function Scanner() {


  const navigate = useNavigate();
  const cookies = new Cookies();

  const baseUrl = "https://localhost:44397/api/users"

  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [activarAlert, setActivarAlert] = useState(false);
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
  var seEncuentra = false;

  const busquedaUser = (terminoBusqueda) => {

    tablaUsuarios.filter((elemento) => {//Se busca el número de control
      if (elemento.userx_code.toLowerCase() == terminoBusqueda.toLowerCase()) {
        seEncuentra = true;
        if (elemento.userx_type == "N") {//Si es Normal (Alumno)
          const Url = "https://localhost:44397/api/students/" + elemento.userx_code
          axios.get(Url)
            .then(Response => { //Se llenan las Cookies con la información obtenida
              cookies.set('UserCode', Response.data.student_code, { path: '/' });
              cookies.set('UserType', Response.data.userx_type, { path: '/' });
              Quagga.stop();
              navigate('/dashboard', { replace: true });
            }).catch(error => {
              console.log(error);
            })
        }
      }
    })
    if (seEncuentra == false) {
      setActivarAlert(true);
    }
    return(terminoBusqueda)
  }

  const _onDetected = result => {
    busquedaUser(result.codeResult.code);
  }

  return (
    <div>
      <Typography variant="subtitle2" position="center" noWrap>
        Muestra el código de barras de tu credencial a la cámara
      </Typography>
      <br></br>
      {activarAlert ? <Alert severity="error">No se encuetra el usuario, intente de nuevo</Alert> : <Alert severity="info">Escaneando credencial...</Alert>}
      <br></br>
      <ScannerQuagga onDetected={_onDetected} />
    </div>
  );
}
