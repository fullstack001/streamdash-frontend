import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
// Import your API function to fetch products
import { updatePrices, fetchProducts } from '../../../lib/api/products';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const onUpdatePrices = async (id, priceCAD, priceUSD, discount, couponCode, couponActive) => {
    try {
      // Call the onUpdatePrices prop function to update prices on the backend
      const res = await updatePrices(id, priceCAD, priceUSD, discount, couponCode, couponActive);
      if (res.statue === 200) {
        setProducts((prev) =>
          prev.map((product) => {
            if (product._id === id) {
              return {
                ...product,
                priceCAD,
                priceUSD,
                discount,
                couponCode,
                couponActive,
              };
            }
            return product;
          })
        );
      } else {
        console.log(res.msg);
      }
    } catch (err) {
      console.error('Error updating prices:', err);
      // Handle error (e.g., show error message to user)
    }
  };
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Product URLs</Typography>
      </Stack>

      <Card>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <UserTableHead
              headLabel={[
                { id: 'credit', label: 'Credit' },
                { id: 'priceCAD', label: 'Price (CAD)' },
                { id: 'priceUSD', label: 'Price (USD)' },
                { id: 'discount', label: 'Discount(%)' },
                { id: 'couponCode', label: 'Coupon Code' },
                { id: 'couponActive', label: 'Coupon Active' },
                { id: 'url', label: 'Url' },
                { id: 'copy', label: 'Copy URL' },
                { id: 'edit', label: 'Edit' },
              ]}
            />
            <TableBody>
              {products.map((row) => (
                <UserTableRow
                  key={row._id}
                  _id={row._id}
                  id={row.id}
                  credit={row.credit}
                  discount={row.discount}
                  couponCode={row.couponCode}
                  couonActive={row.couponActive}
                  priceCAD={row.priceCAD}
                  priceUSD={row.priceUSD}
                  onUpdatePrices={onUpdatePrices}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}
