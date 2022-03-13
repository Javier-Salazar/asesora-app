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

const user = {
  avatar: '/static/mock-images/avatars/javier.png',
  jobTitle: 'Ingeniero',
  name: 'Javier Salazar',
  city: 'Juárez',
  country: 'México',
  timezone: 'GTM-7'
};
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
          src={user.avatar}
          sx={{
            height: 100,
            width: 100
          }}
        />
        <Typography color="textPrimary" gutterBottom variant="h3">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body1">
          {`${user.city} ${user.country}`}
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
