import React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../../containers/Home/Home';
import LeaderBoard from '../../containers/LeaderBoard/LeaderBoard';
import Header from '../Header/Header';

const Layout = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route path="/leaderboard" component={LeaderBoard} />
                <Route path="/" component={Home} />
            </Switch>
        </div>
    );
}
 
export default Layout;