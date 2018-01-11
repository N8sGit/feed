import axios from 'axios'
//action type

const ADD_POST = 'ADD_POST'
const GET_POSTS = 'GET_POSTS'
//initial state

const initialState = {
    text: '',
    allPosts: []
}
//action creator

const addPost = post => ({type: ADD_POST, text: post})
const getAllPosts = response => ({type: GET_POSTS, allPosts: response})

//thunk creators
export const add = (post) =>
    dispatch =>
     axios.post('/post', {text: post})
      .then(res => {
          dispatch(addPost(res.data.text))
      })
      .catch(dispatchAddErr => console.error(dispatchAddErr))

export const get = () =>
      dispatch =>
       axios.get('/get')
        .then(res => {
            dispatch(getAllPosts(res.data))
        })
        .catch(err => console.log(err))

//reducer

export default function (state = initialState, action){
     const newState = Object.assign({}, state);
    switch (action.type){
        case ADD_POST:
             newState.text = action.text;
             break;
        case GET_POSTS:
             newState.allPosts = [...action.allPosts];
             break;
        default:
            return state
    }
    return newState
}
