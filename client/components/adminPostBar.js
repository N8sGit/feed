import React from 'react'
import * as checkboxData from './checkboxConstants'
import axios from 'axios'
import store from '.././store'
import {getCategories} from '.././store/post.js'

export default class adminBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            displayData: {},
            uncategorized: []
        }
    }

    componentDidMount = () => {
    let display = {}
        for (let prop in checkboxData){
            if (prop){
                axios.get(`getByCat/${prop}`)
                    .then( res => {
                       display[prop] = res.data.info
                    })
                    .then(() => {
                        this.setState({displayData: display})
                    })
            }
        }
    let uncategorized = [];
        axios.get('/get').then(res => { 
            uncategorized = res.data.categories.reduce((acc, element) => {
                if (element && !element.tags.length) {
                  acc.push({ title: element.title, id: element.id, content: element.content, selected: element});
                }
                return acc;
              }, [])
        })
            .then(() => {
                this.setState({uncategorized: uncategorized})
            })
    }

    render(){
        let categoryNames = Object.keys(checkboxData)
        let display = this.state.displayData
        let uncategorized = this.state.uncategorized
        return  (

    <div id="admin-sidebar">
        <p> POSTS </p>
        <section className="section">
            <div id="admin-headers"> Uncategorized </div>
            {!uncategorized.length ? null : uncategorized.map((post) => {
                return (
                    <li onClick = { () => {
                            axios.get(`getById/${post.id}`)
                            .then(function(res){
                                store.dispatch(getCategories(res.data.allCategories))
                            })
                            this.props.setSidebar(post)
                        }}>
                            {post.title || ''}
                    </li>)
                })
            }
        </section>
    {
        categoryNames.map((name) => {
            return (
                <section className="section">
                        <div id="admin-headers">{name}</div>
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
