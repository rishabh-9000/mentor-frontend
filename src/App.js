import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Mentors from './components/Mentors';
import AddMentor from './components/AddMentor';
import AddTask from './components/AddTask';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={Mentors} />
          <Route exact path='/add-mentor' component={AddMentor} />
          <Route exact path='/add-task' component={AddTask} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
