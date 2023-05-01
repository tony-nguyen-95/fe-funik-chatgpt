/* eslint-disable react/react-in-jsx-scope */
import './App.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import MainRoute from './routes';

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="" render={(props) => <MainRoute {...props} />} />
    </BrowserRouter>
  );
};

export default App;
