import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import upcScan  from '@iconify/icons-bi/upc-scan';
import { Stack, Button, Divider, Typography, Tooltip, Dialog, DialogContent } from '@mui/material';
import Slide from '@mui/material/Slide';
import Scanner from './scannerLogin/Scanner';
import Quagga from 'quagga'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AuthSocial() {
  const[open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    Quagga.stop();
    setOpen(false);
  }

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Tooltip title="Escanear credencial" placement="top" enterDelay={200} arrow>
          <Button style={{width: '30%'}} size="large" color="inherit" variant="outlined" onClick={handleClickOpen}>
            <Icon icon={upcScan} color="#454F5B" height={24} />
          </Button>
        </Tooltip>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          O
        </Typography>
      </Divider>

      <Dialog open={open} TransitionComponent={Transition} onClose={handleClose}>
        <DialogContent>
         <Scanner />
         <canvas class="drawingBuffer" width="1" height="20"></canvas>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AuthSocial;