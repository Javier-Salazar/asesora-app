import { Card, Typography, CardHeader, CardContent, CardMedia, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Timeline, TimelineItem, TimelineContent, TimelineConnector, TimelineSeparator, TimelineDot } from '@mui/lab';
import axios from 'axios';
import Cookies from 'universal-cookie'

function AdviseOfTheDay() {
  const cookies = new Cookies();
  const [data, setData] = useState([]);
  const baseUrl = "https://localhost:44397/api/advises";

  const peticionesGet = async () => {
    await axios.get(baseUrl)
      .then(Response => {
        setData(Response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    peticionesGet();
  });

  const timeFormat = (text) => {
    var hora = text.split('T');
    var cortarHora = hora[1].split(':');
    return cortarHora[0] + ":" + cortarHora[1];
  };

  const date = new Date();

  const filterAndSort = () => {
    var filterResults = data.filter((element) => {
      if ((cookies.get('UserType') === 'N' ? element.advise_student : element.advise_advisor) === cookies.get('UserCode')) {
        var dateArray = element.advise_date_start.split('T', 1);
        var dateSys = date.toISOString().split('T', 1);
        if (dateArray[0] === dateSys[0]) {
          return element;
        }
        return 0;
      }
      return 0;
    });
    var sortedArray = filterResults.sort(function (a, b) { a = new Date(a.advise_date_start); b = new Date(b.advise_date_start); return b > a ? -1 : b < a ? 1 : 0; });
    return sortedArray;
  }

  return (
    <Card sx={{ height: '480px' }} >
      <CardHeader title="Tus asesorías del día" />
      <CardContent>
        {
          filterAndSort().length === 0
          ?
            <>
              <CardMedia
                component="img"
                height="340"
                image="/static/illustrations/illustration_dayOff_dashboard_advisor.png"
                alt="Día libre"
              />
              <Typography variant="subtitle2" component="span">
                Ninguna asesoría agendada por el día de hoy
              </Typography>
            </>
          :
            <Box>
              <Timeline>
                {filterAndSort().map(element => (
                  <TimelineItem key={element.advise_code}>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot
                        sx={{ bgcolor: (element.advise_modality === 'P' && '#637381') || '#4B29BA' }}
                      />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                      <Typography variant="h6" component="span">
                        {timeFormat(element.advise_date_start)}
                      </Typography>
                      <Typography>{element.subjectx_name}</Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Box>
        }
      </CardContent>
    </Card>
  );
}

export default AdviseOfTheDay;