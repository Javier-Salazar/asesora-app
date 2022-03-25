import { useEffect, useState } from 'react';
import axios from 'axios';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
// ----------------------------------------------------------------------

function changeLabelStatus(text) {
  if (text === 'A') return 'Activo';
  if (text === 'I') return 'Inactivo';
}

function changeLabelType(text) {
  if (text === 'N') return 'Estudiante';
  if (text === 'A') return 'Asesor';
  if (text === 'S') return 'Administrador';
}

function changeLabelPhone(text) {
  if (text === '') {
    return '-------';
  } else {
    return text;
  }
}
export default function User() {

  const baseUrl = "https://localhost:44397/api/users"



  const [users, setUsers] = useState([]);
  const [userTable, setUserTable] = useState([]);
  const [search, setSearch] = useState('');

  const requestGet = async () => {
    await axios.get(baseUrl)
      .then(Response => {
        setUsers(Response.data);
        setUserTable(Response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    requestGet();
  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value);
    filterTable(e.target.value);
  }

  const filterTable = (searchTerm) => {
    var type = "";
    var statusUser = "";

    if ("estudiante".toString().toLowerCase().includes(searchTerm.toLowerCase())) {
      type = "N";
    }
    if ("asesor".toString().toLowerCase().includes(searchTerm.toLowerCase())) {
      type = "A";
    }
    if ("administrador".toString().toLowerCase().includes(searchTerm.toLowerCase())) {
      type = "S";
    }
    if ("inactivo".toString().toLowerCase().includes(searchTerm.toLowerCase())) {
      statusUser = "I";
    }
    if ("activo".toString().toLowerCase().includes(searchTerm.toLowerCase())) {
      statusUser = "A";
    }

    var searchResults = userTable.filter((element) => {
      if (element.userx_code.toString().toLowerCase().includes(searchTerm.toLowerCase())
        || element.userx_name.toString().toLowerCase().includes(searchTerm.toLowerCase())
        || element.userx_lastname.toString().toLowerCase().includes(searchTerm.toLowerCase())
        || element.userx_mother_lastname.toString().toLowerCase().includes(searchTerm.toLowerCase())
        || element.userx_email.toString().toLowerCase().includes(searchTerm.toLowerCase())
        || element.userx_phone.toString().toLowerCase().includes(searchTerm.toLowerCase())
        || element.userx_type.toString().toLowerCase() === (type.toLowerCase())
        || element.userx_status.toString().toLowerCase() === (statusUser.toLowerCase())
      ) {
        return element;
      }
      return setUsers(searchResults);
    });
    return setUsers(searchResults);
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = users;

  const isUserNotFound = filteredUsers.length === 0;


  return (
    <Page title="AsesoraApp | Usuarios">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h5" gutterBottom>
            Usuarios
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar
            filterName={search}
            onFilterName={handleChange}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Foto</TableCell>
                    <TableCell>Clave</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Correo</TableCell>
                    <TableCell>Teléfono</TableCell>
                    <TableCell>Estatus</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/**Se traen los registros de la bd*/}
                  {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(element => (
                    <TableRow key={element.userx_code}>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar src={'data:image/png;base64,' + element.userx_image} />
                        </Stack>
                      </TableCell>

                      <TableCell>
                        {element.userx_code}
                      </TableCell>

                      <TableCell align="left">
                        {element.userx_name + " " + element.userx_lastname + " " + element.userx_mother_lastname}
                      </TableCell>

                      <TableCell align="left">{element.userx_email}</TableCell>
                      <TableCell>
                        {changeLabelPhone(element.userx_phone)}
                      </TableCell>
                      <TableCell align="left">
                        <Label
                          variant="ghost"
                          color={(element.userx_status === 'I' && 'error') || 'success'}
                        >
                          {changeLabelStatus(element.userx_status)}
                        </Label>
                      </TableCell>

                      <TableCell align="left">
                        <Label
                          variant="ghost"
                          color={(element.userx_type === 'N' && 'success') || (element.userx_type === 'A' && 'info')
                            || (element.userx_type === 'S' && 'warning')}
                        >
                          {changeLabelType(element.userx_type)}
                        </Label>
                      </TableCell>

                      <TableCell align="center"> <UserMoreMenu idUser={element.userx_code} /> </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={search} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}

              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}