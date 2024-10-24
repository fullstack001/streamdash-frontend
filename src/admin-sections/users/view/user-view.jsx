import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import DialogContentText from '@mui/material/DialogContentText';

import { getAllUser, deleteUser, addUserByAdmin, addCreditByAdmin } from 'src/lib/api/user';

// import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

// Styles for the modal
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function UserView() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterMac, setFilterMac] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openAddUserModal, setOpenAddUserModal] = useState(false); // State to control modal
  const [newEmail, setNewEmail] = useState('');
  // const [password, setPassword] = useState('');

  const [deleteId, setDeleteId] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const res = await getAllUser();
      if (res === 500) {
        console.log(res);
      } else {
        setUsers(res.data.filter((item) => item.isAdmin === false));
      }
    };
    getUserData();
  }, []);

  const refetchUser = async () => {
    const res = await getAllUser();
    if (res === 500) {
      console.log(res);
    } else {
      setUsers(res.data.filter((item) => item.isAdmin === false));
    }
  };

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

  const handleAddCredit = async (email, credit) => {
    try {
      const data = { email, credit };
      const res = await addCreditByAdmin(data);
      if (res !== 500) {
        toast.success('Credit added successfully to the user');
        setUsers(res.data.filter((item) => item.isAdmin === false));
      } else {
        toast.error('Credit add faild.');
      }
    } catch {
      toast.error('Credit add faild.');
    }
  };

  // Open the Add User Modal
  const addUserAction = () => {
    setOpenAddUserModal(true); // Open the modal
  };

  // Handle saving a new user
  const handleSaveNewUser = async () => {
    const newUser = { email: newEmail };

    try {
      const res = await addUserByAdmin(newUser);
      if (res === 500) {
        toast.error('Create use faild.');
      } else {
        toast.success('User added successfully. Set up password email sent to the user.');
        setUsers(res.data.filter((item) => item.isAdmin === false));
        setOpenAddUserModal(false);
        // Clear the form inputs
        setNewEmail('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle closing the Add User modal
  const handleCloseAddUserModal = () => {
    setOpenAddUserModal(false);
    setNewEmail('');
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  // Handle closing of the confirmation dialog
  const handleCloseConfirm = () => {
    setConfirmOpen(false);
  };

  // Handle the deletion after confirmation
  const handleConfirmDelete = async () => {
    setLoading(true);
    const res = await deleteUser(deleteId);
    if (res !== 500) {
      toast.success('User deleted successfully');
      const updatedUsers = users.filter((user) => user._id !== deleteId);
      setUsers(updatedUsers);
    } else {
      toast.error('Failed to delete user');
    }
    handleCloseConfirm();
    setLoading(false);
  };

  const notFound = !dataFiltered.length && !!filterMac;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>
      </Stack>
      <Card>
        <UserTableToolbar
          filterUser={filterMac}
          onfilterUser={handleFilterByMac}
          addUser={addUserAction}
        />

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
                  { id: 'credit', label: 'Credit' },
                  { id: 'isActive', label: 'Active' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row._id}
                      email={row.email}
                      user={row}
                      isActive={row.isActive}
                      credit={row.credit}
                      editAction={handleAddCredit}
                      deleteUser={() => handleDelete(row._id)}
                      refetchUser={refetchUser}
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

      <Modal
        open={openAddUserModal}
        onClose={handleCloseAddUserModal}
        aria-labelledby="add-user-modal"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Add New User
          </Typography>
          <Stack spacing={3}>
            <TextField
              label="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              fullWidth
            />
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button onClick={handleCloseAddUserModal} variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleSaveNewUser} variant="contained" color="primary">
                Save
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
}
