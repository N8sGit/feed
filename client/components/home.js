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
import About from './about'

class  Home extends React.Component{

  componentDidMount = () => {
    axios.get('/get')
    .then(res => {
      console.log(res, 'response')
        store.dispatch(getAllPosts(res.data.info, res.data.categories))
    })
    .catch(err => console.log(err))
   }

   render(){
    const {posts, categories} = this.props
     let postsDisplay = posts.filter((post, index) => {
      if (categories[index].tags.length){
        post.tags = categories[index].tags
        return post
      }
    })
    let sideBarCats = postsDisplay.map(value => {return value.tags})
    sideBarCats = [... new Set([].concat(...sideBarCats))]
    let htmlText = postsDisplay.map(post => { return {__html: post.content}}).reverse()
    return (
    <div>
      <div id="sidebar-container">
      <h1>Nathan Anecone</h1>
      <About />
      <Sidebar sideBarCats={sideBarCats} />
      </div>

     <div className="posts-container">

          <div className="posts">
          {postsDisplay.reverse().map(function(post, index){
            return (
            <div className="post">
                <div>
                  <Link className="title-link" to={`/postView/${post.id}`}>{<h1 className="title">{post.title}</h1>}</Link> </div>
                  { post.image ? <img src ={post.image} /> : null}
                  <ReadMore  children = {<div className="post-text" dangerouslySetInnerHTML={htmlText[index]} />} />

                  <div className="post-data">
                  <p>{formatDate(post.createdAt)}</p>
                            <ul className="post-data-list">
                              {
                                post.tags.map(function(category){
                                        let categoryLink = category.slice(1)
                                      return <div key={post.id}> <Link className="linktext" to={`/categoryView/${categoryLink}`}> {category} </Link> </div>
                                })
                              }
                            </ul>
                </div>
            </div>
            )
          }
        )}
        </div>
    </div>

    <footer>
          <p>Site by Nathan Anecone </p>
    </footer>
  </div>
  )
  }
}

const mapState = (state) => {
  return {
    posts: state.post.allPosts,
    categories: state.post.allCategories
  }
}

export default connect(mapState)(Home)

