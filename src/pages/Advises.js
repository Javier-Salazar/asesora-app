import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { Icon } from '@iconify/react';
import startFill from '@iconify/icons-eva/star-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
import heartOutline from '@iconify/icons-eva/heart-outline';
import heartFill from '@iconify/icons-eva/heart-fill';
import { Typography, Box, Stack, Button, Grid, IconButton, Tooltip, Chip } from '@mui/material';

const ChipStyled = styled(Chip)(({theme}) => ({
    color: theme.palette.primary.main,
    backgroundColor: '#EBF8F6'
}));

function Advises(props) {
    const [like, setLike] = useState(false);

    const handleLike = () => {
        setLike(!like);
    }

    return (
        <Stack
            alignItems="center"
            spacing={0}
            sx={{p: 2}}
        >
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                <Typography gutterBottom variant="h6" sx={{m: 0}}>
                    {props.name}
                </Typography>
                <IconButton color="error" size="small" onClick={handleLike} style={{alignSelf: 'flex-start'}}>
                    {
                        like 
                        ?
                            <Tooltip title="Quitar de favoritos" placement="top" arrow>
                                <Icon icon={heartFill} width="32px" />
                            </Tooltip>
                            
                        : 
                            <Tooltip title="Añadir a favoritos" placement="top" arrow>
                                <Icon icon={heartOutline} width="32px" />
                            </Tooltip>
                    }
                </IconButton>
            </div>

            <Box sx={{ flex: 'flex' , textAlign: 'left', border: '1px blue solid', mt: 1 }}>
                <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                    <ChipStyled label="Matemáticas" sx={{mb: 1}} />
                    <ChipStyled label="Programacion" sx={{mb: 1}} />
                    <ChipStyled label="investigacion" />
                    <ChipStyled label="Matemáticas" />
                </div>

                <div style={{display: 'inline-flex'}}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center'}}>
                        {props.rating}&nbsp;
                        <Icon icon={startFill} />
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', pl: 2 }}>
                        {props.comments}&nbsp;
                        <Icon icon={messageCircleFill} />
                    </Typography>
                </div>
            </Box>

            <Grid container columnSpacing={0} sx={{mt: 3}}>
                <Grid item xs={6} sm={6}>
                    <Button fullWidth to="#" component={RouterLink}>
                        ver perfil
                    </Button>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <Button fullWidth to="#" component={RouterLink}>
                        agendar
                    </Button>
                </Grid>
            </Grid>
        </Stack>
    );
}
export default Advises;