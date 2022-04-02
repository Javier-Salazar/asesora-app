import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import { Timeline, TimelineItem, TimelineContent, TimelineConnector, TimelineSeparator, TimelineDot } from '@mui/lab';
import { useEffect, useState } from 'react';
import axios from 'axios';


function AdviseOfTheDay() {
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
      if (element.advise_advisor === "mbailon") {
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
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title="Tus asesorías del día" />
      <CardContent>
        <Timeline>
          {filterAndSort().map(element => (
            <TimelineItem key={element.advise_code}>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot sx={{
                  bgcolor:
                    (element.advise_modality === 'P' && 'primary.main') ||
                    (element.advise_modality === 'V' && 'warning.main') ||
                    'error.main'
                }} />
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
      </CardContent>
    </Card>
  );
}

export default AdviseOfTheDay;