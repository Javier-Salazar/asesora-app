import ScannerQuagga from './ScannerQuagga';
import { useNavigate } from 'react-router-dom';
import Quagga from 'quagga';
import axios from 'axios';
import Cookies from 'universal-cookie';
import React, { useEffect, useState } from 'react';
import { Alert, Typography } from '@mui/material';
import './styles.css';

export default function Scanner() {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const baseUrl = "https://localhost:44397/api/users";

  const [userTable, setUserTable] = useState([]);
  const [activeAlert, setActiveAlert] = useState({ message: '', show: false });

  const peticionesGet = async () => {
    await axios.get(baseUrl)
      .then(Response => {
        setUserTable(Response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    peticionesGet();
  }, []);
  
  var isFind = false;

  const searchUser = (finded) => {
    userTable.filter((element) => {
      if (element.userx_code.toLowerCase() === `l${finded.toLowerCase()}`) {
        isFind = true;
        if (element.userx_status === "A") {
          if (element.userx_type === "N") {
            const Url = `https://localhost:44397/api/students/${element.userx_code}`;
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
        } else {
          setActiveAlert({
            message: "No tienes permitido ingresar a tu cuenta",
            show: true,
          });
        }
      }
      return 0;
    })

    if (isFind === false) {
      setActiveAlert({
        message: 'No se encuetra el usuario, intenta de nuevo',
        show: true,
      });
    }
    return (finded)
  }

  const _onDetected = result => {
    searchUser(result.codeResult.code);
  }

  return (
    <div>
      <Typography variant="subtitle2" position="center" noWrap>
        Muestra el código de barras de tu credencial a la cámara
      </Typography>
      <br></br>
      {
        activeAlert.show
          ?
            <Alert border-radius="12px" severity="error" sx={{boxShadow: 4}}>
              {activeAlert.message}
            </Alert>
          :
            <Alert border-radius="12px" severity="info" sx={{boxShadow: 4}}>Escaneando credencial...</Alert>
      }
      <br></br>
      <ScannerQuagga onDetected={_onDetected} />
    </div>
  );
}