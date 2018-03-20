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
    <div id="sidebar-container">
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

{/* <section className="section">
<Link to="/categoryView/internet_culture" onClick ={ () => {store.dispatch(getCategory(checkboxData.internet_culture))}}> Internet Culture </Link>
</section>
<section className="section">
<Link to="/categoryView/digital_economics" onClick ={ () => {store.dispatch(getCategory(checkboxData.digital_economics))}}> Digital Economics </Link>
</section>
<section className="section">
<Link to="/categoryView/technology_and_politics" onClick ={ () => {store.dispatch(getCategory(checkboxData.technology_and_politics))}}> Politics and Technology</Link>
</section>
<section className="section">
<Link to="/categoryView/futurism" onClick ={ () => {store.dispatch(getCategory(checkboxData.futurism))}}> Society and Technology</Link>
</section>
<section className="section">
<Link to="/categoryView/human_computer_interaction" onClick ={ () => {store.dispatch(getCategory(checkboxData.human_computer_interaction))}}>Human Computer Interaction</Link>
</section>
<section className="section">
<Link to="/categoryView/technical_posts" onClick ={ () => {store.dispatch(getCategory(checkboxData.technical_posts))}}>Technical posts</Link>
</section>
<section className="section">
<Link to="/categoryView/cognitive_science" onClick ={ () => {store.dispatch(getCategory(checkboxData.cognitive_science))}}>Cognitive Science</Link>
</section>
<section className="section">
<Link to="/categoryView/philosophy" onClick ={store.dispatch(getCategory(checkboxData.philosophy))}>Philosophy</Link>
</section>
<section className="section">
<Link to="/categoryView/software_industry" onClick ={store.dispatch(getCategory(checkboxData.software_industry))}>Software Industry</Link>
</section>
<section className="section">
<Link to="/categoryView/miscellaneous_musings" onClick ={store.dispatch(getCategory(checkboxData.misc))}>Miscellaneous</Link>
</section> */}
