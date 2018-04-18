import React from 'react';
import {Link} from 'react-router-dom';
import store from '.././store'
import {getCategory} from '.././store/post.js'
import * as checkboxData from './checkboxConstants.js'
import {cleanUpHeader} from './../helperFunctions'

export const Sidebar = (props) => {
    let display = Object.keys(checkboxData)
    let headers = display.map( header => {
        return cleanUpHeader(header)
    })
    const {sideBarCats} = props 
    let categoriesToShow = sideBarCats.map(category => {return category.slice(1)})
  return (

    <div>
        <div id="sidebar">
        {
            display.map((catergoryName, index) => {
            if (categoriesToShow.includes(display[index])){
                return (
                    <section className="section">
                        <Link className="sidebar-element" to={`/categoryView/${catergoryName}`} onClick ={ () => {store.dispatch(getCategory(catergoryName))} } >
                            {headers[index]}
                        </Link>
                    </section>
                    )
                }
            })
        }
        </div>
    </div>
  )
}
