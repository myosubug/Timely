import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LandingPage } from './components/LandingPage/LandingPage';
import { UserSettingsPage } from './components/UserSettingsPage';

function App() {

  return (
    // <main>
    //   <Switch>
    //     <Route path="/" component={LandingPage} exact />
    //     <Route path="/settings" component={UserSettingsPage} />
    //   </Switch>
    // </main>
    <UserSettingsPage 
      username="test2"
      password="123"
      isAdmin={false}
      profileImage=""
      joinDate=""
      posts={3}
    />

  );

}

export default App;
