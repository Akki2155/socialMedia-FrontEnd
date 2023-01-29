import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";

import { Grid, CircularProgress, Card, Typography, Container } from "@material-ui/core";

import useStyles from "./styles.js";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();

  const  {posts, isLoading}  = useSelector((state) => state.posts);

  // console.log(posts, isLoading);
  
  if(!posts.length && !isLoading) return(
    <Card className={classes.card} raised elevation={6}>
    <div className={classes.cardBody}>
    <Typography className={classes.title} color="primary" variant="h5" gutterBottom align="center">
       Sorry No Post Found !!
      </Typography>
    </div>
  </Card>
  );

  return (
    <>
      {isLoading ? (
       <Container align="center"><CircularProgress size="7rem"  variant="indeterminate" /></Container> 
      ) : (
        <Grid
          className={classes.mainContainer}
          container
          alignItems="stretch"
          spacing={3}
        >
        
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Posts;
