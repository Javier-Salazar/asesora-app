import { useEffect, useState, } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, CardMedia, Card, CardContent, Box, BottomNavigation, BottomNavigationAction, Alert,
    Container, Grid } from '@mui/material';
import ProfileInformation from './ProfileInformation';
import ProfileComments from './ProfileComments';
import { Wrong } from '../errors';
import { Icon } from '@iconify/react';
import startFill from '@iconify/icons-eva/star-fill';
import startOutline from '@iconify/icons-eva/star-outline';
import axios from 'axios';
import Cookies from 'universal-cookie';
import MockImgAvatar from '../../../utils/mockImages';

function AdvisorProfile() {
    const cookies = new Cookies();
    const navigate = useNavigate();

    var params = useParams();
    var idUser = params.adviserID;
    const [value, setValue] = useState(0);
    const [profile, setProfile] = useState(true);
    const [comments, setComments] = useState(false);
    const [schedule, setSchedule] = useState(false);
    const [adviser, setAdviser] = useState([]);
    const [noRequest, setNoRequest] = useState(false);

    const setStyle = [];
    var setRating = adviser.advisor_rating;

    const baseUrl = `https://localhost:44397/api/advisors/${idUser}`;

    const mostrar = (valueNew) => {
        if (valueNew === 0) {
            setProfile(true);
            setComments(false);
            setSchedule(false);
        }
        else if (valueNew === 1) {
            setProfile(false);
            setComments(true);
            setSchedule(false);
        }
        else {
            setProfile(false);
            setComments(false);
            setSchedule(true);
        }
    }

    const peticionesGet = async () => {
        await axios.get(baseUrl)
            .then(Response => {
                setAdviser(Response.data);
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
        if (!cookies.get('UserCode')) {
            navigate('/');
        }
    });

    for (var i = 1; i <= 5; i++) {
        if (setRating !== 0) {
            setStyle[i] = startFill;
            setRating -= 1;
        }
        else {
            setStyle[i] = startOutline;
        }
        setStyle.push(setStyle[i]);
    }
    setStyle.pop(setStyle[6]);

    return (
        <>
            {
                noRequest
                ?
                    <Wrong />
                :
                    <Container minWidht="sm">
                        <Grid>
                            <Card sx={{ mb: 3 }}>
                                <CardMedia
                                    component="div"
                                    sx={{ width: '100%', height: '175px', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', bgcolor: 'primary.main' }}
                                />
                                <CardContent sx={{ display: 'flex', justifyContent: 'flex-end', padding: 0, ':last-child': { pb: 0 } }}>
                                    <div style={{ position: 'absolute', left: 28, top: 80, display: 'flex', alignItems: 'center' }}>
                                        <Box
                                            component="img"
                                            src={`data:image/png;base64,${adviser.userx_image !== '' ? adviser.userx_image : MockImgAvatar()}`}
                                            sx={{ width: 120, borderRadius: 12, height: 120 }}
                                        />
                                        <Box sx={{ pl: 4, pt: 2 }}>
                                            <Typography variant="h4" color="common.white">
                                                {`${adviser.userx_name} ${adviser.userx_lastname}`}
                                            </Typography>
                                        </Box>
                                    </div>

                                    <div style={{ position: 'absolute', right: 24, top: 0, display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ pl: 4, pt: 2 }}>
                                            {
                                                setStyle.map(function (data, number) {
                                                    return (<Icon icon={setStyle[number]} width="24px" style={{ marginLeft: '2px', color: '#FFF' }} />);
                                                })
                                            }
                                        </Box>
                                    </div>

                                    <Box style={{ borderBottomRightRadius: '12px' }}>
                                        <BottomNavigation
                                            showLabels
                                            value={value}
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                                mostrar(newValue);
                                            }}
                                            style={{ background: 'transparent' }}
                                        >
                                            <BottomNavigationAction label="Perfil" />
                                            <BottomNavigationAction label="Comentarios" />
                                            <BottomNavigationAction label="Agendar" />
                                        </BottomNavigation>
                                    </Box>
                                </CardContent>
                            </Card>

                            {
                                profile
                                ?
                                    <ProfileInformation
                                        email={adviser.userx_email}
                                        rating={adviser.advisor_rating}
                                        biografia={adviser.advisor_comments}
                                    />
                                :
                                    null
                            }
                            {
                                comments
                                ?
                                    <ProfileComments name={adviser.userx_name} adviser={idUser} />
                                :
                                    null
                            }
                            {
                                schedule
                                ?
                                    <Alert border-radius="12px" severity="warning">
                                        Se selecciona la opción agendar
                                    </Alert>
                                :
                                    null
                            }
                        </Grid>
                    </Container>
            }
        </>
    );
}

export default AdvisorProfile;