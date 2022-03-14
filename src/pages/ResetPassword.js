import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Page from '../components/Page';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import ResetPasswordForm from '../components/authentication/login/ResetPasswordForm';

const RootStyle = styled(Page)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
}));

const SectionStyle = styled('div')(({ theme }) => ({
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
}));

function ResetPassword() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    
    const navigate = useNavigate();

    const pullData = (status, email) => {
        setIsSubmitting(status);
        setEmail(email);
    }

    return (
        <RootStyle title="AsesoraApp | Restablecer contraseña">
            <SectionStyle>
                <Container maxWidth="sm">
                    {
                        isSubmitting
                        ?
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <img src="/static/illustrations/illustration_bullseye.png" alt="bullseye" width="25%" 
                                    style={{alignSelf: 'center'}}/>
                                <Typography variant="h3" sx={{mb: 2, alignSelf: 'center'}}>
                                    Solicitud enviada con éxito
                                </Typography>
                                <Typography variant="body1" sx={{mb: 4, textAlign: 'center'}}>
                                    Hemos enviado un correo electrónico de confirmación a <b>{email}</b>.
                                    &nbsp;Por favor revisa tu correo electrónico.
                                </Typography>

                                <Button
                                    size="large"
                                    variant="contained"
                                    role="link"
                                    onClick={() => {
                                        navigate('/login');
                                    }}
                                    sx={{alignSelf: 'center'}}
                                >
                                    Regresar
                                </Button>
                            </div>
                        :
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <Typography variant="h3" sx={{mb: 2}}>
                                    ¿Olvidaste tu contraseña?
                                </Typography>
                                <Typography variant="body1" sx={{mb: 4}}>
                                    Introduce la dirección de correo electrónico asociada a tu cuenta y 
                                    te enviaremos un enlace para restablecer tu contraseña.
                                </Typography>

                                <ResetPasswordForm func={pullData}/>
                            </div>
                    }
                    
                </Container>
            </SectionStyle>
        </RootStyle>
    );
}

export default ResetPassword;