import React,{ useState } from "react";
import { connect, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import {
    loadingToggleAction,
    loginAction,
} from '../../store/actions/AuthActions';
// image
import logg from "../../images/logo.JPG";
import login from "../../images/login-bg.jpg";
import "./login.css"

function Login(props) {
	const [email, setEmail] = useState('demo@demo.com');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('123456');

    const dispatch = useDispatch();
   //setEmail('');
    //setPassword('123456');
    function onLogin(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (email === '') {
            errorObj.email = 'Email is Required';
            error = true;
        }
        if (password === '') {
            errorObj.password = 'Password is Required';
            error = true;
        }
        setErrors(errorObj);
        if (error) {
			return;
		}        
		dispatch(loadingToggleAction(true));
        dispatch(loginAction(email, password, props.history));
    }

  return (
		<div className="login-wrapper">
			<div className="login-aside-left" style={{backgroundImage:"url("+ login +")"}}>
					<img src={logg} alt="" className="login-lgg" />

			</div>
			<div className="login-aside-right">
				<div className="row m-0 justify-content-center h-100 align-items-center">
				  <div className="col-xl-6 col-xxl-8">
					<div className="authincation-content">
					  <div className="row no-gutters">
						<div className="col-xl-12">
						  <div className="auth-form">
							<div className=" mb-3">
							{ /*  <Link to="/">
								<img src={logo} alt="" />
                            </Link> */}
							  <h2 className="text-primary">Bienvenue à Softway Cars</h2>
							</div>
							<h4 className=" mb-4 ">Connectez-vous en saisissant les informations ci-dessous</h4>
                            {props.errorMessage && (
                                <div className='text-danger'>
                                    {props.errorMessage}
                                </div>
                            )}
                            {props.successMessage && (
                                <div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
                                    {props.successMessage}
                                </div>
                            )}
							<form onSubmit={onLogin}>
                                <div className="form-group">
									<label className="mb-2 ">
									  <strong>Email</strong>
									</label>
									<input type="email" className="form-control"
									  value={email}
									   onChange={(e) => setEmail(e.target.value)}
                                       //defaultValue="abcd@gmail.com"
									/>
								  {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
								</div>
								<div className="form-group">
									<label className="mb-2 "><strong>Password</strong></label>
									<input
									  type="password"
									  className="form-control"
									  value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
									{errors.password && <div className="text-danger fs-12">{errors.password}</div>}
								</div>
							  <div className="form-row d-flex justify-content-between mt-4 mb-2">
								<div className="form-group">
								  <div className="custom-control custom-checkbox ml-1 ">
									<input
									  type="checkbox"
									  className="custom-control-input"
									  id="basic_checkbox_1"
									/>
									<label
									  className="custom-control-label"
									  htmlFor="basic_checkbox_1"
									>
									  Rappelez mes préférences
									</label>
								  </div>
								</div>
								{/* <div className="form-group">
								  <Link className="text-primary" to="page-forgot-password">
									Forgot Password ?
								  </Link>
								</div> */}
							  </div>
							  <div className="text-center">
								<button
								  type="submit"
								  className="btn btn-primary btn-block"
								>
								  S'identifier
								</button>
							  </div>
							</form>
							<div className="new-account mt-3">
							  <p className="">
							  	Vous n'avez pas de compte ?{" "}
								<Link className="text-primary" to="./page-register">
								S'inscrire
								</Link>
							  </p>
							</div>
						  </div>
						</div>
					  </div>
					</div>
				  </div>
				</div>
			</div>
		</div>
  );
};

const mapStateToProps = (state) => {
	console.log('state');
	console.log(state);
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};
export default connect(mapStateToProps)(Login);
