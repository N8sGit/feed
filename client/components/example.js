// class App extends React.Component {
//     state = {
//       loading: true
//     };
  
//     componentDidMount() {
//       setTimeout(() => this.setState({ loading: false }), 1500); // simulates an async action, and hides the spinner
//     }
    
//     render() {
//       const { loading } = this.state;
      
//       if(loading) { // if your component doesn't have to wait for an async action, remove this block 
//         return null; // render null when app is not ready
//       }
      
//       return (
//         <div>I'm the app</div>
//       ); 
//     }
//   }
  
//   ReactDOM.render(
//     <App />,
//     document.getElementById('app')
//   );
//   .loader:empty {
//     position: absolute;
//     top: calc(50% - 4em);
//     left: calc(50% - 4em);
//     width: 6em;
//     height: 6em;
//     border: 1.1em solid rgba(0, 0, 0, 0.2);
//     border-left: 1.1em solid #000000;
//     border-radius: 50%;
//     animation: load8 1.1s infinite linear;
//   }
  
//   @keyframes load8 {
//     0% {
//       transform: rotate(0deg);
//     }
//     100% {
//       transform: rotate(360deg);
//     }
//   }
//   <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.1/react.js"></script>
//   <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.1/react-dom.js"></script>
  
//   <div id="app" class="loader"></div> <!-- add class loader to container -->