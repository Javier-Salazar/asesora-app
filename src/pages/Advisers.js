import { Container, Typography, Grid, Card } from '@mui/material';
import Page from '../components/Page';
import { Adviser } from '../components/_dashboard/advisers';

function Advisers() {
    return (
        <Page title="AsesoraApp | Asesores">
            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Asesores
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <Adviser name="Margarita Bailón" email="mbailon@itcj.edu.mx" rating="4.0" comments="6"/>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}

export default Advisers;