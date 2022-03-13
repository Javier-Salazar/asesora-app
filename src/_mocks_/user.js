import faker from 'faker';
import { sample } from 'lodash';
import { MockImgAvatar } from '../utils/mockImages';

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: MockImgAvatar(index + 1),
  name: faker.name.findName(),
  email: faker.internet.email('name'),
  userCode: 'mguadalupe',
  status: sample(['activo', 'inactivo']),
  role: sample([
    'Asesor',
    'Estudiante',
    'Administrador'
  ])
}));

export default users;