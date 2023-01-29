import React from "react";
import { HashRouter, Routes, Route, Navigate} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import { Container } from "@material-ui/core";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import { GoogleOAuthProvider } from "@react-oauth/google";



const App = () => {

  const user=JSON.parse(localStorage.getItem("profile"));
  // console.log(user);
  return (
    <GoogleOAuthProvider clientId="835343339528-0ojrmv6901cfvdjvvhllktpgmgdn2m07.apps.googleusercontent.com">
      <HashRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Routes>
          <Route path="/" exact element={<Home />} />
            <Route path="/posts" exact element={<Home />} />
            <Route path="/posts/search" exact element={<Home />} />
            <Route path="/posts/:id" exact element={<PostDetails />} />
            <Route path="/auth" exact element={ <Auth/> } />
          </Routes>
        </Container>
      </HashRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
