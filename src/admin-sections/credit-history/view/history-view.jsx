import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { getAllHistory } from 'src/lib/api/credit';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterDevice, setFilterDevice] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const getHistory = async () => {
      const res = await getAllHistory();
      if (res === 500) {
        console.log(res);
      } else {
        setHistory(res);
      }
    };
    setHistory([]);
    getHistory();
  }, [setHistory]);

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

  const handleFilterByDevice = (event) => {
    setPage(0);
    setFilterDevice(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: history,
    comparator: getComparator(order, orderBy),
    filterDevice,
  });

  const notFound = !dataFiltered.length && !!filterDevice;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Credit history</Typography>
      </Stack>

      <Card>
        <UserTableToolbar filterDevice={filterDevice} onFilterDevice={handleFilterByDevice} />

        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <UserTableHead
              order={order}
              orderBy={orderBy}
              rowCount={history.length}
              onRequestSort={handleSort}
              headLabel={[
                { id: 'email', label: 'Email' },
                { id: 'action', label: 'Action' },
                { id: 'credit', label: 'Credit' },
                { id: 'device', label: 'DeviceId' },
                { id: 'date', label: 'Date' },
              ]}
            />
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <UserTableRow
                    key={row._id}
                    email={row.email}
                    action={row.action}
                    credit={row.credit}
                    userId={row.userId}
                    date={row.date}
                  />
                ))}

              <TableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, history.length)}
              />

              {notFound && <TableNoData query={filterDevice} />}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          page={page}
          component="div"
          count={history.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
