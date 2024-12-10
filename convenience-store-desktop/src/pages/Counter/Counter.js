import { Box, Button, Card, CardContent, CardMedia,
     Grid, Paper, Typography ,Modal, Stack, IconButton,
     Table, TableRow, TableCell,TableHead, TableBody,} from "../../../node_modules/@mui/material/index";
import { ProductModel } from "./ProductModel";
import { useEffect, useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { getRequest } from "services/apiService";
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";

const Counter = () => {
    const navigate = useNavigate();
    const [products,setproducts] = useState([])
    const [open, setOpen] = useState(false);
    const [modelproduct, setmodelproduct] = useState({});
    const [cate,setcate] = useState(0)
    const [mapproducts,setmapproducts] = useState();
    const [categories,setcategories] = useState([]);
    const [row,setrow] = useState(false)
    const [rowss,setrows] = useState([]);
    
    const invoiceclick = () => {
        if(!row){
            alert("No products in Cart")
        }else{
            navigate('/cinvoice')
        }
    }

    const fetchData = async () => {
        const response = await getRequest("items/all");
        if (response.data) {
            setproducts(response.data.results);
            setmapproducts(response.data.results);
        }else{
            console.log(JSON.stringify(response))
        }
      }

      const fetchcateData = async () => {
        const response = await getRequest("categories/all");
        if (response.data) {
            setcategories(response.data.results);
        }else{
            console.log(JSON.stringify(response))
        }
      }

    useEffect(()=>{
        fetchData();
        fetchcateData();
        if(localStorage.getItem('rows')){
            getrows();
        }

    },[])
    const catebutton = (c)=> {
          if (c == cate){
            return "contained"
          }else{
            return "outlined"
          }
    }
    const CateClick = (cate)=>{
      setcate(cate)
      if(cate == 0){
        setproducts(mapproducts)
      }else{
        let pd = mapproducts.filter((p)=>{
          return p.categories.id == cate
        })
        setproducts(pd)
      }
    }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 let rows = [];
 const getrows = () => {
    rows= JSON.parse(localStorage.getItem('rows'))
    setrows(rows)
    setrow(true)
 }

 const rowremove = (index) => {
    rows= JSON.parse(localStorage.getItem('rows'))
    rows.splice(index,1)
    setrows(rows)
    localStorage.setItem('rows',JSON.stringify(rows))
 }

 const showrows = (r) => {
    alltotal(r)
   return r.map((row,index)=>{
        return(
            <>
        <TableRow key={index}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.price}</TableCell>
            <TableCell>{row.qua}</TableCell>
            <TableCell>{row.total}</TableCell>
            <TableCell>
            <IconButton color='error' size='small' onClick={()=>rowremove(index)}>
                <DeleteForeverIcon/>
            </IconButton>
            </TableCell>
        </TableRow>
        </>
        )
    })
 }
    const productClick = (product) =>{
        handleOpen();
        setmodelproduct(product)
    }

    const cleanclick = () => {
        setrows([]);
        localStorage.removeItem('rows')
    }

    const alltotal = (rows) => {
        const result = rows.reduce((initial,row)=> {
          return initial + row.total	
        }, 0);
        return result;
      }

  return (
    <Grid container>
        {/* left show products  */}
        <Grid item xs={8}>
        <Stack direction="row" justifyContent="center" spacing={2} p={2} mb={1}>
                <Button variant={catebutton(0)} color="error" onClick={()=>CateClick(0)}>All</Button>
                {categories.map((c)=>{
                    return (
                        <Button key={c.id} variant={catebutton(c.id)} color="error" onClick={()=>CateClick(c.id)}>{c.name}</Button>
                    )
                })}
            </Stack>
            <Paper>
                <Grid container spacing={2} p={1}
                sx={{height:"550px",overflow:"scroll",backgroundColor:"lightgray"}}>
                    {products.map((product)=>{
                        return(
                            <Grid item width={200} key={product.id}>
                                <Card sx={{height:"250px"}}>
                                    <CardMedia
                                        component="img" alt={product.name} height="150px"
                                        image={`${"http://127.0.0.1:8000"+product.files.file}`} sx={{padding:2}}/>
                                    <CardContent>
                                        <Typography sx={{fontSize:"12px"}}>{product.name}</Typography>
                                        <Button variant='contained' color='info'
                                        onClick={()=>productClick(product)}>{product.price}Kyats</Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <ProductModel product={modelproduct}
                         close={handleClose} getrows={getrows}
                         />
                    </Box>
                </Modal>
            </Paper>
        </Grid>

        {/* right  calculator and bought products list*/}
        <Grid item xs={4}>
            <Stack direction="column" pl={4}>
                <Box mb={2}>
                    <Paper p={4} sx={{height:"400px",overflow:"scroll"}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {row?showrows(rowss):showrows([])}
                                <TableRow>
                                    <TableCell rowSpan={5}/>
                                    <TableCell>Total</TableCell>
                                    <TableCell colSpan={2}>{row?alltotal(rowss):alltotal([])}Ks</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </Box>

                {/* calculator */}
                        <Stack direction="row" spacing={1} mb={1}>
                            <Button variant="contained" sx={{padding:"10px"}} onClick={()=>addtext("9")}>9</Button>
                            <Button variant="contained" onClick={()=>addtext("8")}>8</Button>
                            <Button variant="contained" onClick={()=>addtext("7")}>7</Button>
                            <Button variant="contained" color="warning" onClick={()=>addtext("+")}>+</Button>
                            <Button variant="contained" color="error" onClick={cleanclick}>Clean</Button>
                        </Stack>
                        <Stack direction="row" spacing={1} mb={1}>
                            <Button variant="contained" sx={{padding:"10px"}} onClick={()=>addtext("6")}>6</Button>
                            <Button variant="contained" onClick={()=>addtext("5")}>5</Button>
                            <Button variant="contained" onClick={()=>addtext("4")}>4</Button>
                            <Button variant="contained" color="warning" onClick={()=>addtext("-")}>-</Button>
                            <Button variant="contained" color="secondary">back</Button>
                            
                        </Stack>
                        <Stack direction="row" spacing={1} mb={1}>
                            <Button variant="contained" sx={{padding:"10px"}} onClick={()=>addtext("3")}>3</Button>
                            <Button variant="contained" onClick={()=>addtext("2")}>2</Button>
                            <Button variant="contained" onClick={()=>addtext("1")}>1</Button>
                            <Button variant="contained" color="warning" onClick={()=>addtext("*")}>x</Button>
                            <Button variant="contained" color="success" onClick={invoiceclick}>invoice</Button>
                        </Stack>
                        <Stack direction="row" spacing={1} mb={1}>
                            <Button variant="contained" sx={{padding:"10px"}} onClick={()=>addtext("00")}>00</Button>
                            <Button variant="contained" onClick={()=>addtext("0")}>0</Button>
                            <Button variant="contained" onClick={()=>addtext("%")} color="warning">%</Button>
                            <Button variant="contained" color="warning" onClick={()=>addtext("/")}>/</Button>
                        </Stack>
            </Stack>
        </Grid>
    </Grid>
  )
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    p: 2,
  };

export default Counter;
