import React from 'react';
import {Link} from 'react-router-dom';

  export const Sidebar = () => {

  return (
    <div>
      <section>
        <h4 className="menu-item">
          <Link to="/singleView"> Internet Culture </Link> 
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/singleView"> Digital Economics </Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/singleView"> Politics and Technology</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/singleView"> Society and Technology</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/singleView">Human Computer Interaction</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/singleView">Technical posts</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/singleView">Cognitive Science</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/singleView">Philosophy</Link>
        </h4>
      </section>
    </div>
  )
}
