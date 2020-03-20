import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Menu } from "semantic-ui-react";

const Header = props => {
    const renderAuthButton = () => {
        if (props.authStatus) {
            return (
                <button
                    onClick={() => {
                        props.changeAuth("");
                    }}
                >
                    SignOut
                </button>
            );
        } else {
            return (
                <button
                    onClick={() => {
                        props.changeAuth("ronaldo");
                    }}
                >
                    SignIn
                </button>
            );
        }
    };

    return (
        <div>
            <Link to="/">SignIn</Link>
            <Link to="/welcome">Welcome</Link>
            <Link to="/list">ItemList</Link>
            <Link to="/order">OrderPage</Link>
            <Link to="/status">OrderStatus</Link>
            {renderAuthButton()}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return { authStatus: state.auth.accessToken };
};

export default connect(mapStateToProps, actions)(Header);
