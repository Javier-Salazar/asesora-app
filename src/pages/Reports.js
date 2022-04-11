import * as React from 'react';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid';
import { Stack, Container, Typography, Card, Avatar } from '@mui/material';
import Page from '../components/Page';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Label from '../components/Label';
import { sentenceCase } from 'change-case';
import MockImgAvatar from '../utils/mockImages';
import Cookies from 'universal-cookie';

function changeLabelModality(text) {
    if (text === 'P') {
        return 'Presencial';
    }
    else {
        return 'Virtual';
    }
}

function changeLabelStatus(text) {
    if (text === 'A') {
        return 'Aceptada';
    } else if (text === 'C') {
        return 'Cancelada'
    } else {
        return 'Solicitada'
    }
}

function dateTimeFormat(date) {
    var dateTimeArray = date.split('T');
    var dateArray = dateTimeArray[0].split('-');
    var timeArray = dateTimeArray[1].split(':');
    return (dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0] + " " + timeArray[0] + ":" + timeArray[1])
}

function showDateTime(text) {
    var dateTimeArray = text.split(" ");
    var dateArray = text.split("/");
    return (dateArray[1] + "/" + dateArray[0] + "/" + dateArray[0] + " " + dateTimeArray[1])
}

function Reports() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    useEffect(() => {
        if (!cookies.get('UserCode')) {
            navigate('/');
        }
    });

    const columns = [
        { field: 'adviseStudent', headerName: 'Código est.', width: 100, description: 'El código del estudiante' },
        {
            field: 'studentImage', headerName: 'Estudiante', width: 100, disableExport: true,
            renderCell: (params) => {
                return (
                    <>
                        {
                            params.value === ''
                                ?
                                <Avatar src={`data:image/png;base64,${MockImgAvatar()}`} />
                                :
                                <Avatar src={`data:image/png;base64,${params.value}`} />
                        }
                    </>
                )
            }
        },
        { field: 'studentName', headerName: 'Nombre del estudiante', width: 325 },
        { field: 'studentEmail', headerName: 'Correo de est.', width: 200 },
        { field: 'studentPhone', headerName: 'Teléfono est.', width: 150 },
        { field: 'adviseTopic', headerName: 'Tema', width: 250 },
        { field: 'subjectName', headerName: 'Materia', width: 250 },
        { field: 'adviseAdvisor', headerName: 'Código ases.', width: 125 },
        {
            field: 'advisorImage', headerName: 'Asesor', width: 100, disableExport: true,
            renderCell: (params) => {
                return (
                    <>
                        {
                            params.value === ''
                                ?
                                <Avatar src={`data:image/png;base64,${MockImgAvatar()}`} />
                                :
                                <Avatar src={`data:image/png;base64,${params.value}`} />
                        }
                    </>
                )
            }
        },
        { field: 'advisorName', headerName: 'Nombre del asesor', width: 325 },
        { field: 'advisorEmail', headerName: 'Correo de ases.', width: 230 },
        { field: 'advisorPhone', headerName: 'Teléfono ases.', width: 150 },
        { field: 'counselingLocationInfo', headerName: 'Información de lugar', width: 350 },
        {
            field: 'adviseDateRequest', headerName: 'Fecha de solicitud', width: 160, type: 'dateTime',
            renderCell: (params) => {
                return (
                    <>
                        <Typography variant="body2" gutterBottom>
                            {showDateTime(params.value)}
                        </Typography>
                    </>
                )

            }
        },
        {
            field: 'adviseDateStart', headerName: 'Fecha de inicio', width: 160, type: 'dateTime',
            renderCell: (params) => {
                return (
                    <>
                        <Typography variant="body2" gutterBottom>
                            {showDateTime(params.value)}
                        </Typography>
                    </>
                )

            }
        },
        {
            field: 'adviseDateEnds', headerName: 'Fecha de término', width: 160, type: 'dateTime',
            renderCell: (params) => {
                return (
                    <>
                        <Typography variant="body2" gutterBottom>
                            {showDateTime(params.value)}
                        </Typography>
                    </>
                )

            }
        },
        {
            field: 'adviseModality', headerName: 'Modalidad', width: 120,
            renderCell: (params) => {
                return (
                    <>
                        <Label
                            variant="ghost"
                            color={(params.value === 'Virtual' && 'virtual') || 'default'}
                        >
                            {sentenceCase(params.value)}
                        </Label>
                    </>
                )
            }
        },
        {
            field: 'adviseStatus', headerName: 'Estatus', width: 120,
            renderCell: (params) => {
                return (
                    <>
                        <Label
                            variant="ghost"
                            color={(params.value === 'Aceptada' && 'info') || (params.value === 'Solicitada' && 'warning')
                                || 'error'}
                        >
                            {sentenceCase(params.value)}
                        </Label>
                    </>
                )
            }
        },
        { field: 'adviseComments', headerName: 'Comentarios', width: 450 }

    ]

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

    const adviceList = data.map((element => ({
        id: element.advise_code,
        adviseStudent: element.advise_student,
        studentName: `${element.studentName} ${element.studentLastName} ${element.studentLastMotherName}`,
        studentEmail: element.studentEmail,
        studentPhone: element.studentPhone,
        adviseTopic: element.advise_topic,
        subjectName: element.subjectx_name,
        adviseAdvisor: element.advise_advisor,
        advisorName: `${element.advisorName} ${element.advisorLastName} ${element.advisorLastMotherName}`,
        advisorEmail: element.advisorEmail,
        advisorPhone: element.advisorPhone,
        counselingLocationInfo:
            element.advise_modality === 'V'
                ?
                'https://meet.google.com/iak-rjwk-oof'
                :
                `${'Edificio:'} ${element.building_name} ${'-'} ${element.classroom_name}`,
        adviseDateRequest: dateTimeFormat(element.advise_date_request),
        adviseDateStart: dateTimeFormat(element.advise_date_start),
        adviseDateEnds: dateTimeFormat(element.advise_date_ends),
        adviseModality: changeLabelModality(element.advise_modality),
        adviseComments: element.advise_comments,
        adviseStatus: changeLabelStatus(element.advise_status),
        studentImage: element.studentImage,
        advisorImage: element.advisorImage
    })));

    return (
        <Page title="AsesoraApp | Asesorías">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Asesorías
                    </Typography>
                </Stack>
                <Card style={{ height: 472, width: '100%' }}>
                    <div style={{ height: '100%', width: '100%' }}>
                        <DataGrid
                            rows={adviceList}
                            columns={columns}
                            components={{
                                Toolbar: GridToolbar,
                            }}
                            componentsProps={{ toolbar: { csvOptions: { utf8WithBom: true } } }}
                            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                            initialState={{
                                columns: {
                                    columnVisibilityModel: {
                                        studentName: false,
                                        studentEmail: false,
                                        studentPhone: false,
                                        advisorName: false,
                                        advisorEmail: false,
                                        advisorPhone: false,
                                        counselingLocationInfo: false,
                                        adviseDateEnds: false,
                                        adviseDateRequest: false,
                                        adviseComments: false,
                                        studentImage: false,
                                        advisorImage: false,
                                    },
                                },
                            }}
                            disableSelectionOnClick
                        />
                    </div>
                </Card>
            </Container>
        </Page >

    );
}
export default Reports;

