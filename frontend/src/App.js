import React, { Component } from 'react';
import './App.css';
import './components/Login';
import Login from "./components/Login";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login />
      </div>
    );
  }
}

export default App;
