import PropTypes from 'prop-types';

import { Button } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({ mac, expiry, status, deleteAction, editAction }) {
  // Parse expiry date and get the current date
  const expiryDate = new Date(expiry);
  const currentDate = new Date();
  const isBeforeExpiry = currentDate > expiryDate;

  return (
    <TableRow hover tabIndex={-1} name="checkbox">
      <TableCell>{mac}</TableCell>
      <TableCell>{expiry}</TableCell>

      <TableCell>
        <Label color={(status === 'INACTIVE' && 'error') || 'success'}>{status}</Label>
      </TableCell>
      <TableCell align="right">
        <Button
          variant="contained"
          color="success"
          onClick={editAction}
          startIcon={<Iconify icon="eva:edit-fill" />}
        >
          Edit
        </Button>
        {isBeforeExpiry && (
          <Button
            variant="contained"
            color="error"
            onClick={deleteAction}
            startIcon={<Iconify icon="eva:trash-2-outline" />}
            sx={{ marginLeft: 1 }}
          >
            Delete
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  mac: PropTypes.any,
  expiry: PropTypes.any,
  status: PropTypes.string,
  deleteAction: PropTypes.func,
  editAction: PropTypes.func,
};
