var React = require('react');

// Router
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

// Wrapper
var WrappedApp = require('./WrappedApp');

// Route Paths
var Home = require('./page/Home');
var About = require('./page/About');
var Connect = require('./page/Connect');


class App extends React.Component {
    render() {
        return (
            <Router>
                <WrappedApp>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/about' component={About} />
                        <Route exact path='/chat' component={Connect} />
                        <Route render={() => <div className="container"><h1>404 not found</h1></div>} />
                    </Switch>
                </WrappedApp>
            </Router>
        );
    }
}

module.exports = App;
