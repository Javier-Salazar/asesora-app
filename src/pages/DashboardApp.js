import { Box, Grid, Container, Typography } from '@mui/material';
import Page from '../components/Page';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import {
  AcceptedAdvice, CanceledAdvise, RequestedAdvice, TotalAdvice,
  AdviseOfTheDay, UserDistribution, CarouselInfographics, WebAppAdvise
} from '../components/_dashboard/app';

function DashboardApp() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.get('UserCode')) {
      navigate('/');
    }
  });

  return (
    <Page title="AsesoraApp | Inicio">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hola, Bienvenido de nuevo</Typography>
        </Box>
        <Grid container spacing={3}>
          {
            cookies.get('UserType') === 'N'
              ?
              <>
                <Grid item xs={12} md={4} lg={8}>
                  <CarouselInfographics />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <AdviseOfTheDay />
                </Grid>
              </>
              :
              null
          }

          {
            cookies.get('UserType') === 'A'
              ?
              <>

                <Grid item xs={12} md={4} lg={8}>
                  <CarouselInfographics />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <AdviseOfTheDay />
                </Grid>
              </>
              :
              null
          }

          {
            cookies.get('UserType') === 'S'
              ?
              <>
                <Grid item xs={12} sm={6} md={3}>
                  <TotalAdvice />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <AcceptedAdvice />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <RequestedAdvice />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <CanceledAdvise />
                </Grid>
                <Grid item xs={12} md={4} lg={8}>
                  <WebAppAdvise />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <UserDistribution />
                </Grid>
              </>
              :
              null
          }

        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardApp;