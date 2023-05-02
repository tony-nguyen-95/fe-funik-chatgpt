/* eslint-disable react/react-in-jsx-scope */
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainRoute from './routes';
import LoginRoute from './routes/login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/" element={<MainRoute />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
