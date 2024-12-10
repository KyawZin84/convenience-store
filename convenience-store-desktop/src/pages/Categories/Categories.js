import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { Paper, Box, Chip,Button } from '../../../node_modules/@mui/material/index';
import { delRequest, getRequest } from 'services/apiService';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import SkeletonComponent from 'components/SkeletonComponent';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import AlertDialog from 'components/AlertDialog';

export default function Category() {

  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [selectData, setSelectData] = React.useState(0)
  const [alertOpen,setAlertOpen] = React.useState(false)
  const navigate = useNavigate()

  const columns = [
    { field: 'id', headerName: 'ID', width: 60, editable: false },
    { field: 'name', headerName: 'Name', width: 150, editable: false },
    { field: 'status', headerName: 'Status', width: 200, editable: false, type: 'singleSelect', renderCell: (params) => (
      params.row.status === 'active' ? (
        <Chip label="active" color="success" />
      ) : (
        <Chip label="deactivate" color="error" />
      )
    )},
    {field:'description',headerName:"Description",width:200,editable:false},
    { field: 'created_at', headerName: 'Created Date', type: 'date', width: 160, editable: false, valueGetter: (params) => new Date(params.row.created_at)},
    { field: 'actions', type: 'actions', headerName: 'Actions', width: 100, cellClassName: 'actions',
      getActions: (params) => {
        const index = [1,2]
        return [
          <GridActionsCellItem
            key={index}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={()=>{navigate(`/categories/update/${params.id}`)}}
            color="inherit"
          />,
          <GridActionsCellItem
            key={index}
            icon={<DeleteOutlined />}
            label="Delete"
            color="inherit"
            onClick={()=>{setSelectData(params.id),setAlertOpen(true)}}
          />,
        ];
      },
    },
  ];
  
  const fetchData = async () => {
    setLoading(true)
    const response = await getRequest("categories/all");
    console.log(response.data.results)
    if (response.data) {
        setData(response.data.results);
    }
    setLoading(false)
  }

  const deleteData = async(id)=>{
    const response = await delRequest(`categories/delete/${id}`)
    if(response.data){
      fetchData();
    }
  }

  React.useEffect(()=>{
    fetchData()
  },[])

  return (
  <>
  <Button onClick={()=>{navigate('/categories/create');}}>
      <AddIcon/> Category
    </Button>
    <Box
      component={Paper}
      sx={{
        height: 410,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      {loading ? (
        <SkeletonComponent />
      ):(
      <DataGrid
        rows={data}
        columns={columns}
        pageSizeOptions={[2]}
      />
      )}
    </Box>
    <AlertDialog 
      open={alertOpen} 
      onClose={()=>{setAlertOpen(false)}} 
      onAgree={()=>{deleteData(selectData),setAlertOpen(false)}} 
      title="Are you sure?"
      body="Are You Want to Delete this table ?"
    />
  </>
  );
}