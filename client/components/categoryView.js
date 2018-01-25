import React from 'react'
import {connect} from 'react-redux'

export const CategoryView = (props) => {
    console.log(props, 'props')
    let {posts, category} = props
    console.log(props.category)
    return (
        <div>
            <p> Hello world </p>
        </div>
    )
}

const mapStatetoProps = (state) => {
    return {
        category: state.post.selectedCategory
    }
}

const mapDispatch = (dispatch) => {
    return ( dispatch =>
     axios.get(`/getByCat/:${this.props.category}`)
      .then(res => {
          dispatch()
      })
      .catch(err => console.log(err)))
     }

export default connect(mapStatetoProps, mapDispatch)(CategoryView)
