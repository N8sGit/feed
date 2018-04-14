import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getAllPosts} from '.././store/post.js'
import store from '.././store'
import axios from 'axios'
import {Sidebar} from '../components'
import {formatDate} from '../helperFunctions'
import ReadMore from './readMore'
import {Link} from 'react-router-dom'
import * as data from './checkboxConstants'
import About from './about'
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
    let categoryDisplay = categories.map((item) => {
     item.tags = [...new Set(item.tags)];
      return item
    }).reverse()
    let htmlText = posts.map(post => { return {__html: post.content}}).reverse()
    return (
    <div>
      <div id="sidebar-container">
      <h1>Nathan Anecone</h1>
      <Sidebar />
      </div>

     <div className="posts-container">
     <p id="about-me"> I'm a software developer and writer. I'm interested in the software industry, programming best practices, web technologies, internet studies, digital trends, neuroscience, and related interests. </p>

          <div className="posts">
          {posts.reverse().map(function(post, index){
            return (<div className="post" key={post.id}>
             <div> <Link className="title-link" to={`/postView/${post.id}`}>{<h1 className="title">{post.title}</h1>}</Link> </div>
              <ReadMore  children = {<div className="post-text" dangerouslySetInnerHTML={htmlText[index]} />} />

              <div className="post-data">
              <p>{formatDate(post.createdAt)}</p>
                        <ul className="post-data-list">
                          {categoryDisplay.length !== posts.length ? <p>{''}</p> : categoryDisplay[index].tags.map(function(category){
                                    let categoryLink = category.slice(1)
                                    return <div key={post.id}> <Link className="linktext" to={`/categoryView/${categoryLink}`}> {category} </Link> </div>
                                    })
                          }
                                </ul>
                        </div>
              </div>)

          })}
        </div>
    </div>

    <footer>
          <p>Site by Nathan Anecone </p>
    </footer>
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

