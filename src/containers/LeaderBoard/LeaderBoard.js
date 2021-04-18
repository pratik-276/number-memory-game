import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './LeaderBoard.module.css';

class LeaderBoard extends Component {
    state = {  }
    componentWillMount(){
        this.props.getData();
    }
    render() { 
        return (
            <div className="container" style={{
                paddingBottom: "20px"
            }}>
                <ul className="collection with-header">
                    <li className="collection-header center"><h3>LeaderBoard</h3></li>
                </ul>
                <div className={classes.table} style={{
                    fontWeight: "bold",
                    backgroundColor: "black",
                    color: "white"
                }}>
                    <p style={{
                        borderRight: "1px solid white"
                    }}>SlNo.</p>
                    <p style={{
                        borderRight: "1px solid white"
                    }}>Time</p>
                    <p style={{
                        borderRight: "1px solid white"
                    }}>Date</p>
                    <p>Marks</p>
                </div>
                {this.props.tests.map((test, index) => (
                    <div className={classes.table}>
                        <p>{index+1}</p>
                        <p>{test.time}</p>
                        <p>{test.date}</p>
                        <p>{test.marks}</p>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStatetoProps = state => {
    return {
        tests: state.board
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        getData: () => dispatch(actions.getAllTests())
    }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(LeaderBoard);