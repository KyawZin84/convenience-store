import { useEffect, useState } from 'react'
import { Box, Button, Card, CardMedia, Grid, IconButton, Modal, Stack, TextField, Typography } from '../../../node_modules/@mui/material/index'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { delRequest,getRequest,postRequest } from "services/apiService";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
//import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';

const Files = () => {
  const [files,setfiles] = useState([])
  const [upload,setupload] = useState({})
  const [open, setOpen] = useState(false);
  const [deleteid,setdeleteid] =useState();
  const [showdelete,setshowdelete] =useState()
  const handleClose = () => setOpen(false);
  //const navigate = useNavigate()

  const fetchFilesData = async () => {
    const response = await getRequest("files/all");
    if (response.data) {
        console.log(response)
        setfiles(response.data.results);
    }else{
        console.log(JSON.stringify(response))
    }
  }
  useEffect(()=>{
    fetchFilesData();
  },[])

  const uploadimg = (e) => {
    setupload({
      image : e.target.files[0]
  })
  FilesCreate(e.target.files[0]);
  }
  console.log(upload)

  const deletebutton = (id) => {
    if(id == showdelete){
      setshowdelete("")
    }else{
      setshowdelete(id)
    }
  }

  const FilesCreate = async(e) => {
    const formData = new FormData();
    console.log(e)
    formData.append("file",e)
    const response = await postRequest('files/add',formData)
    if(response.data){
      fetchFilesData();
    }else{
      console.log("Error")
    }
  }

  const DeleteFile = async(id) => {
    const responce = await delRequest(`files/delete/${id}`)
    if(responce.data){
      setOpen(false)
      fetchFilesData();
    }else{
        console.log("ERror")
    }
  }

  const DeleteClick = (id) => {
    console.log(id)
    setOpen(true)
    setdeleteid(id)
  }

  return (
    <Stack direction="column">
      <Box sx={{border:"5px dashed lightgray",padding:5}}>
      <TextField
        id="image-upload"
        type="file"
        inputProps={{ accept: 'image/*' }}
        style={{ display: 'none' }}
        onChange={(v)=>uploadimg(v)}
      />
      <label htmlFor="image-upload">
        <IconButton sx={{marginLeft:"45%"}}
          color="primary"
          component="span"
        >
          <UploadFileIcon sx={{fontSize:"70px"}} />
        </IconButton>
      </label>
      </Box>
      <Grid container>
            {files.map((f)=>{
              return(
                <Grid item xs={3} key={f.id}>
                <Card sx={{margin:2,position:"relative"}} onClick={()=>deletebutton(f.id)}>
                  {showdelete == f.id ? (<IconButton onClick={()=>DeleteClick(f.id)} 
                  sx={{marginLeft:"80%",position:"absolute"}}>
                    <RemoveCircleIcon color="error" size="large" />
                  </IconButton>):("")}
                  <CardMedia component="img" sx={{height:"250px",padding:2}}
                  image={"http://127.0.0.1:8000"+f.file} alt={f.name} />
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
    </Stack>
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


export default Files