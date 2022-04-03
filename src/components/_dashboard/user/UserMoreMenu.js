import { Icon } from '@iconify/react';
import React, { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Dialog, DialogContent,
  DialogActions, Button, DialogTitle } from '@mui/material';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function UserMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const[open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setIsOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'error.main' }} onClick={handleClickOpen}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Borrar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to={`/dashboard/user-edit/${props.idUser}`} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Editar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>

      <Dialog open={open} TransitionComponent={Transition} onClose={handleClose}>
        <DialogTitle>Eliminar usuario</DialogTitle>
        <DialogContent>
          ¿Estas seguro de querer eliminar al usuario <b>{props.name}</b>?
          Esta acción no se podrá revertir
        </DialogContent>
        <DialogActions sx={{pb: 2, pr: 3, maxWidth: '50%', ml: '50%'}}>
          <Button fullWidth onClick={handleClose}>Aceptar</Button>
          <Button fullWidth variant="contained" onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserMoreMenu;