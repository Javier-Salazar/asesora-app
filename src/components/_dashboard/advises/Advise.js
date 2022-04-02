import styled from '@emotion/styled';
import { Icon } from '@iconify/react';
import startFill from '@iconify/icons-eva/star-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
import { Typography, Box, Stack, Button, Grid, Tooltip, Chip, Avatar } from '@mui/material';
import MockImgAvatar from '../../../utils/mockImages';

const ChipStyled = styled(Chip)(({theme}) => ({
    color: theme.palette.primary.main,
    backgroundColor: '#EBF8F6'
}));

function Advise(props) {
    return (
        <Stack
            alignItems="center"
            spacing={0}
            sx={{p: 2}}
        >
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                <Typography gutterBottom variant="h6" sx={{m: 0}}>
                    Redisign Website
                </Typography>
            </div>

            <Box sx={{ flex: 'flex' , textAlign: 'left', border: '1px blue solid', mt: 1 }}>
                <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                    <ChipStyled label="Matemáticas" sx={{mb: 1}} />
                    <ChipStyled label="Programacion" sx={{mb: 1}} />
                    <ChipStyled label="investigacion" />
                    <ChipStyled label="Matemáticas" />
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '16px'}}>
                    <div style={{display: 'inline-flex'}}>
                        <Avatar src={`data:image/png;base64,${MockImgAvatar()}`} alt="avatar_1" 
                            sx={{ width: 35, height: 35 }}
                        />
                        <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', pl: 1 }}>
                            Margarita B.
                        </Typography>
                    </div>
                    
                    <div style={{display: 'inline-flex'}}>
                        <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center'}}>
                            6&nbsp;
                            <Icon icon={messageCircleFill} />
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', pl: 1 }}>
                            3&nbsp;
                            <Icon icon={startFill} />
                        </Typography>
                    </div>
                </div>
            </Box>

            <Grid container columnSpacing={0} sx={{mt: 3}}>
                <Button fullWidth>
                    agendar
                </Button>
            </Grid>
        </Stack>
    );
}
export default Advise;