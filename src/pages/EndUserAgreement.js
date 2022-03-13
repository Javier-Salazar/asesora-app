import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Link, Typography } from '@mui/material';
import HeaderLegal from '../components/HeaderLegal';
import Page from '../components/Page';

const RootStyle = styled(Page)(({ theme }) => ({
  
}));

const SectionStyle = styled('div')(({ theme }) => ({
    margin: '30px auto',
    width: '85%',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '85px',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
}));

const LinkStyle = styled(Link)({
    color: '#212B36',
    padding: '5px 10px',
    borderRadius: '12px'
});

const ContentStyle = styled('div')({
    width: '85%',
    margin: '0 auto',
    paddingTop: '30px',
    border: '1px red solid'
  });

function EndUserAgreement() {
  return (
    <RootStyle title="AsesoraApp | Términos y condiciones del servicio">
        <HeaderLegal />
        <SectionStyle>
            <LinkStyle underline="none" variant="subtitle2" component={RouterLink} to="/legal/end-user-agreement" sx={{
                background: '#BFE8E1'
                }}>
                    Términos y condiciones del servicio
            </LinkStyle>
            <LinkStyle underline="none" variant="subtitle2" component={RouterLink} to="/legal/privacy-policy" sx={{
                ml: 3,
                '&:hover': {
                    background: '#BFE8E1'
                }
                }}>
                    Políticas de privacidad
            </LinkStyle>
        </SectionStyle>
        <ContentStyle>
            <Typography variant="h4">
                Términos y condiciones del servicio
            </Typography>
            <Typography variant="h4">
                1. Introducción
            </Typography>
            <Typography variant="h4">
                2. El servicio de AsesoraApp que proporcionamos
            </Typography>
            <Typography variant="h4">
                3.  El uso del servicio de SaesoraApp
            </Typography>
            <Typography variant="h4">
                4. Derechos de propiedad intelectual y de contenido
            </Typography>
            <Typography variant="h4">
                5. Servicio de atención al cliente, información, preguntas y quejas
            </Typography>
            <Typography variant="h4">
                6. Problemas y conflictos
            </Typography>
            <Typography variant="h4">
                7. Acerca de estos términos
            </Typography>
        </ContentStyle>
    </RootStyle>
  );
}

export default EndUserAgreement;