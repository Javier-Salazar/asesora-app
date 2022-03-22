import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { Icon } from '@iconify/react';
import heartOutline from '@iconify/icons-eva/heart-outline';
import heartFill from '@iconify/icons-eva/heart-fill';
import { Typography, Box, Stack, Button, Grid, IconButton, Tooltip, Chip } from '@mui/material';

const ChipStyled = styled(Chip)(({theme}) => ({
    color: theme.palette.primary.main,
    backgroundColor: '#EBF8F6'
}));

function Subject(props) {
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

            <Box sx={{ flex: 'flex' , textAlign: 'left', mt: 2 }}>
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
            </Box>

            <Grid container columnSpacing={0} sx={{mt: 3}}>
                <Grid item xs={6} sm={6}>
                    <Button fullWidth to="/dashboard/adviser" component={RouterLink}>
                        ver asesores
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
export default Subject;