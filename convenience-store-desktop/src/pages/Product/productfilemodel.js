import React from 'react'
import { Grid,Paper, Button, Card, CardMedia } from '../../../node_modules/@mui/material/index';

const Productfilemodel = (props) => {
    const {files,close,imageselected} = {...props}
  return (
    <Paper sx={style}>
        <Button onClick={close} variant="outlined" color={"error"}>Close</Button>
        <Grid container>
                 {files.map((f)=>{
              return(
                <Grid item xs={4} key={f.id}>
                <Card sx={{margin:2}} onClick={()=>imageselected(f)}>
                  <CardMedia component="img" sx={{height:"250px",padding:2}}
                  image={"http://127.0.0.1:8000"+f.file} alt={f.name} />
                </Card>
                </Grid>
              )
            })}
        </Grid>
    </Paper>
  )
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default Productfilemodel;
