import React,  {useEffect, useState} from 'react'
import Form from '../Form/Form';
import Posts from '../Posts/Posts'
import Pagination from '../Pagination'
import {getPosts, getPostsBySearch} from '../../actions/posts';
import { useDispatch } from "react-redux";
import {Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import { useHistory, useLocation } from 'react-router-dom';

import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentID, setCurrentID] = useState(null);
    const [search, setSearch] = useState(null);
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const classes = useStyles();
  
    const handleKeyPress = (e) => {
      if(e.key === 'Enter'){
        searchPost();
      }
    }

    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tagtoDelete) => setTags(tags.filter((tag) => tag !== tagtoDelete));

    const searchPost = () => {
      if(search?.trim() || tags){
        dispatch(getPostsBySearch({search, tags: tags.join(',')}))
        history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      }
      else{
        history.push('/');
      }
    }

    return (
    <Grow in>
    <Grid container className={classes.mainContainer} justifyContent='space-between' spacing={3} alignItems='stretch'>
        <Grid item xs={12} sm={6} md={8}>
          <Posts setCurrentID={setCurrentID}/>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AppBar className={classes.appBarSearch} position='static' color='inherit'>
            <TextField
            name='search'
            variant='outlined'
            label='Search Memories'
            onKeyPress={handleKeyPress}
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
            <ChipInput
            style={{margin: '10px 0'}}
            value={tags}
            onAdd={handleAdd}
            onDelete={handleDelete}
            variant='outlined'
            label='Search Tags'
            />
            <Button onClick={searchPost} className={classes.searchButton} color='primary' variant='contained'>Search</Button>
          </AppBar>
          <Form currentID={currentID} setCurrentID={setCurrentID}/>
          {(!searchQuery && !tags.length) && (
          <Paper elevation={6} className={classes.pagination}>
            <Pagination page={page}/>
          </Paper>
          )}
        </Grid>
    </Grid>
  </Grow>
)
}

export default Home