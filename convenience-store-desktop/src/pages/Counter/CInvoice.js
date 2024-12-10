import { Box, Button,Grid, Paper, Stack, IconButton,
    Table, TableRow, TableCell,TableHead, TableBody, TextField, InputAdornment} from "../../../node_modules/@mui/material/index";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from "react";
import PrintIcon from '@mui/icons-material/Print';
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";
import { Qua } from "./InvoiceFun";

export const CInvoice = () => {
    const [stext,setstext] = useState(0);
    const [tax,settax] = useState(0);
    const [dis,setdis] = useState(0);
    const [charge,setcharge] = useState(0);
    const [row,setrow] = useState(false)
    const [rowss,setrows] = useState([]);
    const navigate = useNavigate();

    useEffect(()=> {
        getrows();
    },[])

    const addtext = (v) => {
        let text = choosetext() 
        if(stext == 0 ){
            settax(tax + 1)
        }else if(stext == 1){
            setdis(dis + 1)
        }else if(stext == 2){
            setcharge(charge + 1)
        }
        text.value += v;
    }

    const backtext = () => {
        let text = choosetext() 
        if(stext == 0 ){
            settax(tax - 1)
        }else if(stext == 1){
            setdis(dis - 1)
        }else if(stext == 2){
            setcharge(charge - 1)
        }
        const rt = text.value.length;
        const newtext = text.value
        text.value = newtext.slice(0,rt-1);
    }

    const choosetext = () => {
        let text; 
        if(stext == 0){
            text = document.getElementById("tax")
        }else if(stext == 1){
            text = document.getElementById("dis")
        }else if(stext == 2){
            text = document.getElementById("ch")
        }else{
            text = document.getElementById("cal")
        }
        return text;
    }

    const taxch = (e) => {
        console.log("tax")
        let total = alltotal(rowss)
        let a = total*e/100;
        let dis = document.getElementById("dis").value
        let c = total*dis/100;
        if(dis == ""){
            c = 0
        }
        let b = total + a - c
        if(isNaN(b)){
            b = 0
        }
        document.getElementById("ta").innerHTML = b 
        refundch()
    }

    const disch = (e) => {
        console.log("dis",e)
        let total = alltotal(rowss)
        console.log(total)
        let tax = document.getElementById("tax").value
        let c = total*tax/100;
        if(tax == ""){
            c = 0
        }
        let a = total*e/100;
        let b = total - a + c
        if(isNaN(b)){
            b = 0
        }
        document.getElementById("ta").innerHTML = b
        refundch()
    }

    useEffect(()=> {
            taxch(document.getElementById("tax").value)
    },[tax])

    useEffect(()=> {
            disch(document.getElementById("dis").value)
    },[dis])

    useEffect(()=> {
        chargech(document.getElementById("ch").value)
    },[charge])

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
       try{
        taxch(document.getElementById("tax").value)
       }catch{
        console.log("ok")
       }
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

    const calcleanclick = () => {
        document.getElementById("cal").value="";
    }

    const calClick = () => {
        const v = document.getElementById("cal").value;
        let result;
        try{
            result = eval(v)
            document.getElementById("cal").value=result
        }catch(e){
            document.getElementById("cal").value="Error"
        }
    }

    const alltotal = (rows) => {
        const result = rows.reduce((initial,row)=> {
          return initial + row.total	
        }, 0);
        return result;
      }

    const allqua = () => {
        const result = rowss.reduce((initial,row)=> {
          return initial + row.qua	
        }, 0);
        return result;
      }

    const refundch = () => {
        let a =  document.getElementById("ch").value - document.getElementById("ta").innerHTML
        document.getElementById("re").value = a;
    }  

    const chargech = () => {
        refundch();
    }

    const invoiceClick = () =>{
        const formdata = new FormData();
        formdata.append("total_qty",allqua());
        formdata.append("subtotal",alltotal(rowss));
        formdata.append("tax",document.getElementById("tax").value);
        formdata.append("discount",document.getElementById("dis").value);
        formdata.append("credit",0);
        formdata.append("total_amount",document.getElementById("ta").innerHTML);
        formdata.append("is_delivery",1);
        formdata.append("charge",document.getElementById("ch").value);
        formdata.append("refund",document.getElementById("re").value);
        formdata.append("status","active");
        formdata.append("shop",1);
        formdata.append("order",JSON.stringify(rowss));
        console.log(formdata);
        Qua(rowss,formdata)
    }
  return (
    <Grid container>
        <Grid item xs={8}>
        <Box mb={2}>
                    <Paper p={4}>
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
                                    <TableCell colSpan={2} />
                                    <TableCell>Total</TableCell>
                                    <TableCell colSpan={2}>{row?alltotal(rowss):alltotal([])}Ks</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Tax</TableCell>
                                    <TableCell><TextField InputProps={{
                                        endAdornment:<InputAdornment position="end">%</InputAdornment>,
                                    }} id="tax" onClick={()=> setstext(0)} /></TableCell>
                                    <TableCell>Discount</TableCell>
                                    <TableCell><TextField InputProps={{
                                        endAdornment:<InputAdornment position="end">%</InputAdornment>,
                                    }} id="dis" onClick={()=> setstext(1)} /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}/>
                                    <TableCell>Total Amount</TableCell>
                                    <TableCell><p id="ta">{row?alltotal(rowss):0}</p>Ks</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Charge</TableCell>
                                    <TableCell><TextField id="ch" onClick={()=> setstext(2)} /></TableCell>
                                    <TableCell>Refund</TableCell>
                                    <TableCell><TextField id="re" readOnly /></TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell colSpan={5}>
                                <Stack direction="row" justifyContent="space-around">
                                    <Button variant="contained" color="error" onClick={()=>{navigate('/counter')}}>cancel</Button>
                                    <Button variant="contained" color="success" endIcon={<PrintIcon/>} onClick={invoiceClick}>Print</Button>
                                </Stack>
                                </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </Box>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
                <TextField id="cal" sx={{backgroundColor:"white",width:"90%"}}
                onClick={()=> setstext(3)} />
                <Stack direction="row" mb={1} mt={1} spacing={4}>
                    <Button variant="contained" color="error" onClick={calcleanclick}>Clean</Button>
                    <Button variant="contained" color="success" onClick={calClick}>Calculate</Button>
                    <Button variant="contained" color="secondary"onClick={backtext}>back</Button>
                </Stack>
                <Stack direction="row" spacing={1} mb={1}>
                    <Button variant="contained" sx={{padding:"10px"}} onClick={()=>addtext("9")}>9</Button>
                    <Button variant="contained" onClick={()=>addtext("8")}>8</Button>
                    <Button variant="contained" onClick={()=>addtext("7")}>7</Button>
                    <Button variant="contained" color="warning" onClick={()=>addtext("+")}>+</Button>
                </Stack>
                <Stack direction="row" spacing={1} mb={1}>
                    <Button variant="contained" sx={{padding:"10px"}} onClick={()=>addtext("6")}>6</Button>
                    <Button variant="contained" onClick={()=>addtext("5")}>5</Button>
                    <Button variant="contained" onClick={()=>addtext("4")}>4</Button>
                    <Button variant="contained" color="warning" onClick={()=>addtext("-")}>-</Button>
                </Stack>
                <Stack direction="row" spacing={1} mb={1}>
                    <Button variant="contained" sx={{padding:"10px"}} onClick={()=>addtext("3")}>3</Button>
                    <Button variant="contained" onClick={()=>addtext("2")}>2</Button>
                    <Button variant="contained" onClick={()=>addtext("1")}>1</Button>
                    <Button variant="contained" color="warning" onClick={()=>addtext("*")}>x</Button>
                </Stack>
                <Stack direction="row" spacing={1} mb={1}>
                    <Button variant="contained" sx={{padding:"10px"}} onClick={()=>addtext("00")}>00</Button>
                    <Button variant="contained" onClick={()=>addtext("0")}>0</Button>
                    <Button variant="contained" onClick={()=>addtext("%")} color="warning">%</Button>
                    <Button variant="contained" color="warning" onClick={()=>addtext("/")}>/</Button>
                </Stack>
        </Grid>
    </Grid>
  )
}
