import React from 'react'
import axios from 'axios'
import {Sidebar} from '../components'
import TweetEmbed from 'react-tweet-embed'

export default class  Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: 'realdonaldtrump',
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
    console.log(this.state.value)
    event.preventDefault();
    axios.post('/twitter', {query: this.state.value.trim()})
    .then((res) => {
    console.log(res)
     this.setState({tweets: res.data})
    })
  }

  render() {
   let tweets = this.state.tweets;
    return (
    <div>
      <div id="sidebar-container">
      <div id="home-container">
        <div id="child">
          <p> Search for tweets by screenname!</p>
        <form onSubmit={this.handleSubmit}>
          <input id="input" type="text" value={this.state.value} onChange={this.handleChange} />
          <input id="submit" type="submit" value="Submit" />
        </form>
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
              <div className='post'>
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
{/* <div id="home-container">
        <div id="child">
          <p> Search for tweets by screenname!</p>
        <form onSubmit={this.handleSubmit}>
          <input id="input" type="text" value={this.state.value} onChange={this.handleChange} />
          <input id="submit" type="submit" value="Submit" />
        </form>
</div>

<div className="posts-container">
        {
          tweets.map((value) => {
            return (
              <div className="post">
                <TweetEmbed id={value.id} />
              </div>
            )
          })
        }
      </div>
     </div> */}