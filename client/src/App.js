import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { LandingPage } from './components/LandingPage/LandingPage';
import {UserOverviewEdit} from './components/UserOverviewEdit/UserOverviewEdit';
import { UserOverviewView } from './components/UserOverviewEdit/UserOverviewView';
import OverviewRouter from './components/UserOverviewEdit/OverviewRouter';


function App() {

  return (
    <main>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/settings" component={UserOverviewEdit} />
        <Route path="/useroverview/:username">
          <OverviewRouter />
        </Route>
      </Switch>
    </main>
  );

}

export default App;
