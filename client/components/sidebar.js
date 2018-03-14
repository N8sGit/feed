import React from 'react';
import {Link} from 'react-router-dom';
import store from '.././store'
import {getCategory} from '.././store/post.js'
import * as data from './checkboxConstants.js'


export const Sidebar = () => {
  return (
    <div id="sidebar-container">
      <div id='sidebar'>
        <section className="section">
            <Link to="/categoryView/internet_culture" onClick ={ () => {store.dispatch(getCategory(data.internet_culture))}}> Internet Culture </Link>
        </section>
        <section className="section">
            <Link to="/categoryView/digital_economics" onClick ={ () => {store.dispatch(getCategory(data.digital_economics))}}> Digital Economics </Link>
        </section>
        <section className="section">
            <Link to="/categoryView/technology_and_politics" onClick ={ () => {store.dispatch(getCategory(data.technology_and_politics))}}> Politics and Technology</Link>
        </section>
        <section className="section">
            <Link to="/categoryView/futurism" onClick ={ () => {store.dispatch(getCategory(data.futurism))}}> Society and Technology</Link>
        </section>
        <section className="section">
            <Link to="/categoryView/human_computer_interaction" onClick ={ () => {store.dispatch(getCategory(data.human_computer_interaction))}}>Human Computer Interaction</Link>
        </section>
        <section className="section">
            <Link to="/categoryView/technical_posts" onClick ={ () => {store.dispatch(getCategory(data.technical_posts))}}>Technical posts</Link>
        </section>
        <section className="section">
            <Link to="/categoryView/cognitive_science" onClick ={ () => {store.dispatch(getCategory(data.cognitive_science))}}>Cognitive Science</Link>
        </section>
        <section className="section">
            <Link to="/categoryView/philosophy" onClick ={store.dispatch(getCategory(data.philosophy))}>Philosophy</Link>
        </section>
        <section className="section">
            <Link to="/categoryView/software_industry" onClick ={store.dispatch(getCategory(data.software_industry))}>Software Industry</Link>
        </section>
        <section className="section">
            <Link to="/categoryView/miscellaneous_musings" onClick ={store.dispatch(getCategory(data.misc))}>Miscellaneous</Link>
        </section>
      </div>
    </div>
  )
}
