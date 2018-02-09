import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {getCategoryPosts, getAllCategories} from '.././store/post.js'
import store from '.././store'

class CategoryView extends React.Component{

    componentDidMount(){
        axios.get(`/getByCat/${this.props.categoryId.name}`)
      .then(res => {
          store.dispatch(getCategoryPosts(res.data.info, res.data.categories))
      })
      .catch(err => console.log(err))
    }

    formatDate(time){
        let yearMonthDate = time.slice(0, time.indexOf('T'))
        let year = yearMonthDate.slice(0,4)
        let month = yearMonthDate.slice(5, 7)
        let date = yearMonthDate.slice(8)
        let months = { '01': 'Jan', '02': 'Feb', '03': 'Mar', '04' : 'Apr', '05': 'May', '06' :'June', '07': 'July','08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'}
        return `Published on ${months[month]} ${date}, ${year}`
     }

   render(){
       console.log(this.props.posts, 'hello!>!>>!>!>')
       let postsDisplay = this.props.posts
       let categoryDisplay = this.props.categories
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
