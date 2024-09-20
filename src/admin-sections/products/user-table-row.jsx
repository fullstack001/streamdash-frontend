import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// SVG for copy icon
const CopyIconSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

// ----------------------------------------------------------------------

export default function UserTableRow({ product, id }) {
  const [copySuccess, setCopySuccess] = useState(false);

  // Function to copy the URL to clipboard
  const handleCopy = () => {
    const urlToCopy = `https://streamdash.co/product/${id}`;
    navigator.clipboard.writeText(urlToCopy).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset copy success message after 2 seconds
    });
  };

  return (
    <TableRow hover tabIndex={-1} name="checkbox">
      <TableCell align="center">{product}</TableCell>
      <TableCell align="center">{`https://streamdash.co/product/${id}`}</TableCell>
      <TableCell align="center">
        <Tooltip title={copySuccess ? 'Copied!' : 'Copy URL'}>
          <Button onClick={handleCopy}>
            <CopyIconSVG />
            &nbsp; Copy
          </Button>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.any,
  product: PropTypes.any,
};
