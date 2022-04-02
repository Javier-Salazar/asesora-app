import { Container, Typography, Grid, Card } from '@mui/material';
import Page from '../components/Page';
import { Advise } from '../components/_dashboard/advises';

function Advises() {
    return (
        <Page title="AsesoraApp | Asesorías">
            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Asesorías
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <Advise />
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}

export default Advises;