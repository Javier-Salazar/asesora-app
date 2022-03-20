import { Icon } from '@iconify/react';
import startFill from '@iconify/icons-eva/star-fill';
import { Typography, Box, Stack, Button, Grid } from '@mui/material';

function Adviser(props) {
    return (
        <Stack
            alignItems="center"
            spacing={3}
            sx={{
                p: 2.5,
                pt: 5,
                borderRadius: 2,
                position: 'relative',
                bgcolor: 'grey.100'
            }}
        >
            <Box
                component="img"
                src="/static/mock-images/avatars/avatar_1.jpg"
                sx={{ width: 80, borderRadius: 8 }}

            />

            <Box sx={{ textAlign: 'center', top: 15 }}>
                <Typography gutterBottom variant="h6">
                    {props.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {props.email}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {props.rating} <Icon icon={startFill} width={11} height={11} />
                </Typography>
            </Box>

            <Grid container columnSpacing={0}>
                <Grid item xs={6} sm={6}>
                    <Button fullWidth>Perfil</Button>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <Button fullWidth>Agendar</Button>
                </Grid>
            </Grid>
        </Stack>

    );
}
export default Adviser;