import React from 'react'
import Truncate from 'react-truncate'
import * as checkboxData from './checkboxConstants'
import axios from 'axios'
import store from '.././store'
import {getCategories} from '.././store/post.js'

export default class adminBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            displayData: {}
        }
    }

    componentDidMount = () => {
        let display = {}
        for (let prop in checkboxData){
            if (prop){
                axios.get(`getByCat/${prop}`)
                    .then( res => {
                        console.log(res, 'res')
                       display[prop] = res.data.info
                    })
                    .then(() => {
                        this.setState({displayData: display})
                    })
            }
        }
    }

    render(){
        let categoryNames = Object.keys(checkboxData)
        let display = this.state.displayData
        return  (
    <div id="admin-sidebar">
        <p> POSTS </p>
    {
        categoryNames.map((name) => {
                    return (
                <section className="section">
                        <div id='admin-headers'>{name}</div>
                {   !display[name] ? null : display[name].map((post) =>
                        { return (
                            <li onClick = { () => {
                                    axios.get(`getById/${post.id}`)
                                    .then(function(res){
                                        store.dispatch(getCategories(res.data.allCategories))
                                    })
                                    this.props.setSidebar(post)
                                }}>
                                    {post.title}
                            </li>)
                        })
                }
               </section>
                )
       }
        )
    }
    </div>
    )
}

}

/// basic idea looks like this
// # CAEGORYNAME: (drop down view)
            // Posts to click

