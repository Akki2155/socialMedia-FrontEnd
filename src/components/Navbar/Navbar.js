import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {AppBar, Avatar, Button, Toolbar, Typography} from "@material-ui/core"


import { useDispatch, useSelector } from 'react-redux';


import memories from "../../media/memories.png"
import memoriesLogo from "../../media/memories-Logo.png"
import memoriesText from "../../media/memories-Text.png"

import makeStyles  from './styles'
import "./style.css";
import jwt_decode from 'jwt-decode';

const Navbar = () => {
    const classes=makeStyles();
    const dispatch=useDispatch();

    const [user, setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    const navigate=useNavigate();
    const location=useLocation();

    // const authData=useSelector((state)=> state.auth);



    const logOut =()=>{
      // console.log(user);
      dispatch({ type:"LOGOUT"})
      navigate("/");
      setUser(null);
    }


     useEffect(()=>{
        const token= user?.token;
        console.log(token);
        if(token){
        var decoded = jwt_decode(token);
        if(decoded*100 < new Date().getTime()){
         logOut();
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
      };
      setUser(JSON.parse(localStorage.getItem('profile')))
     },[location]);

   //   console.log(user.result.name);
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
    <div className={classes.brandContainer}>
    <div>
       <img  className="logo" src={memoriesLogo} alt="MemoriesLogo" height="35"  />
       <Link to='/'><img   className={classes.image} src={memoriesText} alt="MemoriesLogo" height="35" /></Link> 
    </div>
       <img  className={classes.image} src={memories} alt="MemoriesLogo" height="30"/>
    </div>
    <Toolbar className={classes.toolbar}>
       {user ? (
        <div className={classes.profile}>
          <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture} >{user.result.name.charAt(0)}</Avatar>
          <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
          <Button variant='contained' className={classes.logout} color='secondary' onClick={logOut}>Logout</Button>
        </div>
       ) : (
          <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In </Button>
       ) }
    </Toolbar>
    </AppBar>
  )
}

export default Navbar