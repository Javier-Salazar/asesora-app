import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settingsFill from '@iconify/icons-eva/settings-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
import MenuPopover from '../../components/MenuPopover';
import account from '../../_mocks_/account';
import Cookies from 'universal-cookie';

const MENU_OPTIONS = [
  {
    label: 'Inicio',
    icon: homeFill,
    linkTo: '/asesoraTec'
  },
  {
    label: 'Mi perfil',
    icon: personFill,
    linkTo: '/asesoraTec/profile'
  },
  {
    label: 'Configuraciones',
    icon: settingsFill,
    linkTo: '#'
  }
];

function AccountPopover() {
  const cookies = new Cookies();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  var profileUser = new Image();
  profileUser.src = cookies.get('imagen');


  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const onSubmit = () => {
    navigate('/');
  }
  var userFoto = new Object();
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        
 <Avatar src={''+cookies.get('stuImagen')} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
          {cookies.get('stuName')+" "+cookies.get('stuLastnameF')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {cookies.get('stuEmail')}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={onSubmit}>
            Cerrar sesión
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}

export default AccountPopover;