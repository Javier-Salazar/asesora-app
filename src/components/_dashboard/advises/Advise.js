import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { Icon } from '@iconify/react';
import startFill from '@iconify/icons-eva/star-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
import { sentenceCase } from 'change-case';
import { Typography, Box, Stack, Button, Grid, Avatar, Snackbar, Alert, Chip, IconButton,
    Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Label from '../../../components/Label';
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
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);

    var gapi = window.gapi;
    var CLIENT_ID = '403325894307-riktnlopiv84g0mjisqa6b9rgclkeigo.apps.googleusercontent.com';
    var API_KEY = 'AIzaSyAN18U9TJjC3nVndaQM6ovngAAnJvOvgZU';
    var DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
    var SCOPES = 'https://www.googleapis.com/auth/calendar';
    var event = {};

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setShowAlert({ message: '', show: false, duration: 0 });
    }

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
                    if (props.modality === 'P') {
                        event = {
                            'summary': 'AsesoraApp',
                            'location': 'ITCJ- Edificio: ISC',
                            'description': `Cita para tomar asesoría de ${props.subject}`,
                            'colorId': 2,
                            'start': {
                                'dateTime': props.start,
                                'timeZone': 'America/Chihuahua'
                            },
                            'end': {
                                'dateTime': props.end,
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
                            'description': `Cita para tomar asesoría de ${props.subject}`,
                            'colorId': 2,
                            'start': {
                                'dateTime': props.start,
                                'timeZone': 'America/Chihuahua'
                            },
                            'end': {
                                'dateTime': props.end,
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
                                        "uri": 'https://meet.google.com/pia-iajq-nht?pli=1&authuser=0',
                                        "label": `Reunión ${props.subject}`,
                                        "meetingCode": 'pia-iajq-nht',
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
                        setShowAlert({
                            message: '¡Se agendó la asesoría con éxito!, puedes consultarla en tu calendario',
                            show: true,
                            duration: 6000
                        });
                        setOpen(true);
                        setLoading(false);
                        setDisabled(true);
                    })

                })
        });
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setShowAlert({message: '', show: false, duration: 0});
        setOpen(false);
        setLoading(false);
        setDisabled(false);
    }

    const handleClick = () => {
        setLoading(true);
        setOpenDialog(true);
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

            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <div style={{ display: 'inline-flex' }}>
                    <ChipStyled label={`Fecha ${dateFormat(props.start)}`}/>
                    <ChipStyled label={`Horario ${timeFormat(props.start, props.end)}`}/>
                </div>
            </Box>

            <Box sx={{ mt: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <IconButton
                        to={`/dashboard/adviser-profile/${props.id}`}
                        component={RouterLink}
                        sx={{
                            padding: 0,
                            width: 35,
                            height: 35
                        }}>
                        <Avatar
                            src={`data:image/png;base64,${props.image}`}
                            alt={props.id}
                        />
                    </IconButton>
                    <Typography variant="body2" sx={{ color: 'text.secondary', pl: 2 }}>
                        {props.adviser}
                    </Typography>
                </div>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <div style={{ display: 'inline-flex' }}>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
                        {props.comments}&nbsp;
                        <Icon icon={messageCircleFill} />
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', pl: 1 }}>
                        {props.rating}&nbsp;
                        <Icon icon={startFill} />
                    </Typography>
                </div>
            </Box>

            <Grid container columnSpacing={0} sx={{ mt: 2 }}>
                <LoadingButton fullWidth onClick={handleClick} loading={loading} disabled={disabled}>
                    agendar asesoría
                </LoadingButton>
            </Grid>

            <Dialog open={openDialog} TransitionComponent={Transition} onClose={handleCloseDialog}>
                <DialogTitle>Registrar asesoría</DialogTitle>
                <DialogContent>
                    Estas a punto de agregar esta asesoría a tu calendario ¿Deseas continuar?
                </DialogContent>
                <DialogActions sx={{ pb: 2, pr: 3, maxWidth: '50%', ml: '50%' }}>
                    <Button fullWidth variant="contained" onClick={googleCalendar}>aceptar</Button>
                    <Button fullWidth onClick={handleCloseDialog}>cancelar</Button>
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