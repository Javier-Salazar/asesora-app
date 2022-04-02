import { Container, Typography, Grid, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import Page from '../components/Page';
import { Subject } from '../components/_dashboard/subjects';

function Subjects() {
    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {
        if (!cookies.get('UserCode')) {
            navigate('/');
        }
    });

    return (
        <Page title="AsesoraApp | Materias">
            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Materias
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3.5}>
                        <Card>
                            <Subject name="Matemáticas" tag1="Matematicas" tag2="Programacion" tag3="test" tag4="Matematicas" />
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}

export default Subjects;