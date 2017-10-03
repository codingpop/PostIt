import NotFound from './components/NotFound.jsx';
import Dashboard from './components/Dashboard.jsx';
import ViewGroup from './components/ViewGroup.jsx';
import Home from './components/Home.jsx';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '/groups/:groupId',
    component: ViewGroup
  },
];

export default routes;
