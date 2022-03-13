import PropTypes from 'prop-types';
import { Paper, Typography } from '@mui/material';

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string
};

function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        No existen coincidencias
      </Typography>
      <Typography variant="body2" align="center">
        No se encontraron coincidencias para &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Revisa la ortografía o utiliza palabras completas.
      </Typography>
    </Paper>
  );
}

export default SearchNotFound;