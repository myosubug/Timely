import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { LandingPage } from './components/LandingPage/LandingPage';
import {UserOverviewEdit} from './components/UserOverview/UserOverviewEdit';
import { UserOverviewView } from './components/UserOverview/UserOverviewView';
import OverviewRouter from './components/UserOverview/OverviewRouter';


function App() {

  return (
    <main>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        {/* <Route path="/settings" component={UserOverviewEdit} /> */}
        <Route path="/useroverview/:username">
          <OverviewRouter />
        </Route>
      </Switch>
    </main>
  );

}

export default App;
