import { format, formatDistanceToNow } from 'date-fns';

function FDate(date) {
<<<<<<< HEAD
  return format(new Date(date), 'dd MMMM yyyy', {

  });
}

function FDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm', {

  });
}

function FDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p', {

  });
=======
  return format(new Date(date), 'dd MMMM yyyy');
}

function FDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

function FDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
>>>>>>> 434877734ef68fab4f63c87cb48c1c6e0471b0b6
}

function FToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
<<<<<<< HEAD

=======
>>>>>>> 434877734ef68fab4f63c87cb48c1c6e0471b0b6
  });
}

export { FDate, FDateTime, FDateTimeSuffix, FToNow };
