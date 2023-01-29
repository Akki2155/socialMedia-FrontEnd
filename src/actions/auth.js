import * as api from "../api/index.js";


export const  signIn = (formData, navigate) => async(dispatch) =>{

    try {
        //login user
        dispatch({type: "START_LOADING"});
        const { data }= await api.signIn(formData);
        console.log(data.result);
        dispatch({type:"AUTH", data})
        dispatch({type: "END_LOADING"}); 
        navigate("/")
    } catch (error) {
          console.log(error);
    }

}


export const signUp = (formData, navigate) => async (dispatch) =>{
     
    try {
        //sign up user
        dispatch({type: "START_LOADING"});
        const { data }= await api.signUp(formData);
        dispatch({type:"AUTH", data})
        dispatch({type: "END_LOADING"}); 
        navigate("/")
    } catch (error) {
        console.log("message", error)
    }
}