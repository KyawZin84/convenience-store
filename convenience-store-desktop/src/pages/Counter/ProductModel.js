import React, { useState } from 'react'
import { Card, CardContent, CardMedia, MenuItem, Paper,
   Stack, TextField, Typography,Button, IconButton, Grid} from '../../../node_modules/@mui/material/index'
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

export const ProductModel = (props) => {
  const {product,close,getrows} = {...props}
  const [qua,setqua] = useState(1);
  let total = product.price*qua;

  const buyclick = ()=>{
      let rows = JSON.parse(localStorage.getItem('rows'));
      if(typeof rows === "string" || rows == null){
        console.log("inside",typeof rows)
        rows = [];
      }
      rows.push({"name":product.name,"price":product.price,"qua":qua,"total":total});
      localStorage.setItem('rows',JSON.stringify(rows))
      getrows();
      close();
  }

  const quaplus = ()=>{
    let q = qua
    setqua(q+=1)
  }

  const quaminus = ()=>{
    if(qua==1){
      setqua(1)
    }else{
      let q = qua
    setqua(q-=1)
    }
  }
  return (
    <Paper>
        <Card sx={card}>
          <CardMedia component="img" height={200} alt={product.name}
          image={`${"http://127.0.0.1:8000"+product.files.file}`} />

          <CardContent>
            <Typography variant="h4" gutterBottom>{product.name}</Typography>

          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
            <Stack direction="row" spacing={2}>
              <MenuItem sx={{fontsize:20,pr:5}}>Price</MenuItem>
              <TextField value={product.price} variant="standard" sx={{width:100}}
              InputProps={{readOnly:true}} />
            </Stack>

            <Stack direction="row" spacing={2}>
              <MenuItem sx={{fontsize:20}}>Quantity</MenuItem>
              <TextField value={qua} variant="standard" sx={{width:100}}
              InputProps={{
                startAdornment:<IconButton onClick={quaminus}>
                 <IndeterminateCheckBoxIcon/> </IconButton>,
                endAdornment:<IconButton position="end" onClick={quaplus}>
                  <AddBoxIcon/></IconButton>
              }}/>
            </Stack>

            <Stack direction="row" spacing={2} mb={2}>
              <MenuItem sx={{fontsize:20,pr:5}}>Total</MenuItem>
              <TextField value={total} variant="standard" sx={{width:100}}
              InputProps={{readOnly:true}} />
            </Stack>

            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>

            <Stack direction="row" spacing={2} sx={{justifyContent:"center"}}>
              <Button variant='contained' color='error'
              onClick={()=>{close()}}>Close</Button>
              <Button variant='contained' color='success'
              onClick={buyclick}>Buy</Button>
            </Stack>
          </CardContent>
        </Card>
    </Paper>
  )
}

const card = {
  padding:6,
  width:450
}
