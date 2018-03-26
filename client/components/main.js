import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import { log } from 'util';
import { loadavg } from 'os';
/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */

class Main extends React.Component{

  constructor(props){
    super(props)
    this.state = {loaded: false}
  }

  componentWillMount(){

    $(window).on('load', () => {
      this.setState({loaded: true})
    })
  }
  render(){
    let {children, handleClick } = this.props

    return (
      <div id="top">
          <div id="loading" style={{opacity: this.state.loaded ? 0 : 1, zIndex: this.state.loaded ? '-100' : '100'}}>
            <i className="fa fa-spinner fa-pulse" />
        </div>
        <div id="root">

          {children}

        </div>
     </div>)
  }
}

/**
 * CONTAINER
 */


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect()(Main))

/**
 * PROP TYPES
 */

{/* <nav id="navbar">
            <div className="nav-links">
              <Link to="/home">Home</Link>
              <Link to="/admin">Admin</Link>
            </div>
</nav> */}
