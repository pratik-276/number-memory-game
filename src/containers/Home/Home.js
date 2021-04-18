import React, { Component } from 'react';

class Home extends Component {
    state = {
        i: 0,
        questions: 0,
        sum: 0,
        inputSum: "",
        totalMarks: 0
    }
    inputChange = (event) => {
        this.setState({inputSum: event.target.value});
    }
    onSubmit = () => {
        if(parseInt(this.state.inputSum)===this.state.sum){
            this.setState({
                totalMarks: this.state.totalMarks+1,
                inputSum: ""
            });
        }
    }
    numbers = () => {
        let content = document.getElementById("game-body");
        document.getElementById("form").style.display = "none";
        document.getElementById("game-content").style.display = "block";
        content.innerHTML = "Q"+(this.state.questions+1);
        let myInterval = setInterval(() => {
            if (this.state.i >= 6) {
                document.getElementById("form").style.display = "block";
                document.getElementById("game-content").style.display = "none";
                clearInterval(myInterval);
            } else {
                const num = Math.floor((Math.random() * 10) + 1);
                content.innerHTML = num;
                console.log(num);
                this.setState({i: this.state.i+1, sum: this.state.sum+num});
            }
        }, 1000);
        this.setState({i: 0});
    }
    gameContinue = () => {
        // let content = document.getElementById("game-body");
        let myInterval = setInterval(() => {
            if (this.state.questions >= 1) {
                clearInterval(myInterval);
            } else {
                // content.innerHTML = "Q"+(this.state.questions+1);
                // console.log(content.innerHTML);
                this.numbers();
                this.setState({questions: this.state.questions+1});
            }
        }, 10000);
    }
    gameStart = () => {
        document.getElementById("home-screen").style.display = "none";
        document.getElementById("game-content").style.display = "block";
        this.gameContinue();
    }
    render() { 
        return (
            <div className="container valign-wrapper" style={{
                width: "90%",
                minHeight: "80vh"
            }}>
                <div className="row center" id="home-screen">
                    <h1>Ready for a Challenge?</h1>
                    <button className="btn-large waves-effect waves-blue white red-text" onClick={this.gameStart}>Play Game</button>
                </div>
                <div className="row center" id="game-content" style={{
                    display: "none"
                }}>
                    <h1 id="game-body" className="white-text" style={{fontSize: "300px"}}></h1>
                </div>
                <div className="row center white" id="form" style={{
                    display: "none",
                    width: "400px",
                    height: "200px",
                    padding: "30px"
                }}>
                    <div class="input-field">
                        <input type="text" id="sum" value={this.state.inputSum}
                            onChange={this.inputChange} />
                        <label htmlFor="sum">Your Sum</label>
                    </div>
                    <button className="btn-large green lighten-1" onClick={this.onSubmit}>SUBMIT</button>
                </div>
            </div>
        );
    }
}
 
export default Home;