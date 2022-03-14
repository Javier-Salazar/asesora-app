import { Icon } from '@iconify/react';
import gridFill from '@iconify/icons-eva/grid-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import personDoneFill from '@iconify/icons-eva/person-done-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import bookFill from '@iconify/icons-eva/book-fill';
import infoFill from '@iconify/icons-eva/info-fill';

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'tablero',
    path: '/asesoraTec/app',
    icon: getIcon(gridFill)
  },
  {
    title: 'usuarios',
    path: '/asesoraTec/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'asesores',
    path: '/asesoraTec/asesores',
    icon: getIcon(personDoneFill)
  },
  {
    title: 'materias',
    path: '/asesoraTec/materias',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'mis materias',
    path: '/asesoraTec/mis-materias',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'asesorias',
    path: '/asesoraTec/asesorias',
    icon: getIcon(bookFill)
  },
  {
    title: 'acerca de',
    path: '/asesoraTec/acerca-de',
    icon: getIcon(infoFill)
  }
];

export default sidebarConfig;