import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login';
import Profile from './components/Profile';
import {Provider} from 'react-redux';
import appStore from './utils/appStore';
import Feed from './components/Feed';
import Connections from './components/Connections';
import Requests from "./components/Requests"

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
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
