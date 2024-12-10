import { useEffect, useState } from "react";
import { Button, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Modal, OutlinedInput, Paper, Select, Stack } from "../../../node_modules/@mui/material/index";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { getRequest,postRequest, putRequest } from "services/apiService";
import Productfilemodel from "./productfilemodel";
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";

const ProductForm = (props) => {
    const {setValue} = {...props}
    const [categories,setcategories] = useState([])
    const [files,setfiles] = useState([])
    const [product,setproduct] = useState({files:null, status: "deactivate", qty: "", name: "", purchase_price: "", barcode: "", price: "", categories:0 })
    const [FormErrors,setFormErrors] = useState({})
    const u =localStorage.getItem('upid')
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const [img,setimg] = useState(false);
    const [imgname,setimgname] = useState(false);
    const [iname,setiname] = useState("")
    const [cate,setcate] = useState(false)
    const navigate = useNavigate()
    const [issubmit,setissubmit] = useState(false)
    const [cv,setcv] = useState("select")


    const fetchItemData = async () => {
        const response = await getRequest(`items/view/${u}`);
        if (response.data) {
            console.log("---",response)
            setproduct(response.data);
            setiname(response.data.files.file.replace('/media/',''));
            setimgname(true)
            setcv(response.data.categories.id)
        }else{
            console.log(JSON.stringify(response))
        }
      }

    const fetchFilesData = async () => {
        const response = await getRequest("files/all");
        if (response.data) {
            console.log(response.data.results)
            setfiles(response.data.results);
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
        if(u){
            fetchItemData();
        }
        fetchFilesData();
        fetchcateData();
    },[])

    useEffect(()=>{
        if(Object.keys(FormErrors).length === 0 && issubmit){
            if (u) {
                updateData();
              } else {
                createData();
              }
        }
    },[FormErrors])

    const validate = (values) =>{
        console.log("val",values)
        let error = {};
        if(values.name == ""){
            error.name = "Please Fill name";
        }
        if(values.price == ""){
            error.price = "Please Fill price";
        }else{
            if(!Number.isInteger(Number(values.price))){
                error.price = "Please Fill price only number";
            }
        }

        if(values.qty == ""){
            error.qty = "Please Fill qty";
        }else{
            if(!Number.isInteger(Number(values.qty))){
                error.qty = "Please Fill qty only number";
            }
        }

        if(values.purchase_price == ""){
            error.purchase_price = "Please Fill purchase_price";
        }else{
            if(!Number.isInteger(Number(values.purchase_price))){
                error.purchase_price = "Please Fill purchase_price only number";
            }
        }
        if(values.barcode == ""){
            error.barcode = "Please Fill barcode";
        }else{
            if(!Number.isInteger(Number(values.barcode))){
                error.barcode = "Please Fill barcode only number";
            }
        }
        if(values.files == null){
            error.files = "Please Select file";
        }
        if(values.categories == 0){
            error.categories = "Please Select categories";
        }
        if (error.length>0){
            setissubmit(false)
        }
        setFormErrors(error)
    }

    const CreateClick = () => {
        console.log(product)
        validate(product);
        setissubmit(true)
    }
    const createData = async () => {
        const formData = new FormData()
        const objectArray = Object.entries(product);
        objectArray.map(([key, value]) => {
        formData.append(key, value)
        });
        const response = await postRequest("items/add", formData);
        if (response.data) {
            setValue('2')
        }
        else {
        console.log("Internal Server Error")
        }
     }

    const UpdateClick = () => {
        console.log(product)
        validate(product);
        setissubmit(true)
    }

    const updateData = async () => {
        const formData = new FormData()
        const objectArray = Object.entries(product);
        objectArray.map(([key, value]) => {
        formData.append(key, value)
        });
        if (!img){
            formData.append("files",product.files.id)
        }
        if (!cate){
            formData.append("categories",product.categories.id)
        }
        const response = await putRequest(`items/change/${product.id}`, formData);
        if (response.data) {
        navigate('/products/default')
        localStorage.removeItem("upid")
        }
        else {
        console.log("Internal Server Error")
        }
        }
        console.log(FormErrors)

    const inputChanged = (evt) => {
        // console.log(evt.target.value)
        let p = {...product}
        p[evt.target.name] = evt.target.value
        setproduct(p)
        if(evt.target.name == "categories"){
            setcate(true)
        }
    }

    const CancelClick = ()=> {
        navigate('/products/default')
        localStorage.removeItem("upid")
    }

    const imageselected = (p) => {
        setiname(p.file.replace('/media/',''))
        let pd={...product}
        pd["files"] = p.id
        setproduct(pd)
        handleClose();
        setimg(true)
        setimgname(true)
    }

  return (
    <Paper p={2}>
        <Grid container p={3}>
            <Grid item xs={1}></Grid>
            <Grid item xs={5}>
                <InputLabel htmlFor="name">Product Name</InputLabel>
                <OutlinedInput id="name" name="name" sx={textstyles}
                 placeholder="Product Name" value={product.name} onChange={(v)=>inputChanged(v)} />
                {FormErrors.name != "" && (
                    <FormHelperText error sx={helpertext}>
                      {FormErrors.name}
                    </FormHelperText>
                )}

                <InputLabel htmlFor="barcode">Product Barcode</InputLabel>
                <OutlinedInput id="barcode" name="barcode" sx={textstyles}
                placeholder="Product Barcode" value={product.barcode} onChange={(v)=>inputChanged(v)}/>
                {FormErrors.barcode && (
                    <FormHelperText error sx={helpertext}>
                      {FormErrors.barcode}
                    </FormHelperText>
                )}

                <InputLabel htmlFor="qty">Product QTY</InputLabel>
                <OutlinedInput id="qty" name="qty" sx={textstyles} type="number"
                placeholder="Product QTY" value={product.qty} onChange={(v)=>inputChanged(v)}/>
                {FormErrors.qty && (
                    <FormHelperText error sx={helpertext}>
                      {FormErrors.qty}
                    </FormHelperText>
                )}

                <InputLabel htmlFor="image">Product Image</InputLabel>
                        <IconButton sx={{marginLeft:"25%"}}
                        color="primary"
                        component="span"
                        onClick={handleOpen}
                        >
                        <UploadFileIcon sx={{fontSize:"40px"}}/>
                        </IconButton>
                        {!imgname?"No file selected":`${iname}`}

                {FormErrors.files && (
                    <FormHelperText error sx={helpertext}>
                      {FormErrors.files}
                    </FormHelperText>
                )}

            </Grid>
            <Grid item xs={5}>
                <InputLabel htmlFor="purchase_price">Purchase Price</InputLabel>
                <OutlinedInput id="purchase_price" name="purchase_price" sx={textstyles} 
                placeholder="Purchase Price" value={product.purchase_price} onChange={(v)=>inputChanged(v)} />
                {FormErrors.purchase_price && (
                    <FormHelperText error sx={helpertext}>
                      {FormErrors.purchase_price}
                    </FormHelperText>
                )}

                <InputLabel htmlFor="price">Product Price</InputLabel>
                <OutlinedInput id="price" name="price" sx={textstyles} 
                placeholder="Product Price" value={product.price} onChange={(v)=>inputChanged(v)} />
                {FormErrors.price && (
                    <FormHelperText error sx={helpertext}>
                      {FormErrors.price}
                    </FormHelperText>
                )}

                <InputLabel htmlFor="category">Product category</InputLabel>
                <Select id="category" name="categories" sx={textstyles}
                value={cv} onChange={(v)=>inputChanged(v)}
                >
                    <MenuItem value="select">Select Category</MenuItem>
                    {categories.map((c)=>{
                        return(
                        <MenuItem key={c.id} value={c.id} onClick={()=>setcv(c.id)}>{c.name}</MenuItem>
                        )
                    })}
                </Select>
                {FormErrors.categories && (
                    <FormHelperText error sx={helpertext}>
                      {FormErrors.categories}
                    </FormHelperText>
                )}

                <InputLabel htmlFor="status">Product status</InputLabel>
                <Select id="status" name="status" sx={textstyles}
                value={product.status ?`${product.status}`:"deactivate"} onChange={(v)=>inputChanged(v)}
                >
                    <MenuItem value="active">active</MenuItem>
                    <MenuItem value="deactivate">deactivate</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={1}></Grid>

            <Grid container>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                {u==null?(
                <Stack direction="row" spacing={2} pl={5}>
                        {/* <Button variant="contained" color="error" onClick={ClearClick}>Clear</Button> */}
                        <Button variant="contained" onClick={CreateClick}>Create</Button>
                    </Stack>):(
                    <Stack direction="row" spacing={2} pl={5}>
                        <Button variant="contained" color="error" onClick={CancelClick}>Cancel</Button>
                        <Button variant="contained" onClick={UpdateClick}>Update</Button>
                    </Stack>)}
                    
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        </Grid>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div>
            <Productfilemodel files={files} close={handleClose} imageselected={imageselected} />
            </div>
        </Modal>
    </Paper>
  )
}

const textstyles = {
    width:"90%",
    margin:1,
}
const helpertext = {
    marginLeft:10,
    fontSize:13,
    letterSpacing:3,
}
export default ProductForm; 
