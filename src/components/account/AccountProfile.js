import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

const AccountProfile = (props) => (

  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={''+cookies.get('stuImagen')}
          sx={{
            height: 100,
            width: 100
          }}
        />
        <Typography color="textPrimary" gutterBottom variant="h3">
        {cookies.get('stuName')}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button color="primary" fullWidth variant="text">
        Subir foto
      </Button>
    </CardActions>
  </Card>
);

export default AccountProfile;
