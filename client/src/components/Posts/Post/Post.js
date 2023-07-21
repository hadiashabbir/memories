import React from 'react'
import useStyles from './styles';
import { Card, CardActions, CardContent, Typography, CardMedia, Button, ButtonBase } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from "react-redux";
import { deletePost , likePost} from "../../../actions/posts";
import {useHistory} from 'react-router-dom';

const Post = ({post, setCurrentID}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const id = localStorage.getItem("id");

    const Likes = () => {
      if (post.likes.length > 0) {
        return post.likes.find((like) => like === id)
          ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
          ) : (
            <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
          );
      }
  
      return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const postOpen = () => history.push(`/posts/${post._id}`)
  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title}></CardMedia>
      <div className={classes.overlay}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        {
          (id === post.creator)?
        <Button style={{color: 'white'}} size='small' onClick={() => {setCurrentID(post._id)}}>
          <MoreHorizIcon fontSize="default"></MoreHorizIcon>
        </Button> : null
        }
      </div>
          <ButtonBase className={classes.cardAction} onClick={postOpen}>
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary' component='h2'>{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}><Likes /> </Button>
        {
          (id === post.creator)? <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button> : null
 
        }
      </CardActions>
    </Card>
  )
}

export default Post