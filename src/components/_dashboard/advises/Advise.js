import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Icon } from '@iconify/react';
import startFill from '@iconify/icons-eva/star-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
import { sentenceCase } from 'change-case';
import { Typography, Box, Stack, Button, Grid, Chip, Avatar, Snackbar, Alert } from '@mui/material';
import Label from '../../../components/Label';
import MockImgAvatar from '../../../utils/mockImages';

const ChipStyled = styled(Chip)(({ theme }) => ({
    color: theme.palette.primary.main,
    backgroundColor: '#EBF8F6'
}));

var gapi = window.gapi

var CLIENT_ID = "403325894307-riktnlopiv84g0mjisqa6b9rgclkeigo.apps.googleusercontent.com"
var API_KEY = "AIzaSyAN18U9TJjC3nVndaQM6ovngAAnJvOvgZU"
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
var SCOPES = "https://www.googleapis.com/auth/calendar"


const handleClick = () => {
    gapi.load('client:auth2', () => {
        console.log('loaded client')

        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
        })

        gapi.client.load('calendar', 'v3', () => console.log('bam!'))

        gapi.auth2.getAuthInstance().signIn()
            .then(() => {
                var event = {
                    'summary': 'PruebaParaAsesora',
                    'location': 'Instituto Tecnologico de Ciudad Juarez',
                    'description': 'Esto es una prueba para el funicionamiento de la api',
                    'start': {
                        'dateTime': '2022-04-03T20:00:00',
                        'timeZone': 'America/Los_Angeles'
                    },
                    'end': {
                        'dateTime': '2022-04-03T20:30:00',
                        'timeZone': 'America/Los_Angeles'
                    },
                    'reminders': {
                        'useDefault': false,
                        'overrides': [
                            { 'method': 'email', 'minutes': 24 * 60 },
                            { 'method': 'popup', 'minutes': 10 },
                        ],
                    },
                    "conferenceData": {
                        "createRequest": {
                            "conferenceSolutionKey": {
                                "type": "hangoutsMeet"
                            },
                            "requestId": "AsesoraApp"
                        }
                    },
                }

                var request = gapi.client.calendar.events.insert({
                    'calendarId': 'primary',
                    'resource': event,
                    'conferenceDataVersion': 1
                })

                request.execute(event => {
                    window.open(event.htmlLink);
                })

            })



    })
}

function Advise(props) {
    const [showAlert, setShowAlert] = useState({ message: '', show: false, duration: 0 });
    const [open, setOpen] = useState(false);
    var modality;

    const handleClickOpen = () => {
        setShowAlert({
            message: 'Hemos agregado este evento con éxito a tu calendario',
            show: true,
            duration: 5000,
        });
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setShowAlert(false);
    }

    if (props.modality === 'V') {
        modality = 'virtual';
    }
    else {
        modality = 'presencial';
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
                    color={(modality === 'virtual' && 'virtual') || 'default'}
                    style={{ alignSelf: 'flex-start', minWidth: 'auto' }}
                >
                    {sentenceCase(modality)}
                </Label>
            </div>

            <Box sx={{ flex: 'flex', textAlign: 'left', mt: 3 }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                    {
                        props.tag1 !== ''
                            ?
                            <ChipStyled label={props.tag1} sx={{ mb: 1, mr: 1 }} />
                            :
                            null
                    }
                    {
                        props.tag2 !== ''
                            ?
                            <ChipStyled label={props.tag2} sx={{ mb: 1 }} />
                            :
                            null
                    }
                    {
                        props.tag3 !== ''
                            ?
                            <ChipStyled label={props.tag3} />
                            :
                            null
                    }
                    {
                        props.tag4 !== ''
                            ?
                            <ChipStyled label={props.tag4} />
                            :
                            null
                    }
                </div>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <div style={{ display: 'inline-flex' }}>
                        <Avatar src={`data:image/png;base64,${props.image !== '' ? props.image : MockImgAvatar()}`} alt="avatar_1"
                            sx={{ width: 35, height: 35 }}
                        />
                        <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', pl: 1 }}>
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
                <Button fullWidth onClick={handleClick}>
                    agendar
                </Button>
            </Grid>

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
        </Stack>
    );
}
export default Advise;