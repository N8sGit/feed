import React from 'react'
import axios from 'axios'


export default class  Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      title: '',
      url: ''
  };
}

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/search', {query: this.state.value.trim()}).then((res) => {
      this.setState({title: res.data.title, url: res.data.url})
    })
  }

  render() {
    let title = this.state.title
    let url = this.state.url
    return (
    <div>
      <div id="home-container">
        <div id="child">
          <p> Search </p>
        <form onSubmit={this.handleSubmit}>
          <input id="input" type="text" value={this.state.value} onChange={this.handleChange} />
          <input id="submit" type="submit" value="Submit" />
        </form>
      </div>
    </div>
    <div id="info-display">
            <p>{title}</p>
            <a href={url} > {url} </a>
    </div>
    </div>
  )
}
}
