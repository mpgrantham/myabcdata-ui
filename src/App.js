import React, {Suspense, useState} from 'react';
import {Switch, Route} from 'react-router-dom';
import Box from '@mui/material/Box';

import Header from './content/Header/Header';
import Home from './content/Home/Home';
import Reset from './content/SignIn/Reset';
import Reassign from './content/Settings/Reassign';
import SignIn from './content/SignIn/SignIn';
import SecuredRoute from './components/SecuredRoute';
import Register from './content/Register/Register';
import ConfirmRegister from './content/Register/ConfirmRegister';

import LoadingDialog from './components/LoadingDialog';

const Dashboard = React.lazy(() => import('./content/Dashboard/Dashboard'));
const IncidentLog = React.lazy(() => import('./content/Log/IncidentLog'));
const IncidentEntry = React.lazy(() => import('./content/Entry/IncidentEntry'));
const IncidentView = React.lazy(() => import('./content/Entry/IncidentView'));
const Settings = React.lazy(() => import('./content/Settings/Settings'));

function App() {

  const [loading, setLoading] = useState(false);

  return (
    
    <div className="root">

        <Suspense fallback={<div className="loading-div">Please wait...</div>}>

          <Header/>

          <Box className="content">
            <Switch>
              <Route exact path="/" render={() => <Home/>}/>
              <Route path="/signin" render={() => <SignIn showLoading={setLoading}/>}/>
              <Route path="/register" render={() => <Register showLoading={setLoading}/>}/>
              <Route path="/reset/:key" render={() => <Reset/>}/>
              <Route path="/reassign/:key" render={() => <Reassign/>}/>
              <Route path="/confirmRegister/:key" render={() => <ConfirmRegister/>}/>
                           
              <SecuredRoute exact path="/dashboard">
                <Dashboard/>
              </SecuredRoute>
              <SecuredRoute path="/log">
                <IncidentLog showLoading={setLoading}/>
              </SecuredRoute>
              <SecuredRoute exact path="/entry">
                <IncidentEntry showLoading={setLoading}/>
              </SecuredRoute>
              <SecuredRoute path="/entry/:id">
                <IncidentEntry showLoading={setLoading}/>
              </SecuredRoute>
              <SecuredRoute path="/view/:id">
                <IncidentView showLoading={setLoading}/>
              </SecuredRoute>
              <SecuredRoute path="/settings">
                <Settings showLoading={setLoading}/>
              </SecuredRoute>
            </Switch>
          </Box>
          
        </Suspense>

        <LoadingDialog openFl={loading}/>
    </div>

  );
}

export default App;
