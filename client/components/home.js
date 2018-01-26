import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getAllPosts} from '.././store/post.js'
import axios from 'axios'
import {Sidebar} from '../components'
/**
 * COMPONENT
 */
export const Home = (props) => {
  const {posts} = props


  return (
    <div>
      <Sidebar />
      <h3>Eventually posts will go here</h3>
      {posts.map(function(value){
        return (<div key={value.id}>
          <h1 >{value.title}</h1>
          <p>{value.content}</p> </div>)
      })}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    posts: state.post.allPosts
  }
}

const mapDispatch = (dispatch) => {
  return ( dispatch =>
   axios.get('/get')
    .then(res => {
        dispatch(getAllPosts(res.data.info))
    })
    .catch(err => console.log(err)))
   }

export default connect(mapState, mapDispatch)(Home)

