import React, { useState, useEffect } from "react";

import {
  Container,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";

import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { getPosts, getPostBySearch } from "../../actions/posts";

import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import Pagination from "../Pagination.js";

import useStyles from "./styles.js";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const [titleSearch, setTitleSearch] = useState("");
  const [tagSearch, setTagSearch] = useState([]);

  const classes = useStyles();

  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  function handlePress(e) {
    if (e.keyCode === 13) {
      // search for the post
      searchPost();
    }
  }

  const handleAdd = (tag) => setTagSearch([...tagSearch, tag]);
  const handleDelete = (tag) =>
    setTagSearch(tagSearch.filter((id) => id !== tag));

  const searchPost = () => {
    if (titleSearch.trim() || tagSearch.length > 0) {
      // dispatch some logic to fetch post
      dispatch(
        getPostBySearch({ titleSearch, tagSearch: tagSearch.join(",") })
      );
      navigate(
        `/posts/search?searchQuery=${
          titleSearch || "none"
        }&tags=${tagSearch.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  return (
    <Container maxWidth="xl">
      <Grid
        className={classes.gridContainer}
        container
        justifyContent="space-between"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12} sm={6} md={8}>
          <Posts setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {user ? (
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Blogg "
                fullWidth
                onKeyPress={handlePress}
                value={titleSearch}
                onChange={(e) => setTitleSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0px" }}
                value={tagSearch}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                className={classes.searchButton}
                onClick={searchPost}
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
          ) : null}

          <Form setCurrentId={setCurrentId} currentId={currentId} />
          <Paper className={classes.pagination} elevation={6}>
            <Pagination page={page}/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
