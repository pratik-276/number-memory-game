import React, { Component } from 'react';

class Home extends Component {
    state = {  }
    render() { 
        return (
            <div className="container valign-wrapper" style={{
                width: "90%",
                minHeight: "80vh"
            }}>
                <div class="row center">
                    <h1>Ready for a Challenge?</h1>
                    <button class="btn-large waves-effect waves-blue white red-text">Play Game</button>
                </div>
            </div>
        );
    }
}
 
export default Home;