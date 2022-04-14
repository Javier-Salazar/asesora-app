import React from 'react';
import FullCalendar, { ViewContextType } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { useNavigate } from 'react-router-dom';
import timeGridPlugin from '@fullcalendar/timegrid';
import {
    Stack, Container, Typography, Card, CardContent, Button, DialogActions, Dialog,
    DialogTitle, DialogContent, TextField, CircularProgress
} from '@mui/material';
import Page from '../components/Page';
import esLocale from '@fullcalendar/core/locales/es';
import { useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Slide from '@mui/material/Slide';
import Label from '../components/Label';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function dateFormat(date) {
    var dateTimeArray = date.split('T');
    var dateArray = dateTimeArray[0].split('-');
    return (dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0])
}

function timeFormat(dateStart, dateEnd) {
    var dateTimeStartArray = dateStart.split('T');
    var dateTimeEndArray = dateEnd.split('T');
    var timeStartArray = dateTimeStartArray[1].split(':');
    var timeEndArray = dateTimeEndArray[1].split(':');
    return (timeStartArray[0] + ":" + timeStartArray[1] + " - " + timeEndArray[0] + ":" + timeEndArray[1])
}

function changeLabelModality(text) {
    if (text === 'P') {
        return 'Presencial';
    }
    else {
        return 'Virtual';
    }
}

function Calendar() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    useEffect(() => {
        if (!cookies.get('UserCode')) {
            navigate('/');
        }
    });

    const [data, setData] = useState([]);
    const [selectedAdvise, setSelectedAdvise] = useState({ advise_code: '' });
    const baseUrl = "https://localhost:44397/api/advises";
    const requestGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        requestGet();
    }, []);

    const filterData = () => {
        var filterResults = data.filter((element) => {
            if (cookies.get('UserType') === 'N') {
                if (element.advise_student === cookies.get('UserCode')) {
                    return element;
                }
            } else if (cookies.get('UserType') === 'A') {
                if (element.advise_advisor === cookies.get('UserCode')) {
                    return element;
                }
            }
            return filterResults;
        });
        return filterResults;
    };

    const adviceList = filterData().map((element => ({
        id: element.advise_code,
        title: element.subjectx_name,
        start: element.advise_date_start,
        end: element.advise_date_ends,
        backgroundColor: element.advise_modality === 'P' ? '#EDEFF1' : '#E8E1FF',
        borderColor: element.advise_modality === 'P' ? '#C7C8C8' : '#B9B2CE',
        textColor: element.advise_modality === 'P' ? '#637381' : '#4B29BA'
    })));


    const handleEventClick = (info) => {
        axios.get("https://localhost:44397/api/advises/" + info.event.id)
            .then(response => {
                setSelectedAdvise(response.data);
            }).catch(error => {
                console.log(error);
            });
        setOpen(true);
    }

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setSelectedAdvise({ advise_code: '' });
        setOpen(false);
    }

    return (
        <Page title="AsesoraApp | Calendario">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Calendario
                    </Typography>
                </Stack>
                <Card>

                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <FullCalendar
                            height={'auto'}
                            width={'auto'}
                            plugins={[dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin]}
                            initialView="dayGridMonth"
                            weekends={true}
                            events={adviceList}
                            eventDisplay={'block'}
                            headerToolbar={{
                                right: 'prev,next today',
                                center: 'title',
                                left: 'dayGridMonth,timeGridWeek,timeGridDay'//listWeek
                            }}
                            nowIndicator={true}
                            locale={esLocale}
                            dayMaxEventRows={4}
                            eventClick={(e) => handleEventClick(e)}
                        />
                    </CardContent>
                </Card>
            </Container>
            <Dialog open={open} TransitionComponent={Transition} onClose={handleClose} fullWidth={true}
                maxWidth={'xs'}>
                <DialogTitle>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Typography gutterBottom variant="h7" sx={{ m: 0, mr: 1 }}>
                            Información de asesoría
                        </Typography>
                        <Label
                            variant="ghost"
                            color={(selectedAdvise.advise_modality === 'V' && 'virtual') || 'default'}
                            style={{ alignSelf: 'flex-end', minWidth: 'auto' }}
                        >
                            {sentenceCase(changeLabelModality(selectedAdvise.advise_modality))}
                        </Label>
                    </div>
                </DialogTitle>
                <DialogContent>
                    {
                        selectedAdvise.advise_code === ''
                            ?
                            <CircularProgress color="success" />
                            :
                            <Stack spacing={2} sx={{ padding: '12px' }}>

                                <TextField
                                    fullWidth
                                    label="Materia"
                                    value={selectedAdvise.subjectx_name}
                                    disabled
                                />
                                <TextField
                                    fullWidth
                                    label="Tema"
                                    value={selectedAdvise.advise_topic}
                                    disabled
                                />
                                {
                                    cookies.get('UserType') === 'N'
                                        ?
                                        <TextField
                                            fullWidth
                                            label="Asesor"
                                            value={`${selectedAdvise.advisorName} ${selectedAdvise.advisorLastName} ${selectedAdvise.advisorLastMotherName}`}
                                            disabled
                                        />
                                        :
                                        <TextField
                                            fullWidth
                                            label="Alumno"
                                            value={`${selectedAdvise.studentName} ${selectedAdvise.studentLastName} ${selectedAdvise.studentLastMotherName}`}
                                            disabled
                                        />
                                }

                                <TextField
                                    fullWidth
                                    label="Fecha"
                                    value={dateFormat(selectedAdvise.advise_date_start)}
                                    disabled
                                />
                                <TextField
                                    fullWidth
                                    label="Hora"
                                    value={timeFormat(selectedAdvise.advise_date_start, selectedAdvise.advise_date_ends)}
                                    disabled
                                />

                                <TextField
                                    fullWidth
                                    label="Lugar"
                                    value={
                                        selectedAdvise.advise_modality === 'V'
                                            ?
                                            selectedAdvise.advise_url
                                            :
                                            `${'Edificio:'} ${selectedAdvise.building_name} ${'-'} ${selectedAdvise.classroom_name}`
                                    }
                                    disabled
                                />

                            </Stack>
                    }
                </DialogContent>

                <DialogActions sx={{ pb: 2, pr: 3, maxWidth: '75%', ml: '75%' }}>
                    <Button fullWidth variant="contained" onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </Page >

    );
}
export default Calendar;