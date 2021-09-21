import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { updatePostAction } from '../../../store/actions/PostActions';
import { getPost } from '../../../store/selectors/PostSelectors';
import { Row, Col, Card, Table, Badge, } from "react-bootstrap";

function EditPost(props) {
    const [post, setPost] = useState(props.post);
	
    const dispatch = useDispatch();
	console.log(post);
    useEffect(() => {
        setPost(props.post);
    }, [props.post]);

    function onUpdatePost(e) {
        e.preventDefault();
        dispatch(updatePostAction(post, props.history));
    }

    return (
        <>
            
                <form onSubmit={onUpdatePost}>
                    <Row className="justify-content-center">
                        <div className="col-xl-6 col-lg-8 col-md-6 col-sm-6" >
                            <div className="card project-boxed">
                                <div className="card-header align-items-start ">
                                    <div>
                                        {/* <p className="fs-14 mb-2 text-primary">{item.id}</p> */}
                                        <h6 className="fs-18 font-w500 mb-0"><Link to={"#"} className="text-black user-name">Edit Post</Link></h6>
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
                                                className='border border-gray-500 form-control-lg '
                                                value={post.number}
                                                onChange={(e) => setPost({ ...post, number: e.target.value,})}
                                            />
                                        </li>
                                        
                                        <li className="list-group-item">
                                            <label className="mb-1 col-sm-4"><strong>Name : </strong></label>
                                            <input
                                                type='text'
                                                className='border border-gray-500 form-control-lg '
                                                value={post.title}
                                                onChange={(e) => setPost({ ...post, title: e.target.value,})}
                                            />
                                        </li>
                                        <li className="list-group-item">
                                            <label className="mb-1 col-sm-4"><strong>Last Name : </strong></label>
                                            <input
                                                type='text'
                                                className='border border-gray-500 form-control-lg '
                                                value={post.lastname}
                                                onChange={(e) => setPost({ ...post, lastname: e.target.value,})}
                                            />
                                        </li>
                                        <li className="list-group-item">
                                            <label className="mb-1 col-sm-4"><strong>Designation : </strong></label>
                                            <input
                                                type='text'
                                                className='border border-gray-500 form-control-lg '
                                                value={post.description}
                                                onChange={(e) => setPost({ ...post, description: e.target.value,})}
                                            />
                                        </li>
                                        <li className="list-group-item">
                                            <label className="mb-1 col-sm-4"><strong>Location : </strong></label>
                                            <input
                                                type='text'
                                                className='border border-gray-500 form-control-lg '
                                                value={post.location}
                                                onChange={(e) => setPost({ ...post, location: e.target.value,})}
                                            />
                                        </li>
                                        
                                    </ul>
                                </div>
                                <div className="card-footer p-0 pt-2 pb-2 ">
                                    <div className="d-flex justify-content-center">
                                        <button type='submit' className='text-nowrap btn btn-secondary light btn-md mr-3'>Edit Post</button>
                                        <Link to='/posts' className='btn btn-danger light  btn-md'>Back to Posts</Link>
                                    </div>
                                </div>
                            </div>
                        </div>    
                        {/* <Col lg={12}>
                            <Card>
                                <Card.Header>
                                    <Card.Title>Edit Post</Card.Title>
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
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>	
                                            <tr>
                                                <td>
                                                    <input
                                                        type='text'
                                                        className='border border-gray-500 form-control-lg '
                                                        value={post.number}
                                                        onChange={(e) => setPost({ ...post, number: e.target.value,})}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type='text'
                                                        className='border border-gray-500 form-control-lg '
                                                        value={post.title}
                                                        onChange={(e) => setPost({ ...post, title: e.target.value,})}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type='text'
                                                        className='border border-gray-500 form-control-lg '
                                                        value={post.lastname}
                                                        onChange={(e) => setPost({ ...post, lastname: e.target.value,})}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type='text'
                                                        className='border border-gray-500 form-control-lg '
                                                        value={post.description}
                                                        onChange={(e) => setPost({ ...post, description: e.target.value,})}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type='text'
                                                        className='border border-gray-500 form-control-lg '
                                                        value={post.location}
                                                        onChange={(e) => setPost({ ...post, location: e.target.value,})}
                                                    />
                                                </td>
                                                <td>
                                                    <button type='submit' className='text-nowrap btn btn-dark light btn-md'>Edit Post</button>
                                                </td>
                                            </tr>	
                                        </tbody>	
                                    </Table>
                                </Card.Body>
                            </Card>		
                        </Col> */}
                    </Row>
                </form>
            
        </>
    );
}

const makeStateToProps = () => {
    const post = getPost();
	
    return (state, props) => {
        return {
            post: post(state, props.match.params.id),
        };
    };
};

export default connect(makeStateToProps)(EditPost);
