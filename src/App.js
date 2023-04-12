import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import HomeScreen from "./Screen/HomeScreen";
import LoginScreen from './Screen/LoginScreen';
import Registerscreen from './Screen/Registerscreen'
import PlanScreen from './Screen/PlanScreen';
import UserListScreen from './Screen/UserListScreen';
import UpdateUserScreen from './Screen/UpdateUserScreen';
import UserProfileScreen from './Screen/UserProfileScreen';
import UpdateUserProfileScreen from './Screen/UpdateUserProfileScreen';
import GenresScreen from './Screen/GenresScreen';
import GenreContentsScreen from './Screen/GenreContentsScreen';
import AddGenreScreen from './Screen/AddGenreScreen';
import AddContentScreen from './Screen/AddContentScreen';
import EditContentScreen from './Screen/EditContentScreen';
import ContentScreen from './Screen/ContentScreen';
import ContentListScreen from './Screen/ContentListScreen';
import LogoutScreen from './Screen/LogoutScreen';
import UserContentScreen from './Screen/UserContentScreen';

import Tier1ContentsScreen from './Screen/Tier1ContentsScreen';
import Tier2ContentsScreen from './Screen/Tier2ContentsScreen';
import Tier3ContentsScreen from './Screen/Tier3ContentsScreen';

import FAQScreen from './Screen/FAQScreen';


import './bootstrap.min.css';
import './App.css';


function App() {
  return (
  <Router>
    <Header/>
    <main>
      <Routes>
      <Route path='/' element={<HomeScreen />} exact/>
      <Route path='/signup' element={<Registerscreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/plans' element={<PlanScreen />} />
      <Route path='/updateuserinfo/:id' element={<UpdateUserScreen />} />
      <Route path='/userlist' element={<UserListScreen />} />
      <Route path='/updateuserprofile' element={<UpdateUserProfileScreen />} />
      <Route path='/userprofile' element={<UserProfileScreen />} />
      <Route path='/genre' element={<GenresScreen />} />
      <Route path='/genre/contents/:id' element={<GenreContentsScreen />} />
      <Route path='/genre/add' element={<AddGenreScreen />} />
      <Route path='/content/add' element={<AddContentScreen />} />
      <Route path='/content/edit/:id' element={<EditContentScreen />} />
   	  <Route path='/contents' element={<ContentListScreen />} />
	    <Route path='/content/:id' element={<ContentScreen />} />
      <Route path='/content/user' element={<UserContentScreen />} />
      <Route path='/logout' element={<LogoutScreen />} />

      <Route path='/contents/tier/1' element={<Tier1ContentsScreen />} />
      <Route path='/contents/tier/2' element={<Tier2ContentsScreen />} />
      <Route path='/contents/tier/3' element={<Tier3ContentsScreen />} />

      <Route path='/FAQ' element={<FAQScreen />} />
      </Routes>
    </main>
    <Footer fixed="bottom"/>
  </Router>
  );
}

export default App;
