import React from 'react';
import {Link} from 'react-router-dom';
import store from '.././store'
import {getCategory} from '.././store/post.js'
import * as data from './checkboxConstants.js'


export const Sidebar = () => {
  return (
    <div>
      <section>
        <h4 className="menu-item">
          <Link to="/categoryView/internet_culture" onClick ={ () => {store.dispatch(getCategory(data.internet_culture))}}> Internet Culture </Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/categoryView/digital_economics" onClick ={ () => {store.dispatch(getCategory(data.digital_economics))}}> Digital Economics </Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/categoryView/technology_and_politics" onClick ={ () => {store.dispatch(getCategory(data.technology_and_politics))}}> Politics and Technology</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/categoryView/futurism" onClick ={ () => {store.dispatch(getCategory(data.futurism))}}> Society and Technology</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/categoryView/human_computer_interaction" onClick ={ () => {store.dispatch(getCategory(data.human_computer_interaction))}}>Human Computer Interaction</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/categoryView/technical_posts" onClick ={ () => {store.dispatch(getCategory(data.technical_posts))}}>Technical posts</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/categoryView/cognitive_science" onClick ={ () => {store.dispatch(getCategory(data.cognitive_science))}}>Cognitive Science</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/categoryView/philosophy" onClick ={store.dispatch(getCategory(data.philosophy))}>Philosophy</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/categoryView/software_industry" onClick ={store.dispatch(getCategory(data.software_industry))}>Software Industry</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/categoryView/miscellaneous_musings" onClick ={store.dispatch(getCategory(data.misc))}>Miscellaneous</Link>
        </h4>
      </section>
    </div>
  )
}
