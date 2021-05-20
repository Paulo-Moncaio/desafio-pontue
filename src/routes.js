import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import Login from './pages/Login/Login';
import Dashboard from './pages/DashBoard/DashBoard'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Login} />
      <PrivateRoute path="/Dashboard" component={Dashboard} />
      <Route component={Login} />

    </Switch>
  </BrowserRouter>
);

export default Routes;