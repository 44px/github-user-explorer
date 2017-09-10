import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect, Link, Switch} from 'react-router-dom';
import {PageHeader} from 'react-bootstrap';
import UserListPage from './user-list/UserListPage';
import UserPage from './user/UserPage';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div className='container-fluid'>
                    <PageHeader>
                        <Link to='/'>GitHub User Explorer</Link>
                    </PageHeader>

                    <Switch>
                        <Route path='/' exact component={UserListPage} />
                        <Route path='/user/:username' component={UserPage} />
                        <Redirect to='/' />
                    </Switch>
                </div>
            </Router>
        );
    }
}
