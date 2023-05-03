/* eslint-disable react/react-in-jsx-scope */
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login, User, Home } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" render={(props) => <Login {...props} />} />
        <Route path="/user" render={(props) => <User {...props} />} />
        <Route path="/" render={(props) => <Home {...props} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
