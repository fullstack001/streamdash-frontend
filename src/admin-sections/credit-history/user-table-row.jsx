import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function UserTableRow({ email, userId, action, credit, date }) {
  return (
    <TableRow hover tabIndex={-1} name="checkbox">
      <TableCell>{email}</TableCell>
      <TableCell>{action}</TableCell>
      <TableCell>{credit}</TableCell>

      <TableCell>{userId}</TableCell>
      <TableCell>{date.split('T')[0]}</TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  userId: PropTypes.any,
  email: PropTypes.any,
  action: PropTypes.any,
  credit: PropTypes.any,
  date: PropTypes.any,
};
