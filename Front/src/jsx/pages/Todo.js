import React,{useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addTodo, deleteTodo, removeTodo} from '../../store/actions/index';
import {todoReducers} from '../../store/reducers/Reducers';

const Todo = () => {
	const [inputData, setInputData] = useState('');
	const list = useSelector((state) => state.todoReducers.list);
	const dispatch = useDispatch();
	return(
		<>
			<div className="text-center">
				<div className="row justify-content-center align-items-center">
					<div className="col-md-6">
						<div className="authincation-content">
							<div className="row no-gutters">
								<div className="col-xl-12">
									<div className="auth-form">
										<div className="text-center mb-5">
											<h2>Add Your List Here</h2>
										</div>
										<div className="">
											<div className="card">
												<div className="d-flex align-items-center justify-content-between">
													<input type="text"  placeholder="add items ... " className="form-control"
														value={inputData}
														onChange={(event) => setInputData(event.target.value)}
													/>
													<div className=" btn btn-secondary">
														<i className="fa fa-plus add-btn" onClick={() => dispatch(addTodo(inputData), setInputData(''))}></i>
													</div>	
												</div>
											</div>
										</div>
										<div className="showItems">
											{
												list.map((elem) =>{
													return(
														<div className="eachItem card" key={elem.id}> 
															<div className="d-flex align-items-center justify-content-between">
																<div className="p-2">
																	<h3 className="mb-0">{elem.data}</h3>
																</div>
																<div className="todo-btn btn btn-danger">
																	<i className="fa fa-trash-o add-btn" title="Delete Item" onClick={() => dispatch(deleteTodo(elem.id))}></i>
																</div>
															</div>
														</div>
													)
												})
											}
										</div>
										<div className="showItems text-center">
											<button className="btn-effect04 btn btn-secondary" data-sm-link-text='remove All' onClick={()=> dispatch(removeTodo())}	
											><span>Check List</span></button>
										</div>
									</div>
								</div>						
							</div>						
						</div>												
					</div>
				</div>	
			</div>	
		</>
	)
}
export default Todo;