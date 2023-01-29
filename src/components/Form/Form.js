import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";

import FileBase from "react-file-base64";

import useStyles from "./styles.js";

import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts.js";

const Form = ({ setCurrentId, currentId }) => {
 
  const classes = useStyles();
  const post = useSelector((state) =>{
 
    return(
    currentId ? state.posts.posts.find((post) => post._id === currentId) : null)
    });

  // console.log(post);

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const user=JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if(post){
      setPostData(post);
    }
   
  }, [post]);
  // console.log(postData);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId,{...postData, name: user?.result?.name }));
      handleClear();
    }
    dispatch(createPost({...postData, name: user?.result?.name }));
    handleClear();
  };

  const handleClear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if(!user?.result?.name){
    return(
    <Paper className={classes.paper}>   
        <Typography variant='h6' align="center">Please Sign In to create your own blogg and to like others blogg.</Typography>
    </Paper>
    )
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{currentId ? 'Enhance A Memory': 'Creating A Memory'}</Typography>
        <TextField
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          label="Message"
          variant="outlined"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          label="Tags"
          variant="outlined"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />{" "}
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          size="large"
          type="submit"
          fullWidth
        >
          {currentId ? 'Enhance':'Submit'}
        </Button>
        <Button
          className={classes.buttonClear}
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
          onClick={handleClear}
        >
          {currentId ? 'Changed My Mind':'Clear'}
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
