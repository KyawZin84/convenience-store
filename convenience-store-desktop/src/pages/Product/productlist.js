import { Box, Table, TableBody, TableCell, TableHead, TableRow,Paper,Button, Stack, Modal, Card, Typography } from "../../../node_modules/@mui/material/index"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";
import { useState } from "react";

const Productlist = (props) => {
    const {products} = {...props}
    const Navigate = useNavigate();
    const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const deleteclick = (p)=>{
    setOpen(true)
    console.log(p);
  }

    let number = 0;
    const rowcolor = (n) => {
        if(n%2 != 0){
            return "lightgray"
        }
    }

    const editclick = (id) => {
        Navigate('/products/update')
        let pid = JSON.stringify(id)
        localStorage.setItem('upid',pid)
     }

  return (
    <Box p={4}>
        <Table component={Paper}>
            <TableHead>
                <TableRow sx={{backgroundColor:"blue"}}>
                    <TableCell sx={{color:"white"}}>Id</TableCell>
                    <TableCell sx={{color:"white"}}>Image</TableCell>
                    <TableCell sx={{color:"white"}}>Name</TableCell>
                    <TableCell sx={{color:"white"}}>Barcode</TableCell>
                    <TableCell sx={{color:"white"}}>Purchase Price</TableCell>
                    <TableCell sx={{color:"white"}}>Price</TableCell>
                    <TableCell sx={{color:"white"}}>QTY</TableCell>
                    <TableCell sx={{color:"white"}}>Category</TableCell>
                    <TableCell sx={{color:"white",textAlign:"center"}}>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {products.map((product)=>{
                    number += 1;
                    console.log(product)
                    return(
                        <TableRow key={product.id} sx={{backgroundColor:rowcolor(number)}}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>
                                <img src={`${"http://127.0.0.1:8000"+product.files.file}`} width={100} height={50} alt={product.name}/>
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.barcode}</TableCell>
                            <TableCell>{product.purchase_price}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.qty}</TableCell>
                            <TableCell>{product.categories.name}</TableCell>
                            <TableCell>
                                <Stack direction="row" spacing={1}>
                                <Button variant='contained' color="secondary"
                                onClick={()=>editclick(product.id)}><EditIcon/>Edit</Button>
                                <Button variant='contained' color="error"
                                onClick={()=>deleteclick(product.id)}><DeleteIcon/>Delete</Button>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
        <Modal  open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Card sx={style}>
              <Typography variant="h5" gutterBottom >  Are you Sure Want to Delete?</Typography>
              <Stack direction="row" justifyContent="center" spacing={1}>
                <Button variant="contained" color="success"onClick={()=>DeleteFile(deleteid)}>OK</Button>
                <Button variant="contained" color="error" onClick={handleClose} >Cancel</Button>
              </Stack>
          </Card>
   </Modal>
    </Box>
  )
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

export default Productlist
