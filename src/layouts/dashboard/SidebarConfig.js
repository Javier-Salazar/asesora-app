import { Icon } from '@iconify/react';
import gridFill from '@iconify/icons-eva/grid-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import personDoneFill from '@iconify/icons-eva/person-done-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import bookFill from '@iconify/icons-eva/book-fill';
import clipBoardFill from '@iconify/icons-eva/clipboard-fill';
import infoFill from '@iconify/icons-eva/info-fill';

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
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
    title: 'mis asesorías',
    path: '/dashboard/my-advises',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'asesorias',
    path: '/dashboard/advises',
    icon: getIcon(bookFill)
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
];

export default sidebarConfig;