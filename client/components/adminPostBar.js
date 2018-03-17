import React from 'react'


class adminBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    
    render(){
        return (
        <div id="adminSidebar"> 
        <section className="section">
         <div > Internet Culture </div>
        </section>
        <section className="section">
            <div> Digital Economics </div>
        </section>
        <section className="section">
            <div > Politics and Technology</div>
        </section>
        <section className="section">
            <div> Society and Technology</div>
        </section>
        <section className="section">
            <div>Human Computer Interaction</div>
        </section>
        <section className="section">
            <div >Technical posts</div>
        </section>
        <section className="section">
            <div  >Cognitive Science</div>
        </section>
        <section className="section">
            <div> Philosophy</div>
        </section>
        <section className="section">
            <div>Software Industry</div>
        </section>
        <section className="section">
            <div>Miscellaneous</div>
        </section>
     </div>
        )
    }

}

/// basic idea looks like this
// # CAEGORYNAME: (drop down view)
            // Posts to click 
            


