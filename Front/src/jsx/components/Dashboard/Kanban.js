import React,{Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import Board, { moveCard } from "@lourenci/react-kanban";
import { board	} from './../Fasto/Kanban/KanbanData';

//import "@lourenci/react-kanban/dist/styles.css";

//Images
import kanban1 from './../../../images/kanban/Untitled-1.jpg';
import kanban2 from './../../../images/kanban/Untitled-2.jpg';
import kanban3 from './../../../images/kanban/Untitled-3.jpg';
import kanban4 from './../../../images/kanban/Untitled-4.jpg';
import kanban5 from './../../../images/kanban/Untitled-5.jpg';
import kanban6 from './../../../images/kanban/Untitled-6.jpg';
import kanban7 from './../../../images/kanban/Untitled-7.jpg';

function ControlledBoard() {
  // You need to control the state yourself.
  const [controlledBoard, setBoard] = useState(board);

  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(controlledBoard, source, destination);
    setBoard(updatedBoard);
  }

	return (
		<Board onCardDragEnd={handleCardMove} disableColumnDrag>
			{controlledBoard}
		</Board>
	
	);
}
const Kanban = (props) => {
	const[newProject, setNewProject] = useState(false);
	return(
		<Fragment>
			<div className="project-nav align-items-end">
				<div className="mr-auto  mb-lg-0 mb-3">
					<div className="mb-4">
						<h2 className="title-num text-black font-w700">Project Fasto v2.1 </h2>
						<span className="fs-14">Created by Lidya Chan on June 31, 2021</span>
					</div>
					<div className="d-sm-flex d-block align-items-center">
						<Link to={"#"} className="btn btn-light rounded mr-3 mb-sm-0 mb-2"><i className="fa fa-pencil-square mr-3 scale5" aria-hidden="true"></i>Edit</Link>
						<Link to={"#"} className="btn btn-light rounded mb-sm-0 mb-2"><i className="fa fa-lock mr-3 scale5" aria-hidden="true"></i>Private</Link>
						<ul className="users-lg ml-sm-5 ml-0">
							<li><img src={kanban1} alt="" /></li>
							<li><img src={kanban2} alt="" /></li>
							<li><img src={kanban3} alt="" /></li>
							<li><img src={kanban4} alt="" /></li>
							<li><img src={kanban5} alt="" /></li>
							<li><img src={kanban6} alt="" /></li>
							<li><img src={kanban7} alt="" /></li>
						</ul>
					</div>
				</div>
				<div className="mt-3">
					<Link to={"#"} onClick={ () => setNewProject(true)} className="btn btn-primary  rounded mr-3 mb-sm-0 mb-2 text-white"><i className="fa fa-user mr-3 scale5" aria-hidden="true"></i>New Task</Link>
					{/* <!-- Add Order --> */}
					<Modal className="modal fade" show={newProject} onHide={setNewProject} >
						<div className="" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">Add Task</h5>
									<button type="button" className="close" onClick={ () => setNewProject(false)}><span>&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<form>
										<div className="form-group">
											<label className="text-black font-w500">First Name</label>
											<input type="text" className="form-control" />
										</div>
										<div className="form-group">
											<label className="text-black font-w500">Last Name</label>
											<input type="text" className="form-control" />
										</div>
										<div className="form-group">
											<label className="text-black font-w500">Address</label>
											<input type="text" className="form-control" />
										</div>
										<div className="form-group">
											<button type="button" className="btn btn-primary">SAVE</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</Modal>
					{/* <Link to={"#"} className="mx-3">
						<svg className="primary-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4 7H20C20.7956 7 21.5587 6.68393 22.1213 6.12132C22.6839 5.55871 23 4.79565 23 4C23 3.20435 22.6839 2.44129 22.1213 1.87868C21.5587 1.31607 20.7956 1 20 1H4C3.20435 1 2.44129 1.31607 1.87868 1.87868C1.31607 2.44129 1 3.20435 1 4C1 4.79565 1.31607 5.55871 1.87868 6.12132C2.44129 6.68393 3.20435 7 4 7Z" fill="#43DC80"/>
							<path d="M20 9H4C3.20435 9 2.44129 9.31607 1.87868 9.87868C1.31607 10.4413 1 11.2044 1 12C1 12.7956 1.31607 13.5587 1.87868 14.1213C2.44129 14.6839 3.20435 15 4 15H20C20.7956 15 21.5587 14.6839 22.1213 14.1213C22.6839 13.5587 23 12.7956 23 12C23 11.2044 22.6839 10.4413 22.1213 9.87868C21.5587 9.31607 20.7956 9 20 9Z" fill="#43DC80"/>
							<path d="M20 17H4C3.20435 17 2.44129 17.3161 1.87868 17.8787C1.31607 18.4413 1 19.2044 1 20C1 20.7956 1.31607 21.5587 1.87868 22.1213C2.44129 22.6839 3.20435 23 4 23H20C20.7956 23 21.5587 22.6839 22.1213 22.1213C22.6839 21.5587 23 20.7956 23 20C23 19.2044 22.6839 18.4413 22.1213 17.8787C21.5587 17.3161 20.7956 17 20 17Z" fill="#43DC80"/>
						</svg>
					</Link>
					<Link to={"#"} className="mx-3">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8 0.999939H4C2.34315 0.999939 1 2.34308 1 3.99994V7.99994C1 9.65679 2.34315 10.9999 4 10.9999H8C9.65685 10.9999 11 9.65679 11 7.99994V3.99994C11 2.34308 9.65685 0.999939 8 0.999939Z" fill="#CBCBCB"/>
							<path d="M20 0.999939H16C14.3431 0.999939 13 2.34308 13 3.99994V7.99994C13 9.65679 14.3431 10.9999 16 10.9999H20C21.6569 10.9999 23 9.65679 23 7.99994V3.99994C23 2.34308 21.6569 0.999939 20 0.999939Z" fill="#CBCBCB"/>
							<path d="M8 13H4C2.34315 13 1 14.3431 1 16V20C1 21.6569 2.34315 23 4 23H8C9.65685 23 11 21.6569 11 20V16C11 14.3431 9.65685 13 8 13Z" fill="#CBCBCB"/>
							<path d="M20 13H16C14.3431 13 13 14.3431 13 16V20C13 21.6569 14.3431 23 16 23H20C21.6569 23 23 21.6569 23 20V16C23 14.3431 21.6569 13 20 13Z" fill="#CBCBCB"/>
						</svg>
					</Link> */}
				</div>
			</div>
			<div className="kanban-bx">
				<div className="kanbanPreview-bx">
					<div className="card-body">
						<ControlledBoard />
					</div>
				</div>
			</div>
			
		</Fragment>
	)
}
export default Kanban;