import { Route, Routes, useNavigate } from 'react-router-dom';

import { Home } from './Pages/Home/Home';
import { Explore } from './Pages/Explore/Explore';
import { Notification } from './Pages/Notification/Notification';
import { Bookmarks } from './Pages/Bookmarks/Bookmarks';
import { Chat } from './Pages/Chat/Chat';
import { Premium } from './Pages/Premium/Premium';
import { Profile } from './Pages/Profile/Profile';

import './App.css';
import { Register } from './Pages/Register/Register';
import { Login } from './Pages/Login/Login';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  if (!user) {
    return navigate('/login');
  }
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/bookmark" element={<Bookmarks />} />
      <Route path="/message" element={<Chat />} />
      <Route path="/premium" element={<Premium />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
