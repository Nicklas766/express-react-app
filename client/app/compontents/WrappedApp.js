var React = require('react');
var NavLink = require('react-router-dom').NavLink;



const Header = (props) => (
    <div className="header">
        <div>
            <NavLink exact activeClassName='active' to='/'>
                Home
            </NavLink>
            <NavLink activeClassName='active' to='/about'>
                About
            </NavLink>
        </div>
    </div>
);

const Footer = (props) => (
    <footer>
        <h1> Applikation av Nicklas </h1>
    </footer>
);



class WrappedApp extends React.Component {
    render() {
        return (
            <div className={"container"}>
                <Header />
                <div className="middle-container">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}

module.exports = WrappedApp;
