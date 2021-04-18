import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class Home extends Component {
    state = {
        i: 0,
        questions: 0,
        sum: 0,
        inputSum: "",
        totalMarks: 0
    }
    componentDidMount(){
        M.FormSelect.init(document.querySelectorAll('select'), {});
        let modal = document.querySelectorAll('.modal');
        M.Modal.init(modal, {});
    }
    inputChange = (event) => {
        this.setState({inputSum: event.target.value});
    }
    onSubmit = () => {
        if(parseInt(this.state.inputSum)===this.state.sum){
            this.setState({
                totalMarks: this.state.totalMarks+1,
                inputSum: "",
                sum: 0
            });
        }else{
            this.setState({inputSum: "", sum: 0});
        }
        document.getElementById("form").style.display = "none";
    }
    finalResult = () => {
        document.getElementById("modalOpener").click();
    }
    saveResult = () => {
        var d = new Date(); 
        const newData = {
            time: d.getHours()+":"+d.getMinutes()+":"+ d.getSeconds(),
            date: d.getDate()+"/"+ (d.getMonth()+1)+"/"+d.getFullYear(),
            marks: this.state.totalMarks
        }
        this.props.postTest(newData);
        this.setState({
            i: 0,
            questions: 0,
            sum: 0,
            inputSum: "",
            totalMarks: 0
        });
        document.getElementById("form").style.display = "none";
        document.getElementById("game-content").style.display = "none";
        document.getElementById("home-screen").style.display = "block";
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
                this.setState({i: this.state.i+1, sum: this.state.sum+num});
            }
        }, 1000);
        this.setState({i: 0});
    }
    gameContinue = () => {
        let content = document.getElementById("game-body");
        content.style.fontSize = "30px";
        content.innerHTML = "Please Wait while the game is cooking...";
        let myInterval = setInterval(() => {
            content.style.fontSize = "300px";
            if (this.state.questions >= 10) {
                clearInterval(myInterval);
                this.finalResult();
            } else {
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
                    <div className="input-field">
                        <input type="text" id="sum" value={this.state.inputSum}
                            onChange={this.inputChange} />
                        <label htmlFor="sum">Your Sum</label>
                    </div>
                    <button className="btn-large green lighten-1" onClick={this.onSubmit}>SUBMIT</button>
                </div>
                <button href="#modal1" className="modal-trigger" id="modalOpener" style={{
                    display: "none"
                }}></button>
                <div className="modal" id="modal1">
                    <div className="modal-content center">
                        <p style={{
                            fontSize: "20px"
                        }}><b>Your marks: {this.state.totalMarks}</b></p>
                    </div>
                    <div className="modal-footer" style={{
                        textAlign: "center",
                        marginBottom: "20px"
                    }}>
                        <button className="btn-large red white-text modal-action modal-close" onClick={this.saveResult}>Go Back</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        postTest: (data) => dispatch(actions.postTest(data))
    }
}
 
export default connect(null, mapDispatchtoProps)(Home);