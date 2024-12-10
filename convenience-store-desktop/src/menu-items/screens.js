import TableBarOutlinedIcon from '@mui/icons-material/TableBarOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import Face3OutlinedIcon from '@mui/icons-material/Face3Outlined';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import FolderIcon from '@mui/icons-material/Folder';


const screens = {
  id: 'screens',
  title: 'Tables',
  type: 'group',
  children: [
    {
      id: 'screens-categories',
      title: 'Categories',
      type: 'item',
      url: '/categories/list',
      icon: InventoryOutlinedIcon,
      hide: false
    },
    {
      id: 'screens-products',
      title: 'Products',
      type: 'item',
      url: '/products/default',
      icon: Inventory2Icon,
      hide: false
    },
    {
      id: 'screens-products/create',
      title: 'Products / Create',
      type: 'item',
      url: '/products/create',
      icon: Inventory2Icon,
      hide: true
    },
    {
      id: 'screens-files',
      title: 'Files',
      type: 'item',
      url: '/files/default',
      icon: FolderIcon,
      hide: false
    },
    {
      id: 'screens-tables',
      title: 'Tables',
      type: 'item',
      url: '/tables/list',
      icon: TableBarOutlinedIcon,
      hide: false
    },
    {
      id: 'screens-customers',
      title: 'Customers',
      type: 'item',
      url: '/customers/list',
      icon: Face3OutlinedIcon,
      hide: false
    }
  ]
};

export default screens;
