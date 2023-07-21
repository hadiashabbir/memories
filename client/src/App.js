import React, {useState} from 'react';
import {Container} from '@material-ui/core';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/postDetails/PostDetails';


import { BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

function App() {

  const [user, setUser] = useState(localStorage.getItem('name'));
  
  return (
    <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar user={user} setUser={setUser}/>
      <Switch>
        <Route path='/' exact component={() => <Redirect to='/posts'/>}></Route>
        <Route path='/posts' exact component={Home}></Route>
        <Route path='/posts/search' exact component={Home}></Route>
        <Route path='/posts/:id' exact component={PostDetails}></Route>
        <Route path='/auth' exact component={() => !(user)? <Auth user={user} setUser={setUser}/> : <Redirect to='/posts'/> }></Route>
      </Switch>
    </Container>
    </BrowserRouter>
  );
}

export default App;
