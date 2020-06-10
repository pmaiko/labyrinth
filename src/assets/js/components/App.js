import React from 'react';
import { useState, useEffect } from 'react'
import materialize from 'materialize-css';
import Home from  './Home'
import Game from './Game'
import {connect} from "react-redux";

function App (props) {
    useEffect(() => {
        materialize.AutoInit();
    }, []);

    function Greeting() {
        if (props.state.formSubmit === true) {
            return <Game />;
        }
        else {
            return <Home />;
        }
    }

    return (
    <div className="App">
        {Greeting()}
    </div>
  );
}

export default connect(
    state => ({
        state
    }),
)(App);
