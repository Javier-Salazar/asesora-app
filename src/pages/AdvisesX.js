import { Container, Typography, Grid, Card } from '@mui/material';
import Page from '../components/Page';
import { Advise } from '../components/_dashboard/advisesX';
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
    const [advisors, setAdvisors] = useState([]);
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

    const requestGetAdvisor = async () => {
        await axios.get('https://localhost:44397/api/advisors')
            .then(response => {
                setAdvisors(response.data);
            }).catch(error => {
                if (error.request) {
                    console.log(error.request);
                    setNoRequest(true);
                }
                else {
                    console.log(error);
                }
            });
    }

    useEffect(() => {
        peticionesGet();
        requestGetAdvisor();
    }, []);


    const date = new Date();
    const validateDate = (adviseDateTime) => {
        var adviseDateArray = adviseDateTime.split('T');
        var adviseDate = adviseDateArray[0].split('-');
        var todayD = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
        var adviseD = new Date(adviseDate[0], adviseDate[1], adviseDate[2]);
        return (adviseD > todayD)
    };

    const filterAdvises = () => {
        var filterResults = advises.filter((element) => {
            if ((element.advise_status === "S") && (validateDate(element.advise_date_start))) {
                return element;
            }
            return filterResults;
        });
        return filterResults;
    };

    const loadComments = (advisor) => {
        var filterResults = advises.filter((element) => {
            if (element.advise_advisor === advisor) {
                return element;
            }
            return filterResults;
        });
        return filterResults;
    };

    const loadRating = (advisor) => {
        var rating = 0;
        advisors.filter((element) => {
            if (advisor === element.advisor_code) {
                rating = element.advisor_rating;
            }
            return 0;
        });
        return rating;
    };

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
                            filterAdvises().map(element => (
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card>
                                        <Advise
                                            id={element.advise_code}
                                            subject={element.subjectx_name}
                                            start={element.advise_date_start}
                                            end={element.advise_date_ends}
                                            image={element.advisorImage !== '' ? element.advisorImage : MockImgAvatar()}
                                            adviser={`${element.advisorName} ${element.advisorLastName.charAt(0)}.`}
                                            rating={loadRating(element.advise_advisor)}
                                            comments={loadComments(element.advise_advisor).length}
                                            modality={element.advise_modality}
                                            adviserId={element.advise_advisor}
                                            studentId={cookies.get('UserCode')}
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