import { Container, Typography, Grid, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Wrong } from '../components/_dashboard/errors';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Page from '../components/Page';
import { Subject } from '../components/_dashboard/subjects';

function Subjects(props) {
    const cookies = new Cookies();
    const [noRequest, setNoRequest] = useState(false);
    const [data, setData] = useState([]);
    const [advisor, setAdvisor] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        if (!cookies.get('UserCode')) {
            navigate('/');
        }
    });

    const requestGet = async () => {
        await axios.get('https://localhost:44397/api/advises')
            .then(response => {
                setData(response.data);
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

    const requestGetAdvisor = async () => {
        await axios.get('https://localhost:44397/api/users')
            .then(response => {
                setAdvisor(response.data);
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
        requestGetAdvisor();
    }, []);

    const uniqueSubjects = () => {
        var subject = [];
        var i = 0;
        data.filter((element) => {
            subject[i] = element.advise_subject;
            i = i + 1;
            return 0;
        });
        var uniqueArray = [...new Set(subject)];
        return uniqueArray;
    };

    const filterAdvisorData = (uniqueAdvisor) => {
        var infoSubject = [];
        for (let i = 0; i < uniqueAdvisor.length; i++) {
            advisor.filter((element) => {
                if (uniqueAdvisor[i] === element.userx_code) {
                    var aux = {
                        idAdvisor: element.userx_code,
                        name: `${element.userx_name} ${element.userx_lastname}`,
                        image: element.userx_image
                    };
                    infoSubject.push(aux);
                    return 0;
                }
                return 0;
            });
        }
        return infoSubject;
    };

    const dataFormat = (dataResult) => {
        var idSubject = dataResult[0].advise_subject;
        var nameSubject = dataResult[0].subjectx_name;
        var advisor = [];
        var i = 0;
        var faceToFace = 0;
        var virtual = 0;

        dataResult.filter((element) => {
            advisor[i] = element.advise_advisor;
            i = i + 1;
            if (element.advise_modality === 'P') {
                faceToFace = faceToFace + 1;
            } else {
                virtual = virtual + 1;
            }
            return 0;
        });

        var uniqueAdvisor = [...new Set(advisor)];
        return ({ 
            id: idSubject,
            name: nameSubject,
            faceToFaceAdvise: faceToFace,
            virtalAdvise: virtual,
            advisors: filterAdvisorData(uniqueAdvisor) 
        });
    };

    const filterSubjectData = () => {
        var infoSubject = [];
        for (let i = 0; i < uniqueSubjects().length; i++) {
            var filterResults = data.filter((element) => {
                if ((uniqueSubjects()[i] === element.advise_subject) && (element.advise_status === 'S')) {
                    return element;
                }
                return 0;
            });
            infoSubject.push(dataFormat(filterResults));
        }
        return infoSubject;
    };

    return (
        <Page title="AsesoraApp | Materias">
            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Materias
                </Typography>
                <Grid container spacing={3}>
                    {
                        noRequest
                        ?
                            <Wrong />
                        :
                            filterSubjectData().map(subject => (
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card>
                                        <Subject
                                            idSubject={subject.id}
                                            name={subject.name}
                                            faceToFaceAdvise={subject.faceToFaceAdvise}
                                            virtualAdvise={subject.virtalAdvise}
                                            advisors={subject.advisors}
                                            adviser={props.adviser}
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

export default Subjects;