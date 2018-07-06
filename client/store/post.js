import axios from 'axios'
//action type

const ADD_POST = 'ADD_POST'
const GET_POSTS = 'GET_POSTS'
const GET_CATEGORY = 'GET_CATEGORY'
const GET_CATEGORIES = 'GET_CATEGORIES'
const GET_POSTS_BY_CAT = 'GET_POSTS_BY_CAT'
const GET_ONE_POST = 'GET_ONE_POST'
//initial state

const initialState = {
    text: '',
    title: '',
    image: '',
    selectedCategory: '',
    allPosts: [],
    categoryPosts: [],
    allTitles: [],
    allCategories: [],
    onePost: {}
}
//action creator

const addPost = (post, title, image) => ({type: ADD_POST, text: post, title: title, image: image})
export const getOnePost = (post) => ({type: GET_ONE_POST, onePost: post})
export const getAllPosts = (posts, categories) => ({type: GET_POSTS, allPosts: posts, allCategories: categories})
export const getCategory = category => ({type: GET_CATEGORY, selectedCategory: category })
export const getCategories = categories => ({type: GET_CATEGORIES, allCategories: categories})
export const getCategoryPosts = (posts, categories) => ({type: GET_POSTS_BY_CAT, categoryPosts: posts, allCategories: categories})

//thunk creators
export const add = (post, title, image) =>
    dispatch =>
     axios.post('/post', {text: post, title: title, image: image})
      .then(res => {
          dispatch(addPost(res.data.content, res.data.title, res.data.image))
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
             newState.image = action.image
             break;
        case GET_POSTS:
             newState.allCategories = action.allCategories;
             newState.allPosts = action.allPosts;
             newState.allTitles = action.allTitles;
             break;
        case GET_CATEGORY:
            newState.selectedCategory = action.selectedCategory;
             break;
        case GET_CATEGORIES:
            newState.allCategories = action.allCategories;
            break;
        case GET_POSTS_BY_CAT:
            newState.categoryPosts = action.categoryPosts;
            newState.allCategories = action.allCategories;
             break;
        case GET_ONE_POST:
            newState.onePost = action.onePost
            break;
        default:
            return state
    }
    return newState
}
