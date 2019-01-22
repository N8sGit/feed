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
        {this.state.show ? <Slide top duration={1750}  left when={this.state.show}>
          <p>I'm a software developer and writer. Here you'll find technical writings, musings on apps and digital trends, commentary on directions in the software industry, and more besides! </p>
        </Slide> : null}     
      </div>
    );
  }
}

export default About;
// onReveal={ () => { return this.state.show ? setTimeout(this.handleClick, 17500) : null}}