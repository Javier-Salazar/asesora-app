import PropTypes from 'prop-types';
import { Box } from '@mui/material';

Logo.propTypes = {
  sx: PropTypes.object
};

function Logo({ sx }) {
  return <Box component="img" src="/static/logo.svg" sx={{ width: 60, height: 60, ...sx }} />;
}

export default Logo;