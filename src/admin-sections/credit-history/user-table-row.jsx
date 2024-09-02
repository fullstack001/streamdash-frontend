import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function UserTableRow({ userId, action, credit, date }) {
  return (
    <TableRow hover tabIndex={-1} name="checkbox">
      <TableCell>{action}</TableCell>
      <TableCell>{credit}</TableCell>

      <TableCell>{userId}</TableCell>
      <TableCell>{date}</TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  userId: PropTypes.any,
  action: PropTypes.any,
  credit: PropTypes.any,
  date: PropTypes.any,
};
