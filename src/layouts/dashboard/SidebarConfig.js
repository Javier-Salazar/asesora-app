import { Icon } from '@iconify/react';
import gridFill from '@iconify/icons-eva/grid-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import personDoneFill from '@iconify/icons-eva/person-done-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import bookFill from '@iconify/icons-eva/book-fill';
import clipBoardFill from '@iconify/icons-eva/clipboard-fill';
import calendarFill from '@iconify/icons-eva/calendar-fill';
import infoFill from '@iconify/icons-eva/info-fill';
import Cookies from 'universal-cookie';

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;
const cookies = new Cookies();

function uploadMenu(type) {
  if (type === 'N') {
    return (
      [
        {
          title: 'tablero',
          path: '/dashboard/app',
          icon: getIcon(gridFill)
        },
        {
          title: 'asesores',
          path: '/dashboard/adviser',
          icon: getIcon(personDoneFill)
        },
        {
          title: 'materias',
          path: '/dashboard/subject',
          icon: getIcon(fileTextFill)
        },
        {
          title: 'asesorias',
          path: '/dashboard/advises',
          icon: getIcon(bookFill)
        },
        {
          title: 'Calendario',
          path: '/dashboard/calendar',
          icon: getIcon(calendarFill)
        },
        {
          title: 'acerca de',
          path: '/comming',
          icon: getIcon(infoFill)
        }
      ]
    );
  } else if (type === 'A') {
    return (
      [
        {
          title: 'tablero',
          path: '/dashboard/app',
          icon: getIcon(gridFill)
        },
        {
          title: 'añadir asesoría',
          path: '/dashboard/new-advise',
          icon: getIcon(fileTextFill)
        },
        {
          title: 'reportes',
          path: '/dashboard/reports',
          icon: getIcon(clipBoardFill)
        },
        {
          title: 'Calendario',
          path: '/dashboard/calendar',
          icon: getIcon(calendarFill)
        },
        {
          title: 'acerca de',
          path: '/comming',
          icon: getIcon(infoFill)
        }
      ]
    );
  } else if (type === 'S') {
    return (
      [
        {
          title: 'tablero',
          path: '/dashboard/app',
          icon: getIcon(gridFill)
        },
        {
          title: 'usuarios',
          path: '/dashboard/user',
          icon: getIcon(peopleFill)
        },
        {
          title: 'reportes',
          path: '/dashboard/reports',
          icon: getIcon(clipBoardFill)
        },
        {
          title: 'acerca de',
          path: '/comming',
          icon: getIcon(infoFill)
        }
      ]
    );
  }
}

const sidebarConfig = uploadMenu(cookies.get('UserType'));


export default sidebarConfig;