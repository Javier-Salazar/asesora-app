import { Box, Grid, Container, Typography } from '@mui/material';
import Page from '../components/Page';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { AppTasks, AcceptedAdvice, CanceledAdvise, RequestedAdvice, AppNewsUpdate, TotalAdvice, 
  AdviseOfTheDay, UserDistribution, AppWebsiteVisits, AppTrafficBySite, AppCurrentSubject, 
  AppConversionRates } from '../components/_dashboard/app';

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
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <UserDistribution />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AdviseOfTheDay />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardApp;