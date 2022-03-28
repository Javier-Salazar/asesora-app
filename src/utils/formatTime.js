import { format, formatDistanceToNow } from 'date-fns';

function FDate(date) {
  return format(new Date(date), 'dd MMMM yyyy', {
    locale: 'es'
  });
}

function FDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm', {
    locale: 'es'
  });
}

function FDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p', {
    locale: 'es'
  });
}

function FToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: 'es'
  });
}

export { FDate, FDateTime, FDateTimeSuffix, FToNow };
