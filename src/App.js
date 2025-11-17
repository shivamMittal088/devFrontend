import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login';
import ProfileForm from './components/ProfileForm';
import {Provider} from 'react-redux';
import appStore from './utils/appStore';
import Feed from './components/Feed';


function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/Feed" element={<Feed/>} />
          <Route path="/Login" element={<Login />}/>
          <Route path="/Profile" element={<ProfileForm />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
