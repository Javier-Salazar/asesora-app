import { Typography, Card, CardContent, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';

function ProfileComments(props) {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="subtitle1" color="text.primary" sx={{mb: 1}}>
                            Hola, estos son los comentarios sobre las asesorías de {props.name}
                        </Typography>
                        <List>
                            <div>
                                <ListItem button key="student">
                                    <ListItemAvatar>
                                        <Avatar alt="student" src="/static/mock-images/avatars/avatar_2.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText primary="Karina Sánchez" secondary="Excelente servicio..." />
                                </ListItem>

                                <ListItem button key="student2">
                                    <ListItemAvatar>
                                        <Avatar alt="student" src="/static/mock-images/avatars/avatar_3.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText primary="Javier Salazar" secondary="Opino lo mismo..." />
                                </ListItem>
                            </div>
                        </List>
                    </CardContent>
                </Card>
            </Grid>
        </Grid >
    );
}

export default ProfileComments;