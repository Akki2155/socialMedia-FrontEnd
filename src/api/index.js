import axios from 'axios';


const API= axios.create({ baseURL : "https://socialmedia-ik05.onrender.com"})


API.interceptors.request.use((req)=>{
    try {
        if(localStorage.getItem("profile")){
            req.headers.Authorization= `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
        }
    
        return req;
    } catch (error) {
       console.log(error.message);   
    }
   
})

// const url='/posts';


export const fetchPosts= (page) => API.get(`/posts?page=${page}`);
export const getPost= (id) => API.get(`/posts/${id}`);
export const fetchPostBySearch=(searchQuery) => API.get(`/posts/posts/search?searchQuery=${searchQuery.titleSearch || 'none'}&tags=${searchQuery.tagSearch}`);
export const CreatePost = (newPost) => API.post("/posts", newPost)
export const updatedPost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletedPost = (id)=> API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const commentPost=(comment, id)=> API.post(`/posts/${id}/commentPost`, {comment});


export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
