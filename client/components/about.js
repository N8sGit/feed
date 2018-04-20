import React from 'react';
import Slide from 'react-reveal/Slide';
import { setTimeout } from 'timers';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: true };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ show: !this.state.show });
  }
  render() {
    return (
      <div>
        <div
          onClick={this.handleClick}
        >
           About
        </div>
        {this.state.show ? <Slide top duration={1750}  left when={this.state.show}>
          <p>I'm a software developer and writer. I'm interested in making cool things, the software industry, programming best practices, web technologies, the internet, digital trends, neuroscience, and related interests. </p>
        </Slide> : null}     
      </div>
    );
  }
}

export default About;
// onReveal={ () => { return this.state.show ? setTimeout(this.handleClick, 17500) : null}}