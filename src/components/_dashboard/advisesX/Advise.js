import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { Icon } from '@iconify/react';
import startFill from '@iconify/icons-eva/star-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
import { sentenceCase } from 'change-case';
import {
    Typography, Box, Stack, Button, Grid, Chip, Avatar, Snackbar, Alert, IconButton,
    Dialog, DialogContent, DialogActions, DialogTitle
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Label from '../../../components/Label';
import MockImgAvatar from '../../../utils/mockImages';
import axios from 'axios';
import Slide from '@mui/material/Slide';

const ChipStyled = styled(Chip)(({ theme }) => ({
    color: theme.palette.primary.main,
    backgroundColor: '#EBF8F6'
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function dateFormat(date) {
    var dateTimeArray = date.split('T');
    var dateArray = dateTimeArray[0].split('-');
    return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
}

function timeFormat(dateStart, dateEnd) {
    var dateTimeStartArray = dateStart.split('T');
    var dateTimeEndArray = dateEnd.split('T');
    var timeStartArray = dateTimeStartArray[1].split(':');
    var timeEndArray = dateTimeEndArray[1].split(':');
    return `${timeStartArray[0]}:${timeStartArray[1]} - ${timeEndArray[0]}:${timeEndArray[1]}`;
}

function changeLabelModality(text) {
    if (text === 'P') {
        return sentenceCase('presencial');
    }
    else {
        return sentenceCase('virtual');
    }
}

function Advise(props) {

    const [showAlert, setShowAlert] = useState({ message: '', show: false, duration: 0 });
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [advises, setAdvises] = useState([]);
    const [selectedAdvise, setSelectedAdvise] = useState([]);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const baseUrl = "https://localhost:44397/api/advises";

    const peticionesGet = async () => {
        await axios.get(baseUrl)
            .then(Response => {
                setAdvises(Response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        peticionesGet();;
    }, []);

    var gapi = window.gapi;
    var CLIENT_ID = "403325894307-riktnlopiv84g0mjisqa6b9rgclkeigo.apps.googleusercontent.com";
    var API_KEY = "AIzaSyAN18U9TJjC3nVndaQM6ovngAAnJvOvgZU";
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    var SCOPES = "https://www.googleapis.com/auth/calendar";
    var event = {};
    const googleCalendar = () => {
        setOpenDialog(false);

        gapi.load('client:auth2', () => {
            console.log('loaded client')

            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            })

            gapi.client.load('calendar', 'v3', () => console.log('bam!'));

            gapi.auth2.getAuthInstance().signIn()
                .then(() => {
                    if (selectedAdvise.advise_modality === 'P') {
                        event = {
                            'summary': 'AsesoraApp',
                            'location': `ITCJ- Edificio: ${selectedAdvise.building_name} - ${selectedAdvise.classroom_name}`,
                            'description': `Cita para tomar asesoría de ${selectedAdvise.subjectx_name}`,
                            'colorId': 2,
                            'start': {
                                'dateTime': selectedAdvise.advise_date_start,
                                'timeZone': 'America/Chihuahua'
                            },
                            'end': {
                                'dateTime': selectedAdvise.advise_date_ends,
                                'timeZone': 'America/Chihuahua'
                            },
                            'reminders': {
                                'useDefault': false,
                                'overrides': [
                                    { 'method': 'popup', 'minutes': 3 * 60 },
                                ],
                            }
                        }
                    } else {
                        event = {
                            'summary': 'AsesoraApp',
                            'location': 'Reunión en Meet',
                            'description': `Cita para tomar asesoría de ${selectedAdvise.subjectx_name}`,
                            'colorId': 2,
                            'start': {
                                'dateTime': selectedAdvise.advise_date_start,
                                'timeZone': 'America/Chihuahua'
                            },
                            'end': {
                                'dateTime': selectedAdvise.advise_date_ends,
                                'timeZone': 'America/Chihuahua'
                            },
                            'reminders': {
                                'useDefault': false,
                                'overrides': [
                                    { 'method': 'popup', 'minutes': 15 },
                                ],
                            },
                            "conferenceData": {
                                "entryPoints": [
                                    {
                                        "entryPointType": 'video',
                                        "uri": selectedAdvise.advise_url,
                                        "label": selectedAdvise.advise_url,
                                        "meetingCode": selectedAdvise.advise_url,
                                    }
                                ],
                                "conferenceSolution": {
                                    "key": {
                                        "type": 'hangoutsMeet'
                                    }
                                },
                            },

                        }
                    }

                    var request = gapi.client.calendar.events.insert({
                        'calendarId': 'primary',
                        'resource': event,
                        'conferenceDataVersion': 1
                    })

                    request.execute(event => {
                        window.open(event.htmlLink);
                        setShowAlert({
                            message: '¡Se agendó la asesoría con éxito!, puedes consultarla en tu calendario',
                            show: true,
                            duration: 6000
                        });
                        setOpen(true);
                    })

                })
        });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setShowAlert({ message: '', show: false, duration: 0 });
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setShowAlert({
            message: '¡Se agendó la asesoría con éxito!, puedes consultarla en tu calendario',
            show: true,
            duration: 6000
        });
        setOpen(true);
    }

    const date = new Date();
    const peticionPut = () => {
        advises.filter((element) => {
            if (props.id === element.advise_code) {
                setSelectedAdvise(element);
                axios.put(`${baseUrl}${'/'}${props.id}`, {
                    advise_code: element.advise_code,
                    advise_student: props.studentId,
                    advise_topic: element.advise_topic,
                    advise_subject: element.advise_subject,
                    advise_advisor: element.advise_advisor,
                    advise_school: element.advise_school,
                    advise_building: element.advise_building,
                    advise_classroom: element.advise_classroom,
                    advise_date_request: date.toISOString(),
                    advise_date_start: element.advise_date_start,
                    advise_date_ends: element.advise_date_ends,
                    advise_modality: element.advise_modality,
                    advise_url: element.advise_url,
                    advise_comments: element.advise_comments,
                    advise_status: 'A',
                }).then(response => {
                    setLoading(false);
                    setDisabled(true);
                    setOpenDialog(true);
                }).catch(error => {
                    console.log(error);
                });
            }
            return 0;
        });
        return 0;
    }


    const handleClick = () => {
        setLoading(true);
        peticionPut();
    }


    return (
        <Stack
            alignItems="center"
            spacing={0}
            sx={{ p: 2 }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Typography gutterBottom variant="h6" sx={{ m: 0, mr: 1 }}>
                    {props.subject}
                </Typography>
                <Label
                    variant="ghost"
                    color={(props.modality === 'V' && 'virtual') || 'default'}
                    style={{ alignSelf: 'flex-start', minWidth: 'auto' }}
                >
                    {changeLabelModality(props.modality)}
                </Label>
            </div>

            <Box sx={{ flex: 'flex', textAlign: 'left', mt: 3 }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                    <ChipStyled label={`Fecha ${dateFormat(props.start)}`} sx={{ mb: 1, mr: 1 }} />
                    <ChipStyled label={`Horario ${timeFormat(props.start, props.end)}`} sx={{ mb: 1 }} />
                </div>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <div style={{ display: 'inline-flex' }}>
                        <IconButton
                            to={`/dashboard/adviser-profile/${props.adviserId}`}
                            component={RouterLink}
                            sx={{
                                padding: 0,
                                width: 35,
                                height: 35
                            }}>
                            <Avatar
                                src={`data:image/png;base64,${props.image !== '' ? props.image : MockImgAvatar()}`}
                                alt={'subject.idAdvisor'}
                            />
                        </IconButton>
                        <Typography variant="body2" sx={{ color: 'text.secondary', pl: 2 }}>
                            {props.adviser}
                        </Typography>
                    </div>

                    <div style={{ display: 'inline-flex' }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
                            {props.comments}&nbsp;
                            <Icon icon={messageCircleFill} />
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', pl: 1 }}>
                            {props.rating}&nbsp;
                            <Icon icon={startFill} />
                        </Typography>
                    </div>
                </Box>
            </Box>

            <Grid container columnSpacing={0} sx={{ mt: 2 }}>
                <LoadingButton fullWidth loading={loading} disabled={disabled} onClick={handleClick}>
                    agendar
                </LoadingButton>
            </Grid>

            <Dialog open={openDialog} TransitionComponent={Transition} onClose={handleCloseDialog}>
                <DialogTitle>Google calendar</DialogTitle>
                <DialogContent>
                    ¿Deseas agendar la asesoría en tu calendario de Google?
                </DialogContent>
                <DialogActions sx={{ pb: 2, pr: 3, maxWidth: '50%', ml: '50%' }}>
                    <Button fullWidth onClick={googleCalendar}>Sí</Button>
                    <Button fullWidth variant="contained" onClick={handleCloseDialog}>No</Button>
                </DialogActions>
            </Dialog>

            {
                showAlert.show
                    ?
                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={open}
                        autoHideDuration={showAlert.duration}
                        onClose={handleClose}
                        sx={{ mt: 10 }}
                    >
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%', boxShadow: 10 }}>
                            {showAlert.message}
                        </Alert>
                    </Snackbar>
                    :
                    null
            }

        </Stack>
    );
}
export default Advise;