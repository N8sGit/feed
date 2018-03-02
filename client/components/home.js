import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getAllPosts} from '.././store/post.js'
import store from '.././store'
import axios from 'axios'
import {Sidebar} from '../components'
import {formatDate} from '../helperFunctions'
/**
 * COMPONENT
 */

class  Home extends React.Component{
  
  componentDidMount = () => {
    axios.get('/get')
    .then(res => {
        store.dispatch(getAllPosts(res.data.info, res.data.categories))
    })
    .catch(err => console.log(err))
   }
  
   render(){
    const {posts, categories} = this.props
    let categoryDisplay = categories
  console.log(categoryDisplay, 'categoryDisplay')
  console.log(posts, 'posts')

  return (
    <div>
      <Sidebar />
      {posts.map(function(post, index){
        return (<div key={post.id}>
          <h1 >{post.title}</h1>
          <p>{post.content}</p>
          <p>{formatDate(post.createdAt)}</p>
          <div id="navcontainer">
                            <ul id="navlist">
                            {categoryDisplay.length !== posts.length ? <p>{''}</p> : categoryDisplay[index].tags.map(function(category){
                                return <li key={post.id}>{category}</li>
                            })}
                            </ul>
                        </div>
          </div>)
      })}
    </div>
  )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    posts: state.post.allPosts,
    categories: state.post.allCategories
  }
}

export default connect(mapState)(Home)

