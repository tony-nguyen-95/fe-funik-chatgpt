/* eslint-disable react/react-in-jsx-scope */
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home, Login, User, ToolBox, StudentTableByHannah, Interaction, ChatHannah } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" render={(props) => <Login {...props} />} />
        <Route path="/user" render={(props) => <User {...props} />} />
        <Route path="/tools/studentByHannah" render={(props) => <StudentTableByHannah {...props} />} />
        <Route path="/tools/interaction" render={(props) => <Interaction {...props} />} />
        <Route path="/tools" render={(props) => <ToolBox {...props} />} />
        <Route path="/chat" render={(props) => <ChatHannah {...props} />} />

        <Route path="/" exact render={(props) => <Home {...props} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
