import React from 'react'
import Truncate from 'react-truncate'
import * as checkboxData from './checkboxConstants'
import axios from 'axios'


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
        console.log(this.state.displayData, 'displayData')
        let categoryNames = Object.keys(checkboxData)
        let display = this.state.displayData
        console.log(categoryNames, 'cat names')
        return (
    <div>
    {
        categoryNames.map((value) => {
         return (
            <section className="section">
                <div>{value}</div>
            {!display[value] ? null : display[value].map((post) => {
                return <li> {post.title} </li>
            })
        }
             </section>
            )
        }
        )
    }
</div>)
}

}

/// basic idea looks like this
// # CAEGORYNAME: (drop down view)
            // Posts to click

