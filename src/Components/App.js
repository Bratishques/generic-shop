import React from 'react';
import './App.css';
import ListPoint from "./Route"






function App() {
  return (
    <div className ="header">
      <div className = "list">
        <ListPoint link="/" name = "Index"/>
        <ListPoint link="/about" name = "Browse"/>
        <ListPoint link="/cart" name = "Cart"></ListPoint>
      </div>
    </div>
  );
}

export default App;
