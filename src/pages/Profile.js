import { Box, Container, Grid } from '@mui/material';
import AccountProfile from '../components/account/AccountProfile';
import AccountProfileDetails from '../components/account/AccountProfileDetails';
import Page from '../components/Page';
import { styled } from '@mui/material/styles';



const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(10)
}));

export default function Blog() {
  return (
    <RootStyle title="Perfil | AsesoraTec">
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails />
            </Grid>
          </Grid>
        </Container>
    </RootStyle>
  );
}
