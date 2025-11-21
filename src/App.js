import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Body from './components/Body';
import Login from './components/Login';
import Profile from './components/Profile';
import {Provider} from 'react-redux';
import appStore from './utils/appStore';
import Feed from './components/Feed';
import Connections from './components/Connections';
import Requests from "./components/Requests"
import NoRouteFound from './components/NoRoundFound';
import CustomOfflinePage from './components/CustomOfflinePage'

import { Toaster } from "react-hot-toast";


function App() {
  return (
    <>

    <Toaster 
    position="top-center" 
    toastOptions={{ duration: 3000 }} />


    <Provider store={appStore}>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/Feed" element={<Feed/>} />
          <Route path="/Login" element={<Login />}/>
          <Route path="/Profile" element={<Profile />}/>
          <Route path="/Connections" element={<Connections/>} />
          <Route path="/requests" element = {<Requests/>} />
        </Route>

        {/* offline fallback page */}
        <Route path="/offline" element={<CustomOfflinePage />} />


        {/* 404 route — must be last */}
        {/* Not be a child route .. */}
          <Route path="*" element={<NoRouteFound />} />


      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
