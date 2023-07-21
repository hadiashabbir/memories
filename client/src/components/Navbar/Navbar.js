import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { AppBar, Typography, Toolbar, Button, Avatar } from "@material-ui/core";
import { Link, useHistory } from 'react-router-dom';  

import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png"

const Navbar = ({user, setUser}) => {
  const classes = useStyles();
  const history = useHistory();
    
  const logout = () => {
    localStorage.clear();
    setUser(false);

    history.push('/');
  }
  
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer} component={Link} to='/'>
        <img
          src={memoriesText}
          alt="icon"
          height="45px"
        />
        <img
          className={classes.image}
          src={memoriesLogo}
          alt="memories"
          height="40px"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {
            user? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={localStorage.getItem("name")} src={localStorage.getItem("profilePic")}>{localStorage.getItem("name").charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{localStorage.getItem("name")}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
            ) : (
                <Button component={Link} to='/auth' variant="contained" color="primary">Sign In</Button>
            )
        }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
