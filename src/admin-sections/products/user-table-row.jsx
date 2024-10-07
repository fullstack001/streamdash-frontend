import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEdit } from 'react-icons/fa';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

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

export default function UserTableRow({
  credit,
  _id,
  id,
  priceCAD,
  discount,
  couponCode,
  couponActive,
  priceUSD,
  onUpdatePrices,
}) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPriceCAD, setNewPriceCAD] = useState(priceCAD);
  const [newPriceUSD, setNewPriceUSD] = useState(priceUSD);
  const [newDiscount, setNewDiscount] = useState(discount);
  const [newCouponCode, setNewCouponCode] = useState(couponCode);
  const [newCouponActive, setNewCouponActive] = useState(couponActive);

  // Function to copy the URL to clipboard
  const handleCopy = () => {
    const urlToCopy = `https://streamdash.co/product/${id}`;
    navigator.clipboard.writeText(urlToCopy).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset copy success message after 2 seconds
    });
  };

  const handleEdit = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUpdatePrices = () => {
    onUpdatePrices(_id, newPriceCAD, newPriceUSD, newDiscount, newCouponCode, newCouponActive);
    handleCloseDialog();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} name="checkbox">
        <TableCell align="center">{credit === '0' ? 'free' : credit}</TableCell>
        <TableCell align="center">{priceCAD !== 0 && `${priceCAD.toFixed(2)} CAD`}</TableCell>
        <TableCell align="center">{priceUSD !== 0 && `${priceUSD.toFixed(2)} USD`}</TableCell>
        <TableCell align="center">{discount}</TableCell>
        <TableCell align="center">{couponCode}</TableCell>
        <TableCell align="center" color={couponActive ? 'green' : 'red'}>
          {couponActive ? 'Active' : 'InActive'}
        </TableCell>
        <TableCell align="center">{`https://streamdash.co/product/${id}`}</TableCell>
        <TableCell align="center">
          <Tooltip title={copySuccess ? 'Copied!' : 'Copy URL'}>
            <Button onClick={handleCopy}>
              <CopyIconSVG />
              &nbsp; Copy
            </Button>
          </Tooltip>
        </TableCell>
        <TableCell align="center">
          {priceCAD !== 0 && (
            <Tooltip title="Edit">
              <IconButton onClick={handleEdit}>
                <FaEdit />
              </IconButton>
            </Tooltip>
          )}
        </TableCell>
      </TableRow>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Product Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Price CAD"
            type="number"
            fullWidth
            value={newPriceCAD}
            onChange={(e) => setNewPriceCAD(Number(e.target.value))}
          />
          <TextField
            margin="dense"
            label="Price USD"
            type="number"
            fullWidth
            value={newPriceUSD}
            onChange={(e) => setNewPriceUSD(Number(e.target.value))}
          />
          <TextField
            margin="dense"
            label="Discount %"
            type="number"
            fullWidth
            value={newDiscount}
            onChange={(e) => setNewDiscount(Number(e.target.value))}
          />
          <TextField
            margin="dense"
            label="Coupon Code"
            type="text"
            fullWidth
            value={newCouponCode}
            onChange={(e) => setNewCouponCode(e.target.value)}
          />
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
            <Switch
              checked={newCouponActive}
              onChange={(e) => setNewCouponActive(e.target.checked)}
              color="primary"
            />
            <span>Coupon Active</span>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdatePrices}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

UserTableRow.propTypes = {
  _id: PropTypes.any,
  id: PropTypes.any,
  credit: PropTypes.any,
  discount: PropTypes.number,
  couponCode: PropTypes.string,
  couponActive: PropTypes.bool,
  priceCAD: PropTypes.number.isRequired,
  priceUSD: PropTypes.number.isRequired,
  onUpdatePrices: PropTypes.func.isRequired,
};
