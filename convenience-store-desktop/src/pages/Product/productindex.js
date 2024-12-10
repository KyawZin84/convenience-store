import { Box,Tab } from "../../../node_modules/@mui/material/index";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useEffect, useState } from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListIcon from '@mui/icons-material/List';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Productlist from "./productlist";
import ProductForm from "./productForm";
import Productcards from "./productcards";
import { getRequest } from "services/apiService";

const Productindex = () => {
    const [value, setValue] = useState('2');
    const [products,setproducts] = useState([])
    const [files,setfiles] = useState([])
    const [categories,setcategories] = useState([])
    const [mapproducts,setmapproducts] = useState()

    const fetchData = async () => {
      const response = await getRequest("items/all");
      if (response.data) {
          setproducts(response.data.results);
          setmapproducts(response.data.results);
      }else{
          console.log(JSON.stringify(response))
      }
    }
    const fetchFilesData = async () => {
      const response = await getRequest("files/all");
      if (response.data) {
          console.log(response)
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
    fetchData();
    fetchFilesData();
    fetchcateData();
  },[])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
   <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="product tabs" centered>
            <Tab label="Create" icon={<AddBoxIcon />} iconPosition="start" value="1" />
            <Tab label="Card" icon={<DashboardIcon />} iconPosition="start" value="2" />
            <Tab label="List" icon={<ListIcon />} iconPosition="start" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ProductForm categories={categories} files={files} setValue={(e)=>setValue(e)} />
        </TabPanel>
        <TabPanel value="2">
          <Productcards categories={categories} mapproducts={mapproducts} />
        </TabPanel>
        <TabPanel value="3">
          <Productlist products={products} />
        </TabPanel>
      </TabContext>
    </Box>
    </>
  )
}

export default Productindex;
