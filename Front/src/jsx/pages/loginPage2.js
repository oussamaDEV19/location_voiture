import React from 'react';
import {Link} from 'react-router-dom';

//var bnr = require('./../../images/big/img3.jpg');
import bnr from './../../images/body/bg6.jpg';
import logo from "./../../images/logo-full.png";

const loginPage2 = () =>{
	return(
		<>
			<div className="page-content bg-white login-style2" style={{backgroundImage: `url(${bnr})`, backgroundSize: "cover" }}>
				<div className="section-full">	
					<div className="container">
						<div className="row">
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="text-white max-w400 align-self-center">
									<div className=" mb-3">
										<Link to="/"><img src={logo} alt="" /></Link>
									</div>
									<h2 className="m-b10 text-white">Login To You Now</h2>
									<p className="m-b30">Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry.</p>
									<ul className="list-inline m-a0 d-flex">
										<li><Link to={''} className="mr-3 text-white "><i className="fa fa-facebook"></i></Link></li>
										<li><Link to={''} className="mr-3 text-white "><i className="fa fa-google-plus"></i></Link></li>
										<li><Link to={''} className="mr-3 text-white "><i className="fa fa-linkedin"></i></Link></li>
										<li><Link to={''} className="mr-3 text-white "><i className="fa fa-instagram"></i></Link></li>
										<li><Link to={''} className="mr-3 text-white"><i className="fa fa-twitter"></i></Link></li>
									</ul>
								</div>
							</div>
							<div className="col-lg-6 col-md-6">
								<div className="authincation-content">
									<div className="row no-gutters">
										<div className="auth-form">
											
											<h4 className="text-center mb-4 ">Sign in your account</h4>
											<form >
												<div className="form-group">
													<label className="mb-1 ">
													  <strong>Email</strong>
													</label>
													<input type="email" className="form-control"/>
												</div>										  
												<div className="form-group">
													<label className="mb-1 "><strong>Password</strong></label>
													<input type="password" className="form-control" value="password"/>
												</div>
													 
												<div className="form-row d-flex justify-content-between mt-4 mb-2">
													<div className="form-group">
														<div className="custom-control custom-checkbox ml-1 ">
															<input type="checkbox" className="custom-control-input" id="basic_checkbox_1"/>
															<label className="custom-control-label" htmlFor="basic_checkbox_1">Remember my preference</label>
														</div>
													</div>
													<div className="form-group">
														<Link className="" to="page-forgot-password">Forgot Password ?</Link>
													</div>
												</div>
												<div className="text-center">
													<button type="submit" className="btn btn-primary btn-block">
														Sign In
													</button>
												</div>
											</form>
											<div className="new-account mt-3">
												<p className="">
													Don't have an account?{" "}
													<Link className="text-primary" to="./page-register">Sign up</Link>
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<footer className="login-footer">
						<div className="container">
							<div className="row">
								<div className="col-lg-12 text-center">
									<span className="float-left">© Copyright by <i className="fa fa-heart m-lr5 text-red heart"></i>
									<Link to={""}>DexignZone </Link> </span>
									<span className="float-right">
										All rights reserved.
									</span>
								</div>
							</div>
						</div>
					</footer>
				</div>
			</div>
		</>
	)
}
export default loginPage2