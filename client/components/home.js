import React from 'react'
import axios from 'axios'
import {Sidebar} from '../components'
import TweetEmbed from 'react-tweet-embed'
import NumericInput from 'react-numeric-input';
export default class  Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      number: 1,
      tweets: []
  };
}

componentDidUpdate(){
  window.twttr.widgets.load()
}

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/twitter', {query: this.state.value.trim(), number: this.state.number})
    .then((res) => {
     this.setState({tweets: res.data})
    })
  }

  render() {
   let tweets = this.state.tweets;
   console.log(typeof this.state.number, this.state.number)
    return (
    <div>
      <div id="sidebar-container">
      <div id="home-container">
        <div id="child">
          <p> Search for tweets by screenname</p>
        <form onSubmit={this.handleSubmit}>
          <input id="input" type="text" value={this.state.value} onChange={this.handleChange} />
          <input id="submit" type="submit" value="Submit" />
        </form>
        </div>
        <div id="child">
          <p>Select how many</p>
          <NumericInput
          id="number" min={0} max={10} style={{ input: { paddingLeft: '0.0ex', paddingRight: '0.0ex'}}} value={this.state.number}
          onChange={(value) => {
            this.setState({number: value})
          }} />
        </div>
      <Sidebar />
      </div>
  </div>
      <div className="posts-container">
        {
        <div className="posts">
          {
            tweets.map((value) => {
              return (
              <div className="post">
                <TweetEmbed id={value} />
              </div>
              )
            })
          }
       </div>
       }
      </div>
     </div>
    )
  }
}
