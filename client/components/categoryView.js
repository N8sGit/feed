import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {getCategoryPosts} from '.././store/post.js'
import store from '.././store'

class CategoryView extends React.Component{
    
    componentDidMount(){
        axios.get(`/getByCat/${this.props.categoryId.name}`)
      .then(res => {
          store.dispatch(getCategoryPosts(res.data.info))
      })
      .catch(err => console.log(err))
    }

   render(){
       console.log(this.props)
       let postsDisplay = this.props.posts
    return (
        <div>
        {postsDisplay.map(function(post){
                return(
                    <div key={post.id}>
                        <h1>{post.title}</h1>
                        <p>{post.content}</p>
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
        category: state.post.selectedCategory,
        posts: state.post.categoryPosts,
        categoryId: ownProps.match.params
    }
}


export default connect(mapStatetoProps)(CategoryView)
