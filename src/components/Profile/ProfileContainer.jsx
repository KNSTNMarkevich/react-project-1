import React, {Component} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getMainProfile, getUserStatus, updateUserStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    refreshProfile(){
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getMainProfile(userId)
        this.props.getUserStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.match.params.userId !== prevProps.match.params.userId){
            this.refreshProfile()

        }
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateUserStatus}
            />
        );
    }
}

let MapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    authorizedUserId: state.auth.userId,
    status: state.profilePage.status
});

export default compose(
    connect(MapStateToProps, {getMainProfile, getUserStatus, updateUserStatus}),
    withRouter,
)(ProfileContainer)
