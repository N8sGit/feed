import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getOnePost} from '.././store/post'
import {formatDate} from '../helperFunctions'
import axios from 'axios'

class PostView extends React.Component {
    componentDidMount = () => {
       let id = this.props.match.params.id
        this.props.getOne(id)
   }
  render(){
    console.log(this.props, 'props')
    let post = this.props.post
    return (
         <div>
        <nav id="navbar">
            <div className="nav-links">
              <Link to="/">Home</Link>
            </div>
        </nav>

        <div>
            <h1>{post.title}</h1>
            <div className="posts">{post.content}</div>
        </div>
        <p>{formatDate(post.createdAt)}</p>
        </div>
        )
    }
}

const mapState = (state) => {
    return {
        post: state.post.onePost
    }
}

const mapDispatch = (dispatch) => {
return (
        {
            getOne: (id) => {
                axios.get(`/getPostById/${id}`)
                    .then(res => {
                        dispatch(getOnePost(res.data.info))
                }   )
            }
        }
    )

}


export default connect(mapState, mapDispatch)(PostView)
