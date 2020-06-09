import React from 'react';


let matches = []
var parser = new DOMParser();


export class Parse extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        input: "",
      }
    }

  handleInput(e) {
      this.setState({
        input: e.target.value
      })
    }
    
   handleUrl() {
    let cont = ""
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = this.state.input; // site that doesn’t send Access-Control-*
    fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
    .then(response => response.text())
    .then(contents => {
      var doc = parser.parseFromString(contents, "text/html");
    console.log(doc)
    })
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))


   
    }
   
    render() {
      
      
      return (<div>        <input onChange={this.handleInput.bind(this)} value={this.state.input}/>        
<button className = "butt" onClick={this.handleUrl.bind(this)}>
  Parse links</button>
        </div>)
    }
}
