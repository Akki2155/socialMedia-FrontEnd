import React, { useState } from "react";

import {
  Avatar,
  Button,
  Paper,
  Grid,
  Container,
  Typography,
  TextField,
  CircularProgress
} from "@material-ui/core";
import { GoogleLogin } from "@react-oauth/google";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import  jwt_decode  from "jwt-decode"

import { useDispatch, useSelector } from "react-redux";
import { useNavigate }  from "react-router-dom";

import Input from "./Input";
// import Icon from "./Icon";
import useStyles from "./styles";
import { signIn } from "../../actions/auth.js";
import { signUp } from "../../actions/auth.js";

const initialForm ={ firstName :"", lastName:"", email:"", password:"", confirmPassword:""}

const Auth = () => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialForm)
  const [isSignUp, setSignUp] = useState(false);
  const dispatch=useDispatch();
  const history=useNavigate();

  const  {isLoading}  = useSelector((state) => state.posts);

  const handleSubmit = (e) => {

    e.preventDefault();

    if(isSignUp){
      dispatch(signUp(formData, history))
    }else{
      dispatch(signIn(formData, history))
    } 
  };

  const handleChange = (e) => {

    setFormData({...formData, [e.target.name]:e.target.value})

  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setSignUp(!isSignUp);
    handleShowPassword(false);
  };


  const googleSuccess = async (res)=>{
      const result=jwt_decode(res.credential);
      const token=res.credential;
      dispatch({ type:"AUTH", data:{ result, token } });
      history("/");
  }
  const googleFailure = ()=>{
    console.log("Google Sign In was unsuccessful.Try Again Later")
  };
  return (
    <Container maxWidth="xs" component="main">
      <Paper className={classes.paper} elevation={3}>
      {isLoading ? (
       <Container align="center"><CircularProgress size="7rem"  variant="indeterminate" /></Container> 
      ) :(
        <>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="GOOGLE ID"
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already Have an account? Sign In"
                  : "Don't have an account ? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </>
      )}
      </Paper>
    </Container>
  );
};

export default Auth;
