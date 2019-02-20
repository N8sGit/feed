import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */

class Main extends React.Component{

  constructor(props){
    super(props)
    this.state = {loading: true}
  }

  componentDidMount(){
    setTimeout(() => this.setState({ loading: false }), 1000);
  }

  render(){
    const {loading} = this.state
    let {children } = this.props
    return (
      loading ?  <div id="loading" style={{opacity: !loading ? 0 : 1, zIndex: !loading ? '-100' : '100'}}>
        <i className="fa fa-spinner fa-pulse" />
      </div> :  
      <div id="top">
         
          <div id="root">
            {children}
          </div>
     </div>)
  }
}


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect()(Main))

