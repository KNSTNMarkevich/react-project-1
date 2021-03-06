import React from "react";
import Login from "./Login";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {login} from "../../redux/auth-reducer";

class LoginContainer extends React.Component {

    render() {
        debugger;
        return (
            <Login  {...this.props}/>
        );
    }
}

let MapStateToProps = (state) => ({
    userId: state.auth.userId,
    email: state.auth.email,
    password: state.auth.password,

});

export default compose(
    connect(MapStateToProps, {login}),
    withRouter,
    //withAuthRedirect
)(LoginContainer)