import * as React from 'react';
import { 
  Paper, Box, IconButton, Table, 
  TableBody, TableCell,  TableHead,
  TableRow,Collapse, Modal, Typography, Stack, Button, Card
} from '../../../node_modules/@mui/material/index';
import { delRequest, getRequest } from 'services/apiService';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import SkeletonComponent from 'components/SkeletonComponent';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Row(props) {
  const { row,remove } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.id}</TableCell>
        {/* <TableCell align="left">
          {row.invoice_number.length > 9 ? (`${row.invoice_number.slice(0,9)}...`):(row.invoice_number)}
        </TableCell> */}
        <TableCell align="left">{row.total_qty}</TableCell>
        <TableCell align="left">{row.subtotal}</TableCell>
        <TableCell align="left">{row.tax}</TableCell>
        <TableCell align="left">{row.discount}</TableCell>
        <TableCell align="left">{row.credit}</TableCell>
        <TableCell align="left">{row.total_amount}</TableCell>
        <TableCell align="left">{row.is_delivery}</TableCell>
        <TableCell align="left">{row.charge}</TableCell>
        <TableCell align="left">{row.refund}</TableCell>
        <TableCell align="left">
          {new Date(row.created_at).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}
        </TableCell>
        <TableCell align="left">
            <IconButton color='error' size='small' onClick={()=>remove(row.id)}>
                   <DeleteForeverIcon/>
               </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>ProductName</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell align="left">Amount</TableCell>
                    <TableCell align="left">Total price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.order.map((od) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">{od.name}</TableCell>
                      <TableCell>{od.qua}</TableCell>
                      <TableCell align="left">{od.price}</TableCell>
                      <TableCell align="left">{od.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Invoice() {

  const [data, setData] = React.useState([])
  const [page, setPage] = React.useState(1);
  // const [total, setTotal] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(true)
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [Id,setID] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    console.log(parseInt(event.target.value, 10))
  };

  const fetchData = async () => {
    setLoading(true)
    let params = {per_page:rowsPerPage, page:page}
    console.log(params)
    const response = await getRequest("invoices/all", params);
    console.log(response)
    if (response.data) {
        setData(response.data.results);
        // setTotal(response.data.total)
    }
    setLoading(false)
  }

  const remove = (id) => {
    setOpen(true);
    setID(id)
  }
const DeleteInvoice = async(id) => {
  const response = await delRequest(`invoices/delete/${id}`)
  if(response.data){
    fetchData();
    setOpen(false)
  }
}

  React.useEffect(()=>{
    fetchData();
  },[])

  React.useEffect(()=>{
    fetchData()
  },[page,rowsPerPage])

  return (
    <Box
      component={Paper}
      sx={{
        height: '90%',
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      {loading ? (
        <SkeletonComponent />
      ):(
      <>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Id</TableCell>
            {/* <TableCell align="left">Invoice No</TableCell> */}
            <TableCell align="left">Total Qty</TableCell>
            <TableCell align="left">Subtotal</TableCell>
            <TableCell align="left">Tax</TableCell>
            <TableCell align="left">Discount</TableCell>
            <TableCell align="left">Credit</TableCell>
            <TableCell align="left">Total Amount</TableCell>
            <TableCell align="left">Is Delivery</TableCell>
            <TableCell align="left">Charge</TableCell>
            <TableCell align="left">Refund</TableCell>
            <TableCell align="left">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.name} row={row} remove={remove} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={1}
        page={page - 1}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal  open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Card sx={style}>
              <Typography variant="h5" gutterBottom >  Are you Sure Want to Delete?</Typography>
              <Stack direction="row" justifyContent="center" spacing={1}>
                <Button variant="contained" color="success"onClick={()=>DeleteInvoice(Id)}>OK</Button>
                <Button variant="contained" color="error" onClick={handleClose} >Cancel</Button>
              </Stack>
          </Card>
   </Modal>
      </>
      )}
  </Box>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};
