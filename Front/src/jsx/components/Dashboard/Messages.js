import React,{Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
import { Dropdown} from 'react-bootstrap';
import { TabContent, TabPane, } from 'reactstrap';
import classnames from 'classnames';
import ChatRoom from '../Fasto/Chatbox/ChatRoom';
import {chatlistBlog, chatlistBlog2, chatlistBlog3} from './../Fasto/Message/MessagesTabData';
import profile1 from './../../../images/profile/Untitled-1.jpg';

const Messages = () =>{
	const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
	return(
		<Fragment>
			<div className="row">
				<div className="col-xl-5">
					<div className="row">
						<div className="col-xl-12">
							<div className="card">
								<div className="card-body d-flex align-items-center">
									<div className="d-flex mr-auto mb-sm-0 mb-2 align-items-center">
										<img src={profile1} alt="" width="60" className="rounded-circle mr-3" />
										<div>
											<h5 className="fs-18 text-black font-w600">Peter Parkur</h5>
											<Dropdown className="dropdown">
												<Dropdown.Toggle variant="" as="div" className="i-false">
													<Link to={"#"} className="text-primary" data-toggle="dropdown" aria-expanded="false">
														<svg className="mr-1" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
															<circle cx="4" cy="4" r="4" fill="#43DC80"/>
														</svg>
														Available
														<i className="las la-angle-down text-dark ml-2"></i>
													</Link>
												</Dropdown.Toggle>	
												<Dropdown.Menu className="dropdown-menu-right" alignRight={true}>
													<Dropdown.Item>Available</Dropdown.Item>
													<Dropdown.Item>Unavailable</Dropdown.Item>
												</Dropdown.Menu>
											</Dropdown>
										</div>
									</div>
									<Link to={"./contacts"} className="btn btn-primary btn-rounded text-white shadow-primary"><i className="las la-comment-dots mr-2 scale5"></i>+ New</Link>
								</div>
							</div>
						</div>
						<div className="col-xl-12">
							<div className="card">
								<div className="card-header align-items-center">
									<div className="card-action card-tabs">
										<ul className="nav nav-tabs style-1" role="tablist">
											<li className="nav-item">
												<Link to ={"#"} className= {classnames({ active : activeTab === '1'}) + ' nav-link'} onClick={() => { toggle('1'); }}>
													All Message
												</Link>
											</li>
											<li className="nav-item">
												<Link to ={"#"} className= {classnames({ active : activeTab === '2'}) + ' nav-link'} onClick={() => { toggle('2'); }}>
													Unread
												</Link>
											</li>
											<li className="nav-item">
												<Link to ={"#"} className= {classnames({ active : activeTab === '3'}) + ' nav-link'} onClick={() => { toggle('3'); }}>
													Archived
												</Link>
											</li>
										</ul>
									</div>
								</div>
								<div className="card-body message-bx px-0 pt-3" >
									<div className="input-group message-search-area">
										<input type="text" className="form-control" placeholder="Search from people and grup" />
										<div className="input-group-append">
											<button className="input-group-text"><i className="flaticon-381-search-2"></i></button>
										</div>
									</div>
									<PerfectScrollbar className=" dz-scroll height520">
										<div className="tab-content" id="message-bx">
											<div className="tab-pane fade show active" id="AllMessage" role="tabpanel">
												<TabContent activeTab={activeTab}>
													<TabPane tabId="1">
														{chatlistBlog.map((item,index)=>(
															<div className="media chat-list-area " key={index}>
																{item.image1}
																{item.image2}
																<div className="media-body">
																	<div className="d-flex mb-sm-2 mb-0">
																		<h6 className="text-black mb-0 font-w600 fs-16">{item.title}</h6>
																		<span className="ml-auto fs-14">{item.time}</span>
																	</div>
																	<p className="text-black">Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
																</div>
															</div>
														))}
													</TabPane>	
													<TabPane tabId="2">	
														{chatlistBlog2.map((item,index)=>(
															<div className="media chat-list-area " key={index}>
																{item.image1}
																{item.image2}
																<div className="media-body">
																	<div className="d-flex mb-sm-2 mb-0">
																		<h6 className="text-black mb-0 font-w600 fs-16">{item.title}</h6>
																		<span className="ml-auto fs-14">{item.time}</span>
																	</div>
																	<p className="text-black">Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
																</div>
															</div>
														))}
													</TabPane>	
													<TabPane tabId="3">	
														{chatlistBlog3.map((item,index)=>(
															<div className="media chat-list-area " key={index}>
																{item.image1}
																{item.image2}
																<div className="media-body">
																	<div className="d-flex mb-sm-2 mb-0">
																		<h6 className="text-black mb-0 font-w600 fs-16">{item.title}</h6>
																		<span className="ml-auto fs-14">{item.time}</span>
																	</div>
																	<p className="text-black">Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
																</div>
															</div>
														))}
													</TabPane>	
												</TabContent>
											</div>
										</div>
									</PerfectScrollbar>	
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-7">
					<div className="row">
						<ChatRoom />
						{/* <div className="col-xl-12">
							<div className="card  message-bx chat-box">
								<div className="card-header">
									<div><h5 className="text-black font-w500 mb-sm-1 mb-0 title-nm">Roberto Charloz</h5></div>
									<div className="d-flex align-items-center">	
										<span className="mr-2">Last seen 4:23 AM</span>
										<Dropdown className="ml-2">
											<Dropdown.Toggle variant="" as="div" className="i-false">
												<Link to={"#"} data-toggle="dropdown" aria-expanded="false">
													<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
														<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
														<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
													</svg>
												</Link>
											</Dropdown.Toggle>	
											<Dropdown.Menu className="dropdown-menu-right" alignRight={true}>
												<Dropdown.Item>Edit</Dropdown.Item>
												<Dropdown.Item>Delete</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									</div>	
								</div>
								<PerfectScrollbar className="card-body chat-box-area dz-scroll" id="chartBox">
									<div className="media mb-4  justify-content-start align-items-start">
										<div className="image-bx mr-sm-4 mr-2">
											<img src={profile3} alt="" className="rounded-circle img-1" />
											<span className="active"></span>
										</div>
										<div className="message-received">
											<p className="mb-1">
												Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptat
											</p>
											<span className="fs-12">4.30 AM</span>
										</div>
									</div>
									<div className="media mb-4 justify-content-end align-items-end">
										<div className="message-sent">
											<p className="mb-1">
												sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet
											</p>
											<span className="fs-12">9.30 AM</span>
										</div>
										<div className="image-bx ml-sm-4 ml-2 mb-4">
											<img src={profile2} alt="" className="rounded-circle img-1" />
											<span className="active"></span>
										</div>
									</div>
									<div className="media mb-4  justify-content-end align-items-end">
										<div className="message-sent">
											<p className="mb-1">
												nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea
											</p>
											<span className="fs-12">9.30 AM</span>
										</div>
										<div className="image-bx ml-sm-4 ml-2 mb-4">
											<img src={profile2} alt="" className="rounded-circle img-1" />
											<span className="active"></span>
										</div>
									</div>
									<div className="media justify-content-start align-items-start">
										<div className="image-bx mr-sm-4 mr-2">
											<img src={profile1}alt="" className="rounded-circle img-1" />
											<span className="active"></span>
										</div>
										<div className="message-received">
											<p className="mb-1">
												Hey, check my design update last night. Tell me what you think and if that is OK. I hear client said they want to change the layout concept
											</p>
											<span className="fs-12">4.30 AM</span>
										</div>
									</div>
								</PerfectScrollbar>
								<div className="card-footer border-0 type-massage">
									<div className="input-group">
										<textarea className="form-control" placeholder="Type message..."></textarea>
										<div className="input-group-append">
											<button type="button" className="btn pr-0"><i className="las la-paperclip scale5 text-secondary"></i></button>
											<button type="button" className="btn"><i className="las la-image scale5 text-secondary"></i></button>
											<button type="button" className="btn btn-primary rounded text-white">SEND</button>
										</div>
									</div>
								</div>
							</div>
						</div> */}
					</div>
				</div>
			</div>		
		</Fragment>	
	)
}

export default Messages;