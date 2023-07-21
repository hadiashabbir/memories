import React, {useState, useEffect} from 'react'
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch , useSelector} from "react-redux";
import { createPost, updatePost, getPosts } from "../../actions/posts";

import FileBase from "react-file-base64";

const Form = ({currentID, setCurrentID}) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => currentID? state.posts.posts.find((post) => post._id === currentID) : null);
  const [user, setUser] = useState(false);

  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: [],
    selectedFile: ''
  });

  const name = localStorage.getItem("name");

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  useEffect(() => {
    if(localStorage.getItem("name")) {
      setUser(true);
    }
  }, [])

    const classes = useStyles();
    
    const handleSubmit = (e) => {
      e.preventDefault();

      if (currentID) {
        dispatch(updatePost(currentID, postData))
      }
      else {
        dispatch(createPost({...postData, name: name}));
        dispatch(getPosts(1))
      }  
      clear();
    }

    const clear = () => {
      setCurrentID(null);
      setPostData({
        title: '',
        message: '',
        tags: [],
        selectedFile: ''
      });
    }

    if (!user) {
      return(
      <Paper className={classes.paper}>
        <Typography variant="h6" align='center'>
          Please sign in to create your own memories and like other's memories
        </Typography>
      </Paper>
      );
    }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
          <Typography variant='h6'>{currentID? 'Editing' : 'Creating'} a Memory</Typography>
          <TextField 
          name='title'
          variant='outlined'
          label= 'Title'
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({...postData, title: e.target.value})}
          />
          <TextField 
          name='message'
          variant='outlined'
          label= 'Message'
          fullWidth
          value={postData.message}
          onChange={(e) => setPostData({...postData, message: e.target.value})}
          />
          <TextField 
          name='tags'
          variant='outlined'
          label= 'Tags'
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}
          />
          <div className={classes.fileInput}>
            <FileBase
            type= "file"
            multiple = {false}
            onDone={({base64}) => {
              setPostData({...postData, selectedFile: base64})
            }}
            />
          </div>
          <Button className={classes.buttonSubmit} variant="contained" color='primary' size='large' type='submit' fullWidth>Submit</Button>
          <Button variant="contained" color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form