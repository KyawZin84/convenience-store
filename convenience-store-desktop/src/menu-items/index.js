// project import
import pages from './pages';
import dashboard from './dashboard';
import screens from './screens';
import auth from './auth';
import restaurant from './restaurant';
import counter from './counter';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard,restaurant, screens, pages, auth]
};

export const managerItems = {
  items: [restaurant, screens, auth]
}

export const waiterItems = {
  items: [counter, auth,dashboard, screens, pages,]
}

export default menuItems
