
import * as api from "../api/index.js";

// Actions Creator


export const getPosts=(page)=> async(dispatch) =>{
   try{
       dispatch({type: "START_LOADING"});
       const { data }= await api.fetchPosts(page);
        // console.log(data);
       dispatch({type:'FETCH_ALL', payload:data});
       dispatch({type: "END_LOADING"}); 
   }catch(err){
          console.log(err.message);
   }   
}

export const getPost=(id)=> async(dispatch) =>{
  try {
    dispatch({type: "START_LOADING"});
    const {data} =await api.getPost(id);
    dispatch({type:"FETCH_POST", payload:data});
    dispatch({type: "END_LOADING"});
  } catch (error) {
    
  }
}

export const getPostBySearch = (searchQuery) => async(dispatch) =>{

  try {
    dispatch({type: "START_LOADING"});
    // console.log("Calling thoguh getpostBysearch")
    const {data : { data }}= await api.fetchPostBySearch(searchQuery);
    dispatch({type:'FETCH_BY_SEARCH', payload:data});
    dispatch({type: "END_LOADING"});   
  } catch (error) {
      console.log(error);
  }
}

export const createPost=(post)=> async(dispatch)=>{
    try{
          dispatch({type: "START_LOADING"}); 
          const {data}= await api.CreatePost(post);
          dispatch({type:"CREATE", payload:data})
          dispatch({type: "END_LOADING"});     
    }catch(err){
           console.log(err.message);
    }
}

export const  updatePost =(id,post)=> async(dispatch)=>{
  try{
        dispatch({type: "START_LOADING"}); 
        const {data}= await api.updatedPost(id, post);
        dispatch({type:"UPDATE", payload:data});
        dispatch({type: "END_LOADING"});     
  } catch(err){
     console.log('check',err.message);
  }  
}


export const deletePost =(id)=> async(dispatch) =>{
  try {
    await api.deletedPost(id);
    dispatch({ type:"DELETE", payload:id })   
 
  } catch (error) {
      console.log(error)
  }
}

export const likePost = (id)=> async(dispatch)=>{
  try {
    const updatedPost= await api.likePost(id);
    dispatch({type:"LIKE", payload: updatedPost.data});

  } catch (error) {
       console.log(error);
  }
}


export const commentPost= (comment, id)=> async(dispatch)=>{
  try {
    
    const {data}=await api.commentPost(comment, id);
    // console.log(data);
     dispatch({type:"COMMENT", payload:data});
     return data.comments;
  } catch (error) {
      console.log(error.message)
  }
}