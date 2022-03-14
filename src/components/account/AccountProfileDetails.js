import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';

import Cookies from 'universal-cookie';

const AccountProfileDetails = (props) => {
  const cookies = new Cookies();

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="Cuando desee puede editar su foto de perfil" title="Perfil" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Nombre"
                name="firstName"
                InputProps={{
                  readOnly: true
                }}
                value= { cookies.get('stuName') + " " +  cookies.get('stuLastnameF') + " " +  cookies.get('stuLastnameM')}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Correo electrónico"
                name="email"
                InputProps={{
                  readOnly: true
                }}
                value=  {cookies.get('stuEmail')}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Número de telefono"
                name="phone"
                InputProps={{
                  readOnly: true
                }}
                value= {cookies.get('stuPhone')}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Tipo de usuario"
                name="type"
                InputProps={{
                  readOnly: true
                }}
                value= "Estudiante"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Fecha de alta"
                name="lastName"
                InputProps={{
                  readOnly: true
                }}
                value={cookies.get('stuDate')}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Escuela"
                name="school"
                InputProps={{
                  readOnly: true
                }}
                value={cookies.get('stuSchoolName')}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button color="primary" variant="contained">
            Guardar cambios
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
