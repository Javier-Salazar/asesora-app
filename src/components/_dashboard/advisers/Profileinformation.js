import { Typography, Card, CardContent, Grid, Container } from '@mui/material';
import { Icon } from '@iconify/react';
import emailFill from '@iconify/icons-eva/email-fill';
import briefcaseFill from '@iconify/icons-eva/briefcase-fill';
import startFill from '@iconify/icons-eva/star-fill';

function Profileinformation(props) {

    return (
        <Grid container spacing={3}>
            <Grid item xs={6} md={4}>
                <Card sx={{ height: 150 }}>
                    <CardContent>
                        <Typography variant="subtitle1" color="text.primary">
                            Información
                        </Typography>
                        <br></br>
                        <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
                            <Icon icon={emailFill} />&nbsp; {props.email}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
                            <Icon icon={briefcaseFill} />&nbsp; Asesor en ITCJ
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
                            <Icon icon={startFill} />&nbsp; {`${props.rating}${".0"}`}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} md={8}>
                <Card sx={{ height: 280 }}>
                    <CardContent>
                        <Typography variant="subtitle1" color="text.primary">
                            Biografía
                        </Typography>
                        <br></br>
                        <Typography variant="body2" color="text.secondary" align="justify">
                            {props.biografia}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid >
    );
}

export default Profileinformation;