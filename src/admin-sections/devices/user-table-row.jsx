// import { useState } from 'react';
import PropTypes from 'prop-types';

// import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
// import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
// import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
// import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  mac,
  expiry,
  status,
  email,
  loginId,
  // deleteAction, editAction
}) {
  // const [open, setOpen] = useState(null);

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setOpen(null);
  // };
  // const handleDelete = () => {
  //   deleteAction();
  //   setOpen(null);
  // };
  // const handleEdit = () => {
  //   editAction();
  //   setOpen(null);
  // };

  // Parse expiry date and get the current date
  // const expiryDate = new Date(expiry);
  // const currentDate = new Date();
  // const isBeforeExpiry = currentDate > expiryDate;

  return (
    // <>
    <TableRow hover tabIndex={-1} name="checkbox">
      <TableCell>{email}</TableCell>
      <TableCell>{loginId}</TableCell>
      <TableCell>{mac}</TableCell>
      <TableCell>{expiry}</TableCell>

      <TableCell>
        <Label color={(status === 'INACTIVE' && 'error') || 'success'}>{status}</Label>
      </TableCell>
    </TableRow>
    // </>
  );
}

UserTableRow.propTypes = {
  email: PropTypes.any,
  loginId: PropTypes.any,
  mac: PropTypes.any,
  expiry: PropTypes.any,
  status: PropTypes.string,
};
