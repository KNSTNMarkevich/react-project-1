import React, {Suspense, lazy} from 'react';
import './App.css' ;
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Route} from "react-router-dom"
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {Component} from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import withSuspense from "./components/hok/withSuspense";

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));

class App extends Component {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-container'>
            <div className='app-wrapper'>
                <div className='header-wrapper'>
                    <HeaderContainer/>
                </div>
                <div className='main-app-wrapper'>
                    <div className='navbar-container'>
                        <Navbar /*sidebar={props.state.sidebar} *//>
                    </div>
                    <div className='app-wrapper-content'>
                        <Route path='/dialogs'
                               render={withSuspense(DialogsContainer)}
                        />
                        <Route path='/profile/:userId?'
                               render={() => <ProfileContainer/>}
                        />
                        <Suspense fallback={<div>Loading...</div>}>
                            <Route path='/users'
                                   render={() => <UsersContainer/>}
                            />
                        </Suspense>
                        <Route path='/login'
                               render={() => <Login/>}
                        />
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized,
    }
}


let ContainerApp = compose(
    connect(mapStateToProps,
        {
            initializeApp
        }
    )(App));

const SocialNetworkApp = (props) => {
    return (
        <BrowserRouter>

            <Provider store={store}>
                <ContainerApp/>
            </Provider>

        </BrowserRouter>
    )
}

export default SocialNetworkApp;
