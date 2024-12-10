import { getRequest,postRequest, patchRequest } from "services/apiService";
let products =[];
const fetchData = async () => {
    const response = await getRequest("items/all");
    if (response.data) {
        products=response.data.results;
    }else{
        console.log(JSON.stringify(response))
    }
  }

  fetchData();

export const Qua = async(buy,formdata) => {
    buy.map((b)=>{
        products.map((p)=>{
            if(p.name == b.name){
                const formData = new FormData()
                formData.append("qty",p.qty - b.qua)
                patchRequest(`items/patch/${p.id}`, formData)
                CreateInvoice(formdata)
            }
        })
    })
}

const CreateInvoice = async(formdata)=>{
    const response = await postRequest("invoices/add",formdata);
    if (response.data) {
        products=response.data.results;
    }else{
        console.log(JSON.stringify(response))
    }
    window.location.href="http://localhost:3000/counter";
}