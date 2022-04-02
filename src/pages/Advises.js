import { Container, Typography, Grid, Card } from '@mui/material';
import Page from '../components/Page';
import { Advise } from '../components/_dashboard/advises';
import { Wrong } from '../components/_dashboard/errors';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

function Advises() {
    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {
        if (!cookies.get('UserCode')) {
            navigate('/');
        }
    });

    const baseUrl = "https://localhost:44397/api/advises";
    const [advises, setAdvises] = useState([]);
    const [noRequest, setNoRequest] = useState(false);

    const peticionesGet = async () => {
        await axios.get(baseUrl)
            .then(Response => {
                setAdvises(Response.data);
            }).catch(error => {
                if (error.request) {
                    console.log(error.request);
                    setNoRequest(true);
                }
                else {
                    console.log(error);
                }
            })
    }

    useEffect(() => {
        peticionesGet();
    }, []);

    return (
        <Page title="AsesoraApp | Asesorías">
            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Asesorías
                </Typography>

                <Grid container spacing={3}>
                    {
                        noRequest
                        ?
                            <Wrong />
                        :
                            advises.map(elemento => (
                                <Grid item xs={12} sm={6} md={3}>
                                    <Card>
                                        <Advise
                                            subject='materia'
                                            tag1='test1'
                                            tag2='test2'
                                            tag3='test3'
                                            tag4='test4'
                                            image={elemento.userx_image}
                                            adviser={`${elemento.userx_name} ${elemento.userx_lastname}`}
                                            rating={elemento.advisor_rating}
                                            comments="6"
                                            id={elemento.advisor_code}
                                        />
                                    </Card>
                                </Grid>
                            ))
                    }
                </Grid>
            </Container>
        </Page>
    );
}

export default Advises;