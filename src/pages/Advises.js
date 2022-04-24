import { Container, Typography, Grid, Card } from '@mui/material';
import Page from '../components/Page';
import { Advise } from '../components/_dashboard/advises';
import { Wrong } from '../components/_dashboard/errors';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MockImgAvatar from '../utils/mockImages';
import Cookies from 'universal-cookie';
import axios from 'axios';

function Advises() {
    const [advise, setAdvise] = useState([]);
    const [noRequest, setNoRequest] = useState(false);

    var params = useParams();
    var idSubject = params.subjectID;
    var idUser = params.adviserID;

    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {
        if (!cookies.get('UserCode')) {
            navigate('/');
        }
    });
    
    const requestGet = async () => {
        await axios.get('https://localhost:44397/api/advises')
            .then(response => {
                setAdvise(response.data);
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
        requestGet();
    }, []);

    const filterAdvises = () => {
        var data = [];
        advise.filter((element) => {
            if(idSubject !== undefined){
                if(idUser !== undefined){
                    if(element.advise_subject === idSubject && element.advise_advisor === idUser){
                        data.push(element);
                    }
                } else if(element.advise_subject === idSubject){
                    data.push(element);
                }
            } else {
                data.push(element);
            }
            return 0;
            
        });
        console.log(data);
        var uniqueArray = [...new Set(data)];
        return uniqueArray;
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
                                            adviser={`${element.advisorName} ${element.advisorLastName}`}
                                            image={element.advisorImage !== '' ? element.advisorImage : MockImgAvatar()}
                                            rating="4"
                                            comments={element.advise_comments}
                                            modality={element.advise_modality}
                                            start={element.advise_date_start}
                                            end={element.advise_date_ends}

                                            // adviserr={props.adviser}
                                            // filterSubject={props.name}
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