import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { LandingPage } from './components/LandingPage/LandingPage';
import {UserSettingsPage} from './components/UserSettingsPage';
import { UserOverviewPage } from './components/UserOverviewPage';


function App() {

  return (
    <main>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/settings" component={UserSettingsPage} />
        <Route path="/useroverview/:username" component={UserSettingsPage} />
      </Switch>
    </main>
  );

}

export default App;
