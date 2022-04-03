import { Container, Typography, Grid, Card } from '@mui/material';
import Page from '../components/Page';
import { Advise } from '../components/_dashboard/advises';
import { Wrong } from '../components/_dashboard/errors';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MockImgAvatar from '../utils/mockImages';
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
                            advises.map(element => (
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card>
                                        <Advise
                                            subject={element.subjectx_name}
                                            tag1='matematicas'
                                            tag2='investigacion'
                                            tag3='test'
                                            tag4='programa'
                                            image={element.advisorImage !== '' ? element.advisorImage : MockImgAvatar()}
                                            adviser={`${element.advisorName} ${element.advisorLastName.charAt(0)}.`}
                                            rating="4"
                                            comments={element.advise_comments}
                                            modality={element.advise_modality}
                                            id={element.advise_code}
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