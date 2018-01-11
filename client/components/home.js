import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {get} from '.././store/post.js'

export class Home extends React.Component{


  componentDidMount(){
     get()
  }


  render(){
     
    return (
    <div>
      <h3>Eventually posts will go here</h3>
    </div>
  )
  }
}


/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

const mapDispatch = (dispatch) => {
  return {
    get (response){
      console.log(response, 'resposne')
      dispatch(get(response))
    }
  }
}
export default connect(mapState, mapDispatch)(Home)

/**
 * PROP TYPES
 */
Home.propTypes = {
  email: PropTypes.string
}
