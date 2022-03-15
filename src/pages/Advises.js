import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import axios from 'axios';
 
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
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
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
// ----------------------------------------------------------------------
 
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
    return filter(array, (_user) => _user.major_code.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
 
function changeLabel(text) {
  if (text == 'A') return 'Activa';
  if (text == 'I') return 'Inactiva';
}
 
export default function Advises() {
 
  const baseUrl = "https://localhost:44397/api/advisors"
  const [data, setData] = useState([]);
  

  const [usuarios, setUsuarios]= useState([]);
  const [tablaUsuarios, setTablaUsuarios]= useState([]);
  const [busqueda, setBusqueda]= useState('');


  {/** Petición para TRAER los datos de la BD*/ }
  const peticionesGet = async () => {
    await axios.get(baseUrl)
      .then(Response => {
        setUsuarios(Response.data);
        setTablaUsuarios(Response.data);
      }).catch(error => {
        console.log(error);
      })
  }
 
  {/**Se ejecuta por defecto cada vez que el componente se actualiza*/ }
  useEffect(() => {
    peticionesGet();
  }, [])

  const handleChange=(e)=>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
  }

  const filtrar=(terminoBusqueda)=>{
      var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
          if(elemento.advisor_code.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          || elemento.userx_name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          || elemento.userx_lastname.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          || elemento.userx_mother_lastname.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          || elemento.userx_email.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
              return elemento;
          }
      })
      setUsuarios(resultadosBusqueda);
  }
 
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('major_code');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
 
  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  
  const filteredUsers = usuarios;
 
  const isUserNotFound = filteredUsers.length === 0;
 
 
  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h5" gutterBottom>
            Lista de asesores
          </Typography>
        </Stack>
 
        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={busqueda}
            onFilterName={handleChange}
          />
 
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {/**Encabezado de la tabla*/}
                    <TableCell>Foto</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Correo</TableCell>
                    <TableCell>Estatus</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>  
                  {/**Se traen los registros de la bd*/}
                  {usuarios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(carrera => (
                    <TableRow key={carrera.advisor_code}>

                      <TableCell>
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar src={'data:image/png;base64,' + carrera.userx_image} />
                            </Stack>
                          </TableCell>

                      <TableCell>
          
                               {carrera.userx_name+" "+carrera.userx_lastname+ " "+carrera.userx_mother_lastname}
                          </TableCell>

                      <TableCell align="left">{carrera.userx_email}</TableCell>
                      <TableCell align="left">
                        <Label
                          variant="ghost"
                          color={(carrera.advisor_status === 'I' && 'error') || 'success'}
                        >
                          {changeLabel(carrera.advisor_status)}
                        </Label>
                      </TableCell>
                      <TableCell align="right"> <UserMoreMenu /> </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={busqueda} />
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
            count={usuarios.length}
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
