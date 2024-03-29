import { useState } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { logo1 } from './assets';
import Home from './Pages/Home';
import CreatePost from './Pages/CreatePost';
import CreatePostLexica from './Pages/CreatePostLexica';
import Login from './Pages/Login';
import Upload from './Pages/Upload';
import Register from './Pages/Register';
import Forgot from './Pages/Forgot';
import { AuthorizedUser, LoggedUser } from './authenticate';
const App = function () {
  return (
    <BrowserRouter>
      <header
        className="w-full flex justify-between items-center
       bg-white sm:px-8 px-4 py-4 border-b 
      border-b-[#e6ebf4]"
      >
        <Link to="/">
          <img src={logo1} alt="logo" className="w-28 object-contain"></img>
        </Link>
        <div className="flex items-center">
          {/* <Link
            to="/create-post-lexica"
            className="font-inter font-medium bg-[#1D267D] text-white px-4 py-2 rounded-md"
          >
            Lexica AI
          </Link>

          <Link
            to="/create-post"
            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md ml-4"
          >
            Stable Diffusion
          </Link> */}
          <Link
            to="/upload"
            className="font-inter font-medium bg-[#F2BED1] text-white px-4 py-2 rounded-md ml-4"
          >
            Upload
          </Link>
          {/* <Link
            to="/login"
            className="font-inter font-medium bg-[#9DC08B]  text-white px-4 py-2 rounded-md ml-4"
          >
            Login
          </Link> */}
        </div>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route
            path="/"
            element={
              // <AuthorizedUser>
              <Home></Home>
              // </AuthorizedUser>
            }
          />

          <Route path="/create-post" element={<CreatePost></CreatePost>} />
          <Route
            path="/create-post-lexica"
            element={<CreatePostLexica></CreatePostLexica>}
          />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/register" element={<Register></Register>} />
          <Route path="/login/forgot" element={<Forgot></Forgot>} />
          <Route path="/upload" element={<Upload></Upload>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};
export default App;
