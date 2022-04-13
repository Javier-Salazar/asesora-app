import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import {
    Stack, Container, Typography, Card, CardContent, Button, DialogActions, Dialog,
    DialogTitle, DialogContent
} from '@mui/material';
import Page from '../components/Page';
import esLocale from '@fullcalendar/core/locales/es';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Calendar() {
    const cookies = new Cookies();
    const [data, setData] = useState([]);
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
        setOpen(true);
        //alert('Event: ' + info.event.id);
    }

    const [open, setOpen] = useState(false);
    const handleClose = () => {
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
            <Dialog open={open} TransitionComponent={Transition} onClose={handleClose}>
                <DialogTitle>Información de asesoría</DialogTitle>
                <DialogContent>
                    ¿Estas seguro de querer inactivar al usuario?
                    Esta acción se podrá revertir editando el usuario
                </DialogContent>
                <DialogActions sx={{ pb: 2, pr: 3, maxWidth: '75%', ml: '75%' }}>
                    <Button fullWidth variant="contained" onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </Page >

    );
}
export default Calendar;