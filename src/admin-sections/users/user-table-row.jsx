import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

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

// ----------------------------------------------------------------------

export default function UserTableRow({ credit, isActive, email, editAction, deleteUser }) {
  const [open, setOpen] = useState(false); // Modal open/close state
  const [newCredit, setNewCredit] = useState(0); // Track new credit value
  const [error, setError] = useState(''); // Handle input validation

  const handleOpen = () => setOpen(true); // Open modal
  const handleClose = () => setOpen(false); // Close modal

  // Handle save action
  const handleSave = () => {
    if (!Number(newCredit) || newCredit < 0) {
      setError('Please enter a valid credit amount'); // Validation for input
    } else {
      setError('');
      // Call edit action here (you can modify the editAction function to accept the credit value)
      editAction(email, newCredit); // Pass the updated credit value
      handleClose(); // Close modal after saving
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} name="checkbox">
        <TableCell>{email}</TableCell>
        <TableCell>
          <Label color={(!isActive && 'error') || 'success'}>
            {isActive ? 'Active' : 'Inactive'}
          </Label>
        </TableCell>
        <TableCell>{credit}</TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen} // Open modal on click
            startIcon={<Iconify icon="eva:edit-fill" />}
          >
            Add Credit
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={deleteUser} // Open modal on click
            startIcon={<Iconify icon="eva:edit-fill" />}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>

      {/* Modal for adding credit */}
      <Modal open={open} onClose={handleClose} aria-labelledby="add-credit-modal">
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom>
            Add Credit to {email}
          </Typography>

          {/* Credit input field */}
          <TextField
            label="Credit Amount"
            type="number"
            value={newCredit}
            onChange={(e) => setNewCredit(e.target.value)}
            fullWidth
            error={!!error}
            helperText={error}
            sx={{ mb: 3 }}
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

UserTableRow.propTypes = {
  email: PropTypes.any,
  credit: PropTypes.any,
  isActive: PropTypes.any,
  editAction: PropTypes.func,
  deleteUser: PropTypes.func,
};
