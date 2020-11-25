import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LandingPage } from './components/LandingPage/LandingPage';
import { UserSettingsPage } from './components/UserSettingsPage/UserSettingsPage';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/settings" component={UserSettingsPage} />
      </Switch>
    </main>
  );

}

export default App;
