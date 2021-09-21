import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createPostAction } from '../../../store/actions/PostActions';
import { Row, Col, Card, Table, Badge, } from "react-bootstrap";

export default function CreatePost(props) {
    const [number, setNumber] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
	const [lastname, setLastName] = useState('');
	const [location, setLocation] = useState('');

    const dispatch = useDispatch();

    function onCreatePost(e) {
		
        e.preventDefault();
        const postData = {
			number,
            title,
            description,
			lastname,
			location,
        };
		
        dispatch(createPostAction(postData, props.history));
    }

    return (
        <>
			<div className="container ">
				<form onSubmit={onCreatePost} className="post-table">
					<Row className="justify-content-center">	
						<Col lg={12}>
							{/* <Card>
								<Card.Header>
									<Card.Title>Basic</Card.Title>
								</Card.Header>
								<Card.Body>
									<Table responsive>
										<thead>
											<tr>
												<th>#</th>
												<th>Name</th>
												<th>Last Name</th>
												<th>Designation</th>
												<th>Location</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<input
														type='text'
														className='border border-gray-500 form-control-lg '
														value={number}
														onChange={(e) => setNumber(e.target.value)}
													/> 
												</td>
												<td>
													<input
														type='text'
														className='border border-gray-500 form-control-lg '
														value={title}
														onChange={(e) => setTitle(e.target.value)}
													/>
												</td>
												<td>
													<input
														type='text'
														className='border border-gray-500 form-control-lg'
														value={lastname}
														onChange={(e) => setLastName(e.target.value)}
													/>
												</td>
												<td>
													<input
														type='text'
														className='border border-gray-500 form-control-lg'
														value={description}
														onChange={(e) => setDescription(e.target.value)}
													/>
												</td>
												<td className="color-primary">
													<input
														type='text'
														className='border border-gray-500 form-control-lg'
														value={location}
														onChange={(e) => setLocation(e.target.value)}
													/>
												</td>
												<td>
													<button
														type='submit'
														className='btn btn-primary btn-md'
													>
														Create Post
													</button>
												</td>
												<td>
													<Link
														to='/posts'
														className='btn btn-dark light btn-md'
													>
														Back to Posts
													</Link>	
												</td>
											</tr>
										</tbody>
									</Table>
								</Card.Body>	
							</Card> */}
						</Col>
						<div className="col-xl-6 col-lg-8 col-md-6 col-sm-6" >
							<div className="card project-boxed">
								{/* <div className="img-bx">
									<img src={item.imageblog} alt="" className="w-100" />
									{item.result}
								</div> */}
								<div className="card-header align-items-start ">
									<div>
										{/* <p className="fs-14 mb-2 text-primary">{item.id}</p> */}
										<h6 className="fs-18 font-w500 mb-0"><Link to={"#"} className="text-black user-name">create a new post</Link></h6>
										{/* <div className="text-dark fs-14 text-nowrap"><i className="fa fa-calendar-o mr-3" aria-hidden="true"></i>Created on Sep 8th, 2020</div> */}
									</div>
									{/* <DropdownBlog /> */}
								</div>	
								<div className="card-body p-0 pt-2">
									<ul className="list-group border-no list-group-flush">
										<li className="list-group-item">
											<label className="mb-1 col-sm-4"><strong>Id : </strong></label>
											<input
												type='text'
												className='border border-gray-500 form-control-lg col-sm-8'
												value={number}
												onChange={(e) => setNumber(e.target.value)}
											/> 
										</li>
										<li className="list-group-item">
											<label className="mb-1 col-sm-4"><strong>Name : </strong></label>
											<input
												type='text'
												className='border border-gray-500 form-control-lg col-sm-8'
												value={title}
												onChange={(e) => setTitle(e.target.value)}
											/>
										</li>
										<li className="list-group-item">
											<label className="mb-1 col-sm-4"><strong>Last Name : </strong></label>
											<input
												type='text'
												className='border border-gray-500 form-control-lg col-sm-8'
												value={lastname}
												onChange={(e) => setLastName(e.target.value)}
											/>
										</li>
										<li className="list-group-item">
											<label className="mb-1 col-sm-4"><strong>Designation : </strong></label>
											<input
												type='text'
												className='border border-gray-500 form-control-lg col-sm-8'
												value={description}
												onChange={(e) => setDescription(e.target.value)}
											/>
										</li>
										<li className="list-group-item">
											<label className="mb-1 col-sm-4"><strong>Location : </strong></label>
											<input
												type='text'
												className='border border-gray-500 form-control-lg col-sm-8'
												value={location}
												onChange={(e) => setLocation(e.target.value)}
											/>
										</li>
										
									</ul>
								</div>
								<div className="card-footer  border-0">
									<div className="d-flex justify-content-end">
										<button
											type='submit'
											className='btn btn-primary btn-md mr-3'
										>
											Create Post
										</button>
										<Link
											to='/posts'
											className='btn btn-dark light btn-md'
										>
											Back to Posts
										</Link>	
									</div> 
								</div>
								
							</div>
						</div>
					</Row>		
				</form>
			</div>	
            
        </>
    );
}
