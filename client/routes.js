import NotFound from './components/NotFound.jsx';
import Authenticate from './components/Authenticate.jsx';
import Dashboard from './components/Dashboard.jsx';
import ViewGroup from './components/ViewGroup.jsx';
import Home from './components/Home.jsx';

const routes = [
  {
    path: '/',
    exact: true,
    component: Authenticate(Home)
  },
  {
    path: '/dashboard',
    exact: true,
    component: Authenticate(Dashboard)
  },
  {
    path: '/groups/:groupId',
    component: Authenticate(ViewGroup)
  },
];

export default routes;
