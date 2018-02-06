import axios from 'axios'
//action type

const ADD_POST = 'ADD_POST'
const GET_POSTS = 'GET_POSTS'
const GET_CATEGORY = 'GET_CATEGORY'
const GET_POSTS_BY_CAT = 'GET_POSTS_BY_CAT'
const GET_CATS_BY_ID = 'GET_CATS_BY_ID'
//initial state

const initialState = {
    text: '',
    title: '',
    selectedCategory: '',
    allPosts: [],
    categoryPosts: [],
    allTitles: [],
    allCategories: []
}
//action creator

const addPost = (post, title) => ({type: ADD_POST, text: post, title: title})
export const getAllPosts = posts => ({type: GET_POSTS, allPosts: posts})
export const getCategory = category => ({type: GET_CATEGORY, selectedCategory: category })
export const getCategoryPosts = (posts, categories) => ({type: GET_POSTS_BY_CAT, categoryPosts: posts, allCategories: categories})
//export const getAllCategories = categories => ({type: GET_CATS_BY_ID, allCategories: categories})

//thunk creators
export const add = (post, title) =>
    dispatch =>
     axios.post('/post', {text: post, title: title})
      .then(res => {
          dispatch(addPost(res.data.content, res.data.title))
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
             newState.title = action.title;
             break;
        case GET_POSTS:
             newState.allPosts = action.allPosts;
             newState.allTitles = action.allTitles
             break;
        case GET_CATEGORY:
            newState.selectedCategory = action.selectedCategory;
             break;
        case GET_POSTS_BY_CAT:
        newState.categoryPosts = action.categoryPosts;
        newState.allCategories = action.allCategories;
             break;
        default:
            return state
    }
    return newState
}
