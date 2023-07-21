import React, { useState } from "react";
import useStyles from "./styles";
import Input from "./Input";
import Icon from "./Icon";
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux';

import {
  Container,
  Paper,
  Avatar,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {signInWithGoogle} from "./Firebase";

import { signIn, signUp } from "../../actions/Auth";

const initialState = {
  firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
}

const Auth = ({user, setUser}) => {
  const classes = useStyles();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setisSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (isSignup) {
      dispatch(signUp(formData));
    }
    else {
      await fetch(dispatch(signIn(formData)));
      if(localStorage.getItem("name")) {
        setUser(true);
        history.push('/');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setisSignup((previsSignup) => !previsSignup);
    setShowPassword(false);
  };

  const authentication = () => {
    fetch(signInWithGoogle()).then(() => {
      setUser(true);
      history.push('/')
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                  autoFocus
                  type='text'
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
            {isSignup && (
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
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>          
          <Button
            className={classes.googleButton}
            color="primary"
            fullWidth
            onClick={authentication}
            startIcon={<Icon />}
            variant="contained"
            >
            Google Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
