import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

const CategoryView = (props) => {
 console.log(props)
    return (
        <div>
            <p> Hello world </p>
        </div>
    )
}

const mapStatetoProps = (state) => {
    console.log('kasdk')
    return {
        category: state.post.selectedCategory
    }
}

const mapDispatch = (dispatch) => {
    // return ( dispatch =>
    //  axios.get(`/getByCat/:${this.props.category}`)
    //   .then(res => {
    //       dispatch()
    //   })
    //   .catch(err => console.log(err)))
}

export default connect(mapStatetoProps, mapDispatch)(CategoryView)
