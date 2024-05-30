// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import FindRide from './pages/FindRide';
// import Home from './pages/Home';
// import PostRide from './pages/PostRide';
// import Login from './pages/Login';
// import SignUp from './pages/Signup'; // Import SignUp component
// import Navbar from './components/Navbar'; // Adjust the path as necessary

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route exact path="/" element={<Home/>} />
//         <Route path="/Find a Ride" element={<FindRide/>} />
//         <Route path="/Post a Ride" element={<PostRide/>} />
//         <Route path="/LogIn" element={<Login/>} />
//         <Route path="/SignUp" element={<SignUp/>} /> {/* Route to SignUp component */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FindRide from './pages/FindRide';
import Home from './pages/Home';
import PostRide from './pages/PostRide';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!sessionStorage.getItem('token');
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/LogIn" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Find a Ride" element={<FindRide/>} />
        <Route path="/Post a Ride" element={<PrivateRoute element={PostRide} />} />
        <Route path="/LogIn" element={<Login />} />
        <Route path="/SignUp" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

