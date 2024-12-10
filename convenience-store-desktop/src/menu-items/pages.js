import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
  
const pages = {
  id: 'authentication',
  title: 'Authentication',
  type: 'group',
  children: [
    {
      id: 'screens-users',
      title: 'Users',
      type: 'item',
      url: '/users/list',
      icon: PeopleAltOutlinedIcon
    },
    {
      id: 'screens-rolepermission',
      title: 'Role and Permission',
      type: 'item',
      url: '/rolepermission/all',
      icon: ManageAccountsIcon
    },
    {
      id: 'screens-invoices',
      title: 'Invoices',
      type: 'item',
      url: '/invoices/all',
      icon: LocalMallOutlinedIcon,
      hide: false
    },
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: '/settings/all',
      icon: SettingsOutlinedIcon
    }
  ]
};

export default pages;