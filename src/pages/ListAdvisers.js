import { Container, Typography, Grid } from '@mui/material';
import Page from '../components/Page';
import Adviser from '../components/_dashboard/advisers/Adviser';


function listAdvisers() {

    return (
        <Page title="AsesoraApp | Asesores">
            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Lista de asesores
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Adviser name="Margarita Bailon" email="mbailon@itcj.edu.mx" rating="4.0" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Adviser name="Margarita Bailon" email="mbailon@itcj.edu.mx" rating="4.0" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Adviser name="Margarita Bailon" email="mbailon@itcj.edu.mx" rating="4.0" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Adviser name="Margarita Bailon" email="mbailon@itcj.edu.mx" rating="4.0" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Adviser name="Margarita Bailon" email="mbailon@itcj.edu.mx" rating="4.0" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Adviser name="Margarita Bailon" email="mbailon@itcj.edu.mx" rating="4.0" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Adviser name="Margarita Bailon" email="mbailon@itcj.edu.mx" rating="4.0" />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}

export default listAdvisers;