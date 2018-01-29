import React from 'react';
import {Link} from 'react-router-dom';
import store from '.././store'
import {getCategory} from '.././store/post.js'


  export const Sidebar = () => {
  return (
    <div>
      <section>
        <h4 className="menu-item">
          <Link to="/categoryView/internet" onClick ={ () => {store.dispatch(getCategory('internet'))}}> Internet Culture </Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/categoryView/digital_economics" onClick ={ () => {store.dispatch(getCategory('digital_economics'))}}> Digital Economics </Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/categoryView/technology_and_politics" onClick ={ () => {store.dispatch(getCategory('technology_and_politics'))}}> Politics and Technology</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/categoryView/futurism" onClick ={ () => {store.dispatch(getCategory('futurism'))}}> Society and Technology</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/categoryView/Human_Computer_Interaction" onClick ={ () => {store.dispatch(getCategory('Human_Computer_Interaction'))}}>Human Computer Interaction</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/categoryView/technical posts" onClick ={ () => {store.dispatch(getCategory('technical posts'))}}>Technical posts</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/categoryView/cognitive_science" onClick ={ () => {store.dispatch(getCategory('cognitive_science'))}}>Cognitive Science</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/categoryView/philosophy" onClick ={store.dispatch(getCategory('philosophy'))}>Philosophy</Link>
        </h4>
      </section>
    </div>
  )
}
