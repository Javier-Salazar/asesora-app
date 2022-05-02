import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { sentenceCase } from 'change-case';
import styled from '@emotion/styled';
import { Card, Stack, Avatar, Container, Typography, TextField, Switch, Snackbar, Alert,
  Autocomplete } from '@mui/material';
import Page from '../components/Page';
import { LoadingButton } from '@mui/lab';
import Label from '../components/Label';
import { useFormik, Form, FormikProvider } from 'formik';
import Scrollbar from '../components/Scrollbar';
import MockImgAvatar from '../utils/mockImages';
import { WS_PATH, NAME_APP } from '../Configurations';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Cookies from 'universal-cookie';
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

function changeLabelStatus(bool) {
  if (bool) {
    return sentenceCase('virtual');
  } else {
    return sentenceCase('presencial');
  }
}

function NewAdvises() {
  const [modality, setModality] = useState(false);
  const [showAlert, setShowAlert] = useState({ message: '', show: false });
  const [showAlertPost, setShowAlertPost] = useState(false);
  const [open, setOpen] = useState(false);
  const [dateAdvise, setDateAdvise] = useState(null);
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [infoUser, setInfoUser] = useState({userx_code: '', userx_name: '', userx_lastname: ''});
  const [subject, setSubject] = useState([]);

  const cookies = new Cookies();
  const navigate = useNavigate();
  const date = new Date();
  const timeStart = new Date();
  const timeEnd = new Date();

  const getUserRequest = async () => {
    await axios.get(`${WS_PATH}users/${cookies.get('UserCode')}`)
      .then(response => {
        setInfoUser(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  const getSubjectRequest = async () => {
    await axios.get(`${WS_PATH}subjects`)
      .then(response => {
        setSubject(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    getUserRequest();
    getSubjectRequest();
    if (!cookies.get('UserCode')) {
      navigate('/');
    }
  });

  const RegisterSchema = Yup.object().shape({
    subject: Yup.string()
      .required('La materia es obligatoria')
  });
  
  const formik = useFormik({
    initialValues: {
      school: 'Instituto Tecnológico de Ciudad Juárez',
      subject: '',
      dateAdvise: date.toLocaleString().split(' ', 1),
      dateStart: timeStart.toLocaleString().split(' ', 1),
      dateEnd: timeEnd.toLocaleString().split(' ', 1)
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      postAdvise();
    },
  });

  const postAdvise = async (type) => {
    var arrayDate = date.toISOString().split('T');
    await axios.post(`${WS_PATH}advises`, {
      userx_name: getFieldProps('firstName').value,
      userx_lastname: getFieldProps('lastName').value,
      userx_mother_lastname: getFieldProps('motherLastName').value,
      userx_remember: 'N',
      userx_phone: getFieldProps('phone').value,
      userx_type: type,
      userx_istmp_password: 'N',
      userx_date: arrayDate[0],
      userx_islockedout: 'N',
      userx_islockedout_date: arrayDate[0],
      userx_islockedout_enable_date: arrayDate[0],
      userx_last_login_date: arrayDate[0],
      userx_lastfailed_login_date: arrayDate[0],
      userx_image: ''
    })
      .then((response) => {
        setShowAlertPost(true);
        setShowAlert(true);
        setOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const options = ['test', 'test'];

  const { handleSubmit, getFieldProps } = formik;

  return (
    <Page title={`Asesora${NAME_APP} | Mis Asesorías`}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Agregar Asesoría
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
                color={(modality === false && 'default') || 'virtual'}
              >
                {changeLabelStatus(modality)}
              </Label>
            </div>

            <Avatar src={`data:image/png;base64,${MockImgAvatar()}`} sx={{ width: '106px', height: '106px', margin: 'auto' }} />

            <div style={{
              width: '100%', display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginTop: '24px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '80%' }}>
                <Typography variant='subtitle2' sx={{ wordWrap: 'break-word' }}>
                  Modalidad
                </Typography>
                <Typography variant='body2' sx={{ wordWrap: 'break-word' }}>
                  Definir la modalidad de la asesoría
                </Typography>
              </div>
              <Switch sx={{ pl: 2 }} onChange={() => setModality(!modality)} checked={modality} />
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
                        value={infoUser.userx_code}
                        disabled
                      />
                      
                      <TextField
                        fullWidth
                        label="Escuela"
                        disabled
                        {...getFieldProps('school')}
                      />
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField
                        fullWidth
                        label="Nombre"
                        value={infoUser.userx_name}
                        disabled
                      />

                      <TextField
                        fullWidth
                        label="Apellido"
                        value={infoUser.userx_lastname}
                        disabled
                      />
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <Autocomplete
                        fullWidth
                        disablePortal
                        id="combo-box-subject"
                        options={options}
                        renderInput={(params) => <TextField {...params} label="Materia" />}
                      />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Fecha de asesoría"
                        value={dateAdvise}
                        onChange={(newValue) => {
                          setDateAdvise(newValue);
                        }}
                        renderInput={(params) => <TextField fullWidth {...params} />}
                      />
                    </LocalizationProvider>
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          label="Hora inicio"
                          value={dateStart}
                          onChange={(newValue) => {
                            setDateStart(newValue);
                          }}
                          renderInput={(params) => <TextField fullWidth {...params} />}
                        />
                      </LocalizationProvider>

                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          label="Hora fin"
                          value={dateEnd}
                          onChange={(newValue) => {
                            setDateEnd(newValue);
                          }}
                          renderInput={(params) => <TextField fullWidth {...params} />}
                        />
                      </LocalizationProvider>
                    </Stack>

                    <Stack style={{ display: 'flex', alignItems: 'flex-end' }}>
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        style={{ width: 'fit-content' }}
                      >
                        Guardar cambios
                      </LoadingButton>
                      {
                        showAlertPost
                        ?
                          <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%', boxShadow: 10 }}>
                              Se ha registrado con éxito
                            </Alert>
                          </Snackbar>
                        :
                          null
                      }
                      {
                        showAlert.show
                        ?
                          <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error" sx={{ width: '100%', boxShadow: 10 }}>
                              {showAlert.message}
                            </Alert>
                          </Snackbar>
                        :
                          null
                      }
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

export default NewAdvises;