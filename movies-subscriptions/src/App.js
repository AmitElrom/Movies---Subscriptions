import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';

// child components
import { Login } from './components/login comp/Login';
import { Register } from './components/register comp/Register';
import { RegisterLogin } from './components/register-login comp/RegisterLogin';
import { Main } from './components/main comp/Main';
import { Movies } from './components/movies comp/Movies';
import { AllMovies } from './components/all movies comp/AllMovies';
import { AddMovie } from './components/add movie comp/AddMovie';
import { Subscriptions } from './components/subscriptions comp/Subscriptions';
import { AllMembers } from './components/all members comp/AllMembers';
import { AddMember } from './components/add member comp/AddMember';
import { EditMovie } from './components/edit movie comp/EditMovie';
import { EditMember } from './components/edit member comp/EditMember';

function App() {
  return (
    <div style={{textAlign : 'center'}}>
      <h1>Movies - Subscriptions Web Site</h1>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register-login' element={<RegisterLogin />} />
          <Route path="/main" element={<ProtectedRoute />}>
        <Route path='/main' element={<Main />} >
          <Route path='/main/movies/:id' element={<EditMovie />} />
          <Route path='movies' element={<Movies />} >
            <Route path='all-movies' element={<AllMovies />} />
            <Route path='add-movie' element={<AddMovie />} />
          </Route>
          <Route path='/main/subscriptions/:id' element={<EditMember />} />
          <Route path='subscriptions' element={<Subscriptions />} >
            <Route path='all-members' element={<AllMembers />} />
            <Route path='add-member' element={<AddMember />} />
          </Route>
        </Route>
        </Route>
            <Route path='*' element={<div>Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
