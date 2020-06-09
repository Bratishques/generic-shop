import React from 'react';
import {connect} from "react-redux"

let instances = []

let register = (comp) => instances.push(comp)
let unregister = (comp) => instances.splice(instances.indexOf(comp),1)

let historyPush = (path) => {
    window.history.pushState({},null,path)
    instances.forEach(instance => instance.forceUpdate())
  }
  
  let historyReplace = (path) => {
    window.history.replaceState({},null,path)
    instances.forEach(instance => instance.forceUpdate())
  }

const matchPath = (pathname, options) => {
    const { exact = false, path } = options
  
    if (!path) {
      return {
        path: null,
        url: pathname,
        isExact: true
      }
    }
  
    const match = new RegExp(`^${path}`).exec(pathname)
  
    if (!match)
      return null
  
    const url = match[0]
    const isExact = pathname === url
  
    if (exact && !isExact)
      return null
  
    return {
      path,
      url,
      isExact,
    }
  }

export class Route extends React.Component {

   componentWillMount() {
       window.addEventListener("popstate",() => this.forceUpdate())
       register(this)
       
   }

   componentWillUnmount() {
        window.removeEventListener("popstate",() => this.forceUpdate())
        unregister(this)
   }
    
    render() {
        const {path, exact,component} = this.props

        const match =  matchPath(window.location.pathname, {path, exact})

        if (!match) return null

         return (
            React.createElement(component, {match})
        )
    }
}

 class ListPoint extends React.Component {
    constructor(props) {
      super(props)
    }
  
    handleClick(e){
      e.preventDefault()
      this.props.replace ? historyReplace(this.props.link) : historyPush(this.props.link)
    }
    render() {
    return (
      <a className = "list-point" href={this.props.link} onClick={this.handleClick.bind(this)}>{this.props.name}
      {this.props.name === "Cart" ? this.props.count : null}
      </a>
    )
  }
  }

  const mapStateToProps = (state) =>{
    return {count: state.count}

  }

  export default connect(mapStateToProps) (ListPoint)

 