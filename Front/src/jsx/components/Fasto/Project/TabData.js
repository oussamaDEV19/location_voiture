import React from 'react';
import {Link} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';
import project1 from './../../../../images/bmw.png';
import project2 from './../../../../images/clio4.png';
import project3 from './../../../../images/dacia-logan.jpg';
import project4 from './../../../../images/dasia-duster.png';
import project5 from './../../../../images/golf-polo.png';
import project6 from './../../../../images/range-rover.jpg';
import project7 from './../../../../images/volkswagen-golf-7.jpg';
import project8 from './../../../../images/projects/Untitled-8.jpg';
import project9 from './../../../../images/projects/Untitled-9.jpg';
import project10 from './../../../../images/projects/Untitled-10.jpg';

//Grid  

import img1 from './../../../../images/bmw.png';
import img2 from './../../../../images/clio4.png';
import img3 from './../../../../images/dacia-logan.jpg';
import img4 from './../../../../images/dasia-duster.png';
import img5 from './../../../../images/golf-polo.png';
import img6 from './../../../../images/range-rover.jpg';
import img7 from './../../../../images/volkswagen-golf-7.jpg';
import img8 from './../../../../images/clio4.png';

const PendingBlog = () =>{
	return(
		<Link to={"#"} className="btn btn-warning light status-btn">PENDING</Link>
	)
}
const ProgresBlog = () =>{
	return(
		<Link to={"#"} className="btn btn-info light status-btn">ON PROGRESS</Link>
	)
}
const CloseBlog = () =>{
	return(
		<Link to={"#"} className="btn btn-danger light status-btn">CLOSED</Link>
	)
}

const GridProcess = () =>{
	return(
		<span className="badge badge-info">Disponible</span>
	)
}
const GridPending = () =>{
	return(
		<span className="badge badge-warning">En attente</span>
	)
}
const GridClosed = () =>{
	return(
		<span className="badge badge-danger">Pris</span>
	)
}



const TousVoitures = [
	{id: '824000 | S | 54', title: 'BMW modele 2021', imageblog: img1, result: <GridProcess />  },
	{id: '823300 | A | 33', title: 'Clio 4', imageblog: img2, result: <GridClosed /> , jourDepart : "Mercredi, Sep 26th 2020" , jourReteur : "Lundi, Sep 26th 2020" ,  client : "Saad Raji"},
	{id: '664000 | S | 54', title: 'Dacia Logan', imageblog: img3, result: <GridProcess /> , jourDepart : "Jeudi, Sep 26th 2020" , jourReteur : "Lundi, Sep 26th 2020" , client : "Khalid Miri"},
	{id: '854060 | A | 33', title: 'Dacia Duster', imageblog: img4, result: <GridPending /> },
	{id: '924070 | S | 54', title: 'Golf Polo', imageblog: img5, result: <GridClosed /> , jourDepart : "Mercredi, Sep 26th 2020" , jourReteur : "Lundi, Sep 26th 2020" , client : "Issam Sbai" },
	{id: '424500 | A | 33', title: 'Range Rover', imageblog: img6, result: <GridProcess /> , jourDepart : "Dimanche, Sep 26th 2020" , jourReteur : "Lundi, Sep 26th 2020" , client : "Houssam Miri"},
	{id: '324770 | S | 54', title: 'Volkswagen golf 7', imageblog: img7, result: <GridPending /> , jourDepart : "Vendredi, Sep 26th 2020" },
	{id: '884550 | A | 33', title: 'Clio 5', imageblog: img8, result: <GridProcess />  },
];

const TabData = () =>{
	return(
		<>
		</>
	)
}



  
function DropdownBlog(){
	return(
		<>
			<Dropdown>
				<Dropdown.Toggle variant="" as="div" className="i-false">	
					<Link to={"#"} data-toggle="dropdown" aria-expanded="false">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
							<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
							<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
						</svg>
					</Link>
				</Dropdown.Toggle>	
				<Dropdown.Menu  className="dropdown-menu-left">
					<Dropdown.Item >Edit </Dropdown.Item>		
					<Dropdown.Item >Delete </Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</>
	)
}
export {TousVoitures , DropdownBlog};
export default TabData;