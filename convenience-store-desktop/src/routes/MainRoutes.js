import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import { CInvoice } from 'pages/Counter/CInvoice';
// import PrintTest from 'pages/Restaurants/Components/PrintTest';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - screens
const Categories = Loadable(lazy(() => import('pages/Categories/Categories')));
const CategoriesForm = Loadable(lazy(() => import('pages/Categories/CategoriesForm')));
const Users = Loadable(lazy(() => import('pages/Users/Users')));
const UsersForm = Loadable(lazy(() => import('pages/Users/UsersForm')));
const Customers = Loadable(lazy(() => import('pages/Customers/Customers')));
const CustomersForm = Loadable(lazy(() => import('pages/Customers/CustomersForm')));
const Settings = Loadable(lazy(() => import('pages/Settings/Settings')));
const ShopForm = Loadable(lazy(() => import('pages/Settings/ShopForm')));
const PrinterForm = Loadable(lazy(() => import('pages/Settings/PrinterForm')));
// const Voucher = Loadable(lazy(() => import('pages/Invoice/Voucher')));
const Invoice = Loadable(lazy(() => import('pages/Invoice/Invoice')));

const Counter = Loadable(lazy(()=> import('pages/Counter/Counter')));
const Productindex = Loadable(lazy(()=> import('pages/Product/productindex')));
const Productlist = Loadable(lazy(()=> import('pages/Product/productlist')));
const ProductForm = Loadable(lazy(()=> import('pages/Product/productForm')));
const Files = Loadable(lazy(()=> import('pages/Files/Files')));


const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        },
      ]
    },
    {
      path:'counter',
      element:<Counter />
    },
    {
      path:'cinvoice',
      element:<CInvoice />
    },
    {
      path:'/files/default',
      element:<Files />
    },
    {
      path:'products',
      children: [
        {
          path: 'default',
          element:<Productindex />
        },
        {
          path: 'update',
          element: <ProductForm />
        },
        {
          path: 'list',
          element: <Productlist />
        },
      ]
    },
    {
      path: 'categories',
      children: [
        {
          path: 'list',
          element: <Categories />
        },
        {
          path: 'create',
          element: <CategoriesForm />
        },
        {
          path: 'update/:Id',
          element: <CategoriesForm />
        },
      ]
    },
    {
      path: 'users',
      children: [
        {
          path: 'list',
          element: <Users />
        },
        {
          path: 'create',
          element: <UsersForm />
        },
        {
          path: 'update/:Id',
          element: <UsersForm />
        },
      ]
    },
    {
      path: 'customers',
      children: [
        {
          path: 'list',
          element: <Customers />
        },
        {
          path: 'create',
          element: <CustomersForm />
        },
        {
          path: 'update/:Id',
          element: <CustomersForm />
        },
      ]
    },
    {
      path: 'settings',
      children: [
        {
          path: 'all',
          element: <Settings />
        },
        {
          path: 'shop/update/',
          element: <ShopForm />
        },
        {
          path: 'printer/update/',
          element: <PrinterForm />
        },
      ]
    },
    {
      path: 'invoices',
      children: [
        {
          path: 'all',
          element: <Invoice />
        },
      ]
    }
  ]
};

export default MainRoutes;
