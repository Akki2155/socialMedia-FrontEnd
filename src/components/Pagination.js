import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../actions/posts";

import { Pagination, PaginationItem } from "@material-ui/lab";

import useStyles from "./styles";
import { Link } from "react-router-dom";

const Paginate = ({page}) => {
  const classes = useStyles();
  const dispatch=useDispatch();

  const {numOfPages} = useSelector((state) => state.posts);

  useEffect(()=>{
     if(page){
      dispatch(getPosts(page))
     }
  },[page])


  return <Pagination 
  classes={{ ul: classes.ul }}
  count={numOfPages}
  page={Number(page) || 1}
  variant="outlined"
  color="primary"
  renderItem={
    (item)=> ( 
        <PaginationItem {...item}  component={Link} to={`/posts?page=${item.page}`} />
     )
  }
   />;
};


export default Paginate;
