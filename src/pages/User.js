import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { sentenceCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card, Table, Stack, Avatar, Button, Checkbox, TableRow, TableBody, TableCell, Container,
  Typography, TableContainer, TablePagination
} from '@mui/material';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
import axios from 'axios';

const TABLE_HEAD = [
  { id: 'name', label: 'Nombre', alignRight: false },
  { id: 'email', label: 'Correo', alignRight: false },
  { id: 'role', label: 'Tipo de usuario', alignRight: false },
  { id: 'userCode', label: 'Código', alignRight: false },
  { id: 'status', label: 'Estatus', alignRight: false },
  { id: '' }
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function changeLabelStatus(text) {
  if (text === 'A') return 'activo';
  if (text === 'I') return 'inactivo';
}

function changeLabelType(text) {
  if (text === 'N') return 'Estudiante';
  if (text === 'A') return 'Asesor';
  if (text === 'S') return 'Administrador';
}

function User() {
  const [data, setData] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');

  const baseUrl = "https://localhost:44397/api/users"
  const requestGet = async () => {
    await axios.get(baseUrl)
      .then(Response => {
        setData(Response.data);
        setDataTable(Response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    requestGet();
  }, [])

  const USERLIST = data.map((element => ({
    id: element.userx_code,
    avatarUrl: element.userx_image,
    name: element.userx_lastname + " " + element.userx_mother_lastname + " " + element.userx_name,
    email: element.userx_email,
    userCode: element.userx_code,
    status: changeLabelStatus(element.userx_status),
    role: changeLabelType(element.userx_type)
  })));


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


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

    var searchResults = dataTable.filter((element) => {
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
      return setData(searchResults);
    });
    return setData(searchResults);
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy));

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="AsesoraApp | Usuarios">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Usuarios
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/new-user"
            startIcon={<Icon icon={plusFill} />}
          >
            Agregar usuario
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={search}
            onFilterName={handleChange}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, role, status, email, avatarUrl, userCode } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={'data:image/png;base64,' + avatarUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(role === 'Estudiante' && 'success') || (role === 'Asesor' && 'info')
                                || (role === 'Administrador' && 'warning')}
                            >
                              {sentenceCase(role)}
                            </Label>
                          </TableCell>
                          <TableCell align="left">{userCode}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(status === 'inactivo' && 'error') || 'success'}
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu idUser={userCode} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
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
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Resultados por página"
            labelDisplayedRows={({ from, to, count }) => {
              return `Mostrando ${from} – ${to} de ${count !== -1 ? count : `más de ${to}`}`;
            }}
          />
        </Card>
      </Container>
    </Page>
  );
}

export default User;