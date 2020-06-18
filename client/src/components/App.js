import React from 'react';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import createBrowserHistory from '../history';
import {Router, Route, Switch } from 'react-router-dom';  
// The BrowserRouter has its own history component which store the page history and can be used for programmatic navigation. 
// But we want to change the route data in the action creator and it will be difficult to do so. Therefore we use our
// own history object along with a plain router instead of BrowserRouter.

const App = () => {
    return (
        <div className="ui container">
            <Router history={createBrowserHistory}>
                <div>
                    <Header/>
                    <Route path="/" exact component={StreamList} />
                    <Route path="/streams/new" exact component={StreamCreate} />
                    <Route path="/streams/edit/:id" exact component={StreamEdit} />
                    <Route path="/streams/delete/:id" exact component={StreamDelete} />
                    <Route path="/streams/show/:id" exact component={StreamShow} />
                </div>
            </Router>
        </div>
    );
}

export default App;