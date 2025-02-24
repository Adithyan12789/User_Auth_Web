import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import store from './store.js';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoutes from './components/PrivateRoutes.jsx';

// Admin Imports

import AdminHomeScreen from './screens/AdminHomeScreen.jsx';
import AdminLoginScreen from './screens/AdminLoginScreen.jsx';
import { UserManagementScreen } from './screens/UserManagementScreeen.jsx';
import AdminPrivateRoute from './components/admin/AdminPrivateRoutes.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>

      {/* Private Routes */}
      <Route path='' element={<PrivateRoutes/>}>
        <Route path='/profile' element={<ProfileScreen/>}/>
      </Route>

      {/* ************** ADMIN *************************** */}

      <Route path="/admin" element={<AdminPrivateRoute />}>
        <Route index element={<AdminHomeScreen />} />
        <Route path="get-user" element={<UserManagementScreen />} />
      </Route>
      <Route path="/admin/login" element={<AdminLoginScreen />} />
    </Route>  
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  </Provider>
)
