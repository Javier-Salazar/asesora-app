import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Icon } from '@iconify/react';
import startFill from '@iconify/icons-eva/star-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
import { sentenceCase } from 'change-case';
import { Typography, Box, Stack, Button, Grid, Chip, Avatar, Snackbar, Alert } from '@mui/material';
import Label from '../../../components/Label';
import MockImgAvatar from '../../../utils/mockImages';

const ChipStyled = styled(Chip)(({theme}) => ({
    color: theme.palette.primary.main,
    backgroundColor: '#EBF8F6'
}));

function Advise(props) {
    const [showAlert, setShowAlert] = useState({ message: '', show: false, duration: 0 });
    const[open, setOpen] = useState(false);
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

    if(props.modality === 'V'){
        modality = 'virtual';
    }
    else{
        modality = 'presencial';
    }

    return (
        <Stack
            alignItems="center"
            spacing={0}
            sx={{p: 2}}
        >
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                <Typography gutterBottom variant="h6" sx={{m: 0, mr: 1}}>
                    {props.subject}
                </Typography>
                <Label
                    variant="ghost"
                    color={(modality === 'virtual' && 'virtual') || 'default'}
                    style={{alignSelf: 'flex-start', minWidth: 'auto'}}
                >
                    {sentenceCase(modality)}
                </Label>
            </div>

            <Box sx={{ flex: 'flex' , textAlign: 'left', mt: 3 }}>
                <div style={{display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
                {
                        props.tag1 !== ''
                        ?
                            <ChipStyled label={props.tag1} sx={{mb: 1, mr: 1}} />
                        :
                            null
                    }
                    {
                        props.tag2 !== ''
                        ?
                            <ChipStyled label={props.tag2} sx={{mb: 1}} />
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

                <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 3}}>
                    <div style={{display: 'inline-flex'}}>
                        <Avatar src={`data:image/png;base64,${props.image !== '' ? props.image : MockImgAvatar()}`} alt="avatar_1" 
                            sx={{ width: 35, height: 35 }}
                        />
                        <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', pl: 1 }}>
                            {props.adviser}
                        </Typography>
                    </div>
                    
                    <div style={{display: 'inline-flex'}}>
                        <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center'}}>
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

            <Grid container columnSpacing={0} sx={{mt: 2}}>
                <Button fullWidth onClick={handleClickOpen}>
                    agendar
                </Button>
            </Grid>

            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                autoHideDuration={showAlert.duration} 
                onClose={handleClose}
                sx={{mt: 10}}
            >
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%', boxShadow: 10 }}>
                {showAlert.message}
              </Alert>
            </Snackbar>
        </Stack>
    );
}
export default Advise;