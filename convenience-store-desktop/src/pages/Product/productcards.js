import { Card, Paper,Grid,CardMedia,
  CardContent,Typography,Button, Stack, InputLabel, Modal } from "../../../node_modules/@mui/material/index";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";
import { getRequest } from "services/apiService";

const Productcards = (props) => {
  const {mapproducts,categories} = {...props}
  const Navigate = useNavigate();
  const [cate,setcate] = useState(0)
  const [products,setproducts] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const DeleteClick = (p)=>{
    setOpen(true)
    console.log(p);
  }

  const fetchData = async () => {
    const response = await getRequest("items/all");
    if (response.data) {
        setproducts(response.data.results);
    }else{
        console.log(JSON.stringify(response))
    }
  }
  useEffect(()=>{
    fetchData();
  },[])

  const editclick = (id) => {
    Navigate('/products/update')
    let pid = JSON.stringify(id)
    localStorage.setItem('upid',pid)
 }

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
  
  return (
    <Paper sx={{padding:2,minHeight:"300px"}}>
      <Stack direction="row" justifyContent="center" spacing={3} p={2}>
        <Button variant={catebutton(0)} color="error" onClick={()=>CateClick(0)}>All</Button>
        {categories.map((c)=>{
                    return (
                        <Button key={c.id} variant={catebutton(c.id)} color="error" onClick={()=>CateClick(c.id)}>{c.name}</Button>
                    )
                })}
      </Stack>

      <Grid container spacing={2}  paddingX={6}>
        {products.length <= 0?(<h3 style={{marginLeft:"40%",padding:2}}>No Product in THis Category ! </h3>):("")}
      {products.map((product)=>{
        return(
          <Grid item width={250} key={product.id} sx={{position:"relative"}}>
          <Card sx={{height:"300px"}}>
              <InputLabel
              variant="filled" sx={{ zIndex: 9, top: 5, right: 15, position: 'absolute',
                  textTransform: 'uppercase', padding:1,color:"white",fontSize:10,
                  borderRadius:3,backgroundColor:"#31b20e"}}
              >
              {product.categories.name}
              </InputLabel>
              <CardMedia
                  component="img" alt={product.name} height="150px"
                  image={`${"http://127.0.0.1:8000"+product.files.file}`} sx={{padding:2}}/>
              <CardContent>
                  <Typography sx={{fontSize:"15px"}}>{product.name}</Typography>
                  <Stack spacing={2} direction="row" mb={1}>

                    <Typography sx={{fontSize:"14px",backgroundColor:"blue",
                    color:"white",padding:"5px"}}>{product.barcode}</Typography>

                    <Typography sx={{fontSize:"14px",backgroundColor:"yellow",
                    color:"black",padding:"5px"}}>{product.price}Kyats</Typography>

                  </Stack>
                  <Stack spacing={2} direction="row">
                  <Button variant='contained' color='secondary'
                  onClick={()=>editclick(product.id)}><EditIcon/></Button>
                  <Button variant='contained' color='error'
                  onClick={()=>DeleteClick(product)}><DeleteIcon/></Button>
                  </Stack>
              </CardContent>
          </Card>
      </Grid>
        )
      })}
      </Grid>
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
    </Paper>
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

export default Productcards;
