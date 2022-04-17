import { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { Wrong } from '../errors';
import MockImgAvatar from '../../../utils/mockImages';
import axios from 'axios';

function ProfileComments(props) {

    const baseUrl = "https://localhost:44397/api/advises";
    const [data, setData] = useState([]);
    const [noRequest, setNoRequest] = useState(false);

    const peticionesGet = async () => {
        await axios.get(baseUrl)
            .then(Response => {
                setData(Response.data);
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


    useEffect(() => {
        peticionesGet();
    }, []);

    const loadData = () => {
        var filterResults = data.filter((element) => {
            if (element.advise_advisor === props.adviser) {

                return element;
            }
            return filterResults;
        });
        return filterResults;
    };


    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="subtitle1" color="text.primary" sx={{ mb: 1 }}>
                            Hola, estos son los comentarios sobre las asesorías de {props.name}
                        </Typography>

                        <List>
                            <div>
                                {
                                    noRequest
                                    ?
                                        <Wrong />
                                    :
                                        loadData().map(element => (
                                            <ListItem button key={element.advise_code}>
                                                <ListItemAvatar>
                                                    <Avatar alt={element.studentName} src={`data:image/png;base64,${element.studentImage !== '' ? element.studentImage : MockImgAvatar()}`} />
                                                </ListItemAvatar>
                                                <ListItemText primary={`${element.studentName} ${element.studentLastName} ${element.studentLastMotherName}`} secondary={element.advise_comments} />
                                            </ListItem>
                                        ))
                                }
                            </div>
                        </List>
                    </CardContent>
                </Card>
            </Grid>
        </Grid >
    );
}

export default ProfileComments;