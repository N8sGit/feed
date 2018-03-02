import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {getCategoryPosts} from '.././store/post.js'
import store from '.././store'
import {formatDate} from '../helperFunctions'

class CategoryView extends React.Component{

    componentDidMount(){
        axios.get(`/getByCat/${this.props.categoryId.name}`)
      .then(res => {
          store.dispatch(getCategoryPosts(res.data.info, res.data.categories))
      })
      .catch(err => console.log(err))
    }
      
   render(){
       let postsDisplay = this.props.posts
       let categoryDisplay = this.props.categories
       console.log(categoryDisplay, 'categoryDisplay in catview')
    return (
        <div>
        {!postsDisplay.length ? <p>There are no posts here yet, but there will be soon!</p> :
            postsDisplay.map(function(post, index){
                return (
                    <div key={post.id}>
                        <h1>{post.title}</h1>
                        <p>{post.content}</p>
                        <p>{formatDate(post.createdAt)}</p>
                        <div id="navcontainer">
                            <ul id="navlist">
                            {categoryDisplay[index].tags.map(function(category){
                                return <li key={post.id}>{category}</li>
                            })}
                            </ul>
                        </div>
                    </div>
                )
            })
        }
        </div>
        )
    }

}

const mapStatetoProps = (state, ownProps) => {
    return {
        posts: state.post.categoryPosts,
        categoryId: ownProps.match.params,
        categories: state.post.allCategories
    }
}


export default connect(mapStatetoProps)(CategoryView)
