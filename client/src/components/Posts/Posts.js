import React from 'react';
import useStyles from './styles';
import {useSelector} from 'react-redux';
import Post from './Post/Post';
import { Grid, CircularProgress } from '@material-ui/core';

const Posts = ({setCurrentID}) => {
    const classes = useStyles();
    const {posts, isLoading} = useSelector((state) => state.posts);

    if(!posts?.length &&  !isLoading) return 'No Posts';
    return (
      isLoading? <CircularProgress /> : (
        <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
          {
            posts.map((post) => (
              <Grid item key={post._id} sx={12} sm={12} md={6} lg={4}>
                <Post post={post} setCurrentID={setCurrentID}/>
              </Grid>
            ))
          }
        </Grid>
      )
  )
}

export default Posts