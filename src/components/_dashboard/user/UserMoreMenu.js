import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import viewProfile from '@iconify/icons-eva/eye-outline';
import { Link as RouterLink } from 'react-router-dom';
import schedule from '@iconify/icons-eva/calendar-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';

function UserMoreMenu() {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

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
      
      <MenuItem component={RouterLink} to="/dashboard/user-edit" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={viewProfile} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Ver Perfil" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to="/dashboard/user-edit" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={schedule} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Agendar asesoría" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserMoreMenu;