import React from 'react';
import {Link} from 'react-router-dom';
import store from '.././store'
import {getCategory} from '.././store/post.js'
import * as checkboxData from './checkboxConstants.js'
import {cleanUpHeader} from './../helperFunctions'

export const Sidebar = () => {
    let display = Object.keys(checkboxData)
    let headers = display.map( header => {
        return cleanUpHeader(header)
    })


  return (
     
    <div>
        <div id="sidebar">
        {
            display.map((catergoryName, index) => {
                return (
                    <section className="section">
                        <Link to={`/categoryView/${catergoryName}`} onClick ={ () => {store.dispatch(getCategory(catergoryName))} } >
                            {headers[index]}
                        </Link>
                    </section>
                )
            })
        }
        </div>
    </div>
  )
}
