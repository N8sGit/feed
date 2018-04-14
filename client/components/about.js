import React from 'react';
import Fade from 'react-reveal/Fade';
import { setTimeout } from 'timers';

class FadeExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ show: !this.state.show });
  }
  render() {
    return (
      <div id='about'>
        <div
          onClick={this.handleClick}
        >
           About
        </div>
        {this.state.show ? <Fade duration={1750} onReveal={ () => { return this.state.show ? setTimeout(this.handleClick, 17500) : null}} left when={this.state.show}>
          <p>I'm a software developer and writer. I'm interested in the software industry, programming best practices, web technologies, internet studies, digital trends, neuroscience, and related interests. </p>
        </Fade> : null}
       
      </div>
    );
  }
}

export default FadeExample;
