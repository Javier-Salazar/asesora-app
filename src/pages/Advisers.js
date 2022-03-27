import { Container, Typography, Grid, Card } from '@mui/material';
import Page from '../components/Page';
import { Adviser } from '../components/_dashboard/advisers';
import { Wrong } from '../components/_dashboard/errors';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Advisers() {
    const baseUrl = "https://localhost:44397/api/advisors";
    const [advisers, setAdvisers] = useState([]);
    const [noRequest, setNoRequest] = useState(false);

    const peticionesGet = async () => {
        await axios.get(baseUrl)
        .then(Response => {
            setAdvisers(Response.data);
        }).catch(error => {
            if(error.request){
                console.log(error.request);
                setNoRequest(true);
            }
            else{
                console.log(error);
            }
        })
    }

    useEffect(() => {
        peticionesGet();
    }, [])

    return (
        <Page title="AsesoraApp | Asesores">
            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Asesores
                </Typography>

                <Grid container spacing={3}>
                    {
                        noRequest
                        ?
                            <Wrong />
                        :
                            advisers.map(elemento => (
                                <Grid item xs={12} sm={6} md={3}>
                                    <Card>
                                        <Adviser
                                            image={elemento.userx_image}
                                            name={`${elemento.userx_name} ${elemento.userx_lastname}`}
                                            email={elemento.userx_email}
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

export default Advisers;