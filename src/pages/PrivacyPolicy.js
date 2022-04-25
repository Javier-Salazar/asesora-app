import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';
import HeaderLegal from '../components/HeaderLegal';
import Page from '../components/Page';
import { NAME_APP } from '../Configurations';

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
  border: '1px red solid'
});

function PrivacyPolicy() {
  return (
    <RootStyle title={`Asesora${NAME_APP} | Políticas de privacidad`}>
        <HeaderLegal />
        <SectionStyle>
          <LinkStyle underline="none" variant="subtitle2" component={RouterLink} to="/legal/end-user-agreement" sx={{
            '&:hover': {
              background: '#BFE8E1'
            }
            }}>
            Términos y condiciones del servicio
          </LinkStyle>
          <LinkStyle underline="none" variant="subtitle2" component={RouterLink} to="/legal/privacy-policy" sx={{
            background: '#BFE8E1',
            ml: 3
            }}>
            Políticas de privacidad
          </LinkStyle>
        </SectionStyle>
        <ContentStyle>
          test
        </ContentStyle>
    </RootStyle>
  );
}

export default PrivacyPolicy;