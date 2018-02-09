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
  console.log(props.posts, 'hello')
  function formatDate(time){
    let yearMonthDate = time.slice(0, time.indexOf('T'))
    let year = yearMonthDate.slice(0,4)
    let month = yearMonthDate.slice(5, 7)
    let date = yearMonthDate.slice(8)
    let months = { '01': 'Jan', '02': 'Feb', '03': 'Mar', '04' : 'Apr', '05': 'May', '06' :'June', '07': 'July','08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'}
    return `Published on ${months[month]} ${date}, ${year}`
 }
  return (
    <div>
      <Sidebar />
      {posts.map(function(value){
        return (<div key={value.id}>
          <h1 >{value.title}</h1>
          <p>{value.content}</p>
          <p>{formatDate(value.createdAt)}</p>
          </div>)
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

