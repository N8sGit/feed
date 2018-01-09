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

const addPost = post => ({type: ADD_POST, text: post})
const getPost = post => ({type: GET_POST, selected: post})

//thunk creators
export const add = (post) =>
    dispatch =>
     axios.post('/post', {text: post})
      .then(res => {
          console.log(res)
          console.log('this was entered!')
          dispatch(addPost(res.data.text))
      })
      .catch(dispatchAddErr => console.error(dispatchAddErr))

export const get = (post) =>
      dispatch =>
       axios.get('/get', {post})
        .then(res => {
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
