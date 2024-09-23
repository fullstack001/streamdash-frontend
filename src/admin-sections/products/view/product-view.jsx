import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
// ----------------------------------------------------------------------

export default function ProductPage() {
  const product = [
    { product: 'free', id: 323642 },
    { product: 1, id: 453423 },
    { product: 6, id: 975645 },
    { product: 12, id: 346345 },
    { product: 50, id: 675454 },
    { product: 'all', id: 934323 },
  ];

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
                { id: 'url', label: 'Url' },
                { id: '', label: 'Copy URL' },
              ]}
            />
            <TableBody>
              {product.map((row) => (
                <UserTableRow key={row.id} id={row.id} product={row.product} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}
