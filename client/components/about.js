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
        <Fade duration={1750} onReveal={ () => { setTimeout(this.handleClick, 15000)}} left when={this.state.show}>
          <p>I'm a software developer and writer. This blog houses my thoughts on various attributes of the software industry, internet studies,
              technical matters, technological trends, neuroscience, and other interests. It also serves as a portfolio for my programming projects. </p>
        </Fade>
       
      </div>
    );
  }
}

export default FadeExample;
