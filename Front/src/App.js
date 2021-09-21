import React, { useContext } from "react";
import Index from './jsx/index';
import { withResizeDetector } from "react-resize-detector";
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { checkAutoLogin } from './services/AuthService';
import { isAuthenticated } from './store/selectors/AuthSelectors';

import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";

//const Home = lazy(() => import('./jsx/components/Dashboard/Index'));
const SignUp = lazy(() => import('./jsx/pages/Registration'));
const ForgotPassword = lazy(() => import('./jsx/pages/ForgotPassword'));
//const Login = lazy(() => import('./jsx/pages/Login'));

const Login = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./jsx/pages/Login')), 500);
  });
});

function App(props) {
	//const {menuToggle} = useContext(ThemeContext);
	console.log('App-props');
	console.log(props);
    const dispatch = useDispatch();
    useEffect(() => {
        checkAutoLogin(dispatch, props.history);
    }, []);

    let routes = (
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/page-register' component={SignUp} />
            <Route path='/page-forgot-password' component={ForgotPassword} />
            { /* <Route path='/' component={Login} /> */ }
        </Switch>
    );

	if(props.isAuthenticated) {
		return(
			<div>
				
				<Suspense fallback={
					<div id="preloader">
						<div className="waviy">
						   <span style={{'--i': 1}}>L</span>
						   <span style={{'--i': 2}}>o</span>
						   <span style={{'--i': 3}}>a</span>
						   <span style={{'--i': 4}}>d</span>
						   <span style={{'--i': 5}}>i</span>
						   <span style={{'--i': 6}}>n</span>
						   <span style={{'--i': 7}}>g</span>
						   <span style={{'--i': 8}}>.</span>
						   <span style={{'--i': 9}}>.</span>
						   <span style={{'--i': 10}}>.</span>
						</div>
					</div>
				}
				>
				
				<Index / >
			</Suspense>
			</div>
		);
	
	}else{
		 return (
			<>
				<Suspense fallback={
						<div id="preloader">
							<div className="waviy">
							   <span style={{'--i': 1}}>L</span>
							   <span style={{'--i': 2}}>o</span>
							   <span style={{'--i': 3}}>a</span>
							   <span style={{'--i': 4}}>d</span>
							   <span style={{'--i': 5}}>i</span>
							   <span style={{'--i': 6}}>n</span>
							   <span style={{'--i': 7}}>g</span>
							   <span style={{'--i': 8}}>.</span>
							   <span style={{'--i': 9}}>.</span>
							   <span style={{'--i': 10}}>.</span>
							</div>
						</div>
					}
				>
					{routes}
				</Suspense>
			</>
		);
	} 
}

//export default withResizeDetector(App);

/*  const mapStateToProps = (state) => {
    return {
        isAuthenticated: isAuthenticated(state),
    };
}; 

export default withResizeDetector(App);  */


 const mapStateToProps = (state) => {
	return {
        isAuthenticated: isAuthenticated(state),
    };
};

export default withRouter(connect(mapStateToProps)(App));  