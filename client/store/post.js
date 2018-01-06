import axios from 'axios'
//action type

const ADD_POST = 'ADD_POST'
const GET_POST = 'GET_POST'
//initial state

const initialState = {
    text: '',
    selected: {}
}
//action creator

const addPost = post => ({type: ADD_POST, post})
const getPost = post => ({type: GET_POST, post})

//thunk crators
export const add = (post) =>
    dispatch =>
     axios.post('/add', {post})
      .then(res => {
          dispatch(addPost(res.data))
      })
      .catch(dispatchAddErr => console.error(dispatchAddErr))

export const get = (post) =>
      dispatch =>
       axios.post('/get', {post})
        .then(res =>{
            dispatch(getPost(res.data))
        })
        .catch(err => console.log(err))

//reducer

export default function (state = initialState, action){
     const newState = Object.assign({}, state);
    switch (action.type){
        case ADD_POST:
             newState.text = action.text;
             break;
        case GET_POST:
             newState.selected = action.selected;
             break;
        default:
            return state
    } 
    return newState   
}