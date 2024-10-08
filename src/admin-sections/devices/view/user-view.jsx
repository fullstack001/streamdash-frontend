import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
// import Dialog from '@mui/material/Dialog';
// import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
// import DialogContentText from '@mui/material/DialogContentText';

// import { users } from 'src/_mock/user';

// import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';

import devicesStore from 'src/store/devicesStore';
// import deleteDevice from 'src/lib/api/deleteDevice';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UserView() {
  const router = useRouter();
  const { devices, userDevices } = devicesStore((state) => state);
  // const { setDevices, setUserDevices } = devicesStore();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  // const [deleteId, setDeleteId] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [filterMac, setFilterMac] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [confirmOpen, setConfirmOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState('');
  // const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (devices.length === 0) {
      Cookies.remove('token');
      router.push('/login');
    }
    const currentDevices = devices.map((device) => {
      const originData = userDevices.find((item) => device.loginId === item.username);
      if (originData) {
        const { date, email } = originData;
        return {
          ...device,
          date,
          email,
        };
      }

      // Return the original device object if originData is not found
      return {
        ...device,
        date: null, // or any default value you want to use
        email: null, // or any default value you want to use
      };
    });
    setUsers(currentDevices);
  }, [devices, userDevices, setUsers, router]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByMac = (event) => {
    setPage(0);
    setFilterMac(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterMac,
  });

  // const handleEdit = (id) => {
  //   router.push(`/edit-device/${id}`);
  // };

  // const handleDelete = (id) => {
  //   setDeleteId(id);
  //   setConfirmOpen(true);
  // };

  // Handle closing of the confirmation dialog
  // const handleCloseConfirm = () => {
  //   setConfirmOpen(false);
  // };

  // Handle the deletion after confirmation
  // const handleConfirmDelete = async () => {
  //   setLoading(true);
  //   const res = await deleteDevice({ username: deleteId });
  //   if (res === 200) {
  //     setSnackbarSeverity('success');
  //     setSnackbarMessage('Device deleted successfully');
  //     setDevices(devices.filter((item) => item.loginId !== deleteId));
  //     setUserDevices(userDevices.filter((item) => item.username !== deleteId));
  //   } else {
  //     setSnackbarSeverity('error');
  //     setSnackbarMessage('Failed to delete device');
  //   }
  //   setSnackbarOpen(true);
  //   handleCloseConfirm();
  //   setLoading(false);
  // };

  // // Handle closing of the snackbar
  // const handleCloseSnackbar = () => {
  //   setSnackbarOpen(false);
  // };

  const notFound = !dataFiltered.length && !!filterMac;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Devices</Typography>
      </Stack>

      <Card>
        <UserTableToolbar filterMac={filterMac} onFilterMac={handleFilterByMac} />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'email', label: 'Email' },
                  { id: 'username', label: 'DeviceId' },
                  { id: 'mac', label: 'Mac' },
                  { id: 'expiry', label: 'Expiry' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.loginId}
                      email={row.email}
                      loginId={row.loginId}
                      mac={row.mac}
                      status={row.status}
                      expiry={row.expiry}
                      // deleteAction={() => handleDelete(row.loginId)}
                      // editAction={() => handleEdit(row.loginId)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterMac} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* Confirmation Dialog
      <Dialog
        open={confirmOpen}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            {loading ? (
              <img
                src="/assets/icons/spinner.svg"
                alt="Loading"
                style={{ width: 24, height: 24 }}
              />
            ) : (
              'Delete'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={8000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar> */}
    </Container>
  );
}
