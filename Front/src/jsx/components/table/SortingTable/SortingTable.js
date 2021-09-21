import React,{ useMemo } from 'react';
import {Link} from 'react-router-dom';
import { useTable, useSortBy } from 'react-table';
import MOCK_DATA from './MOCK_DATA_3.json';
import { COLUMNS } from './Columns';
//import './table.css';

export const SortingTable = () => {
	
	const columns = useMemo( () => COLUMNS, [] )
	const data = useMemo( () => MOCK_DATA, [] )
	
	const tableInstance = useTable({columns,data},
		useSortBy
	)
	
	const { 
		getTableProps, 
		getTableBodyProps, 
		headerGroups,
		footerGroups,
		rows, 
		prepareRow,
	} = tableInstance
	
	return(
		<>	
			<div className="row page-titles mx-0">
				<div className="col-sm-6 p-md-0">
					<div className="welcome-text">
						<h4>Hi, welcome back!</h4>
						<p className="mb-0">Your business dashboard template</p>
					</div>
				</div>
				<div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
					<ol className="breadcrumb">
						<li className="breadcrumb-item"><Link to={"#"}>Table</Link></li>
						<li className="breadcrumb-item active"><Link to={"#"}>Sorting</Link></li>
					</ol>
				</div>
			</div>
			<div className="card">
				<div className="card-header">
					<h4 className="card-title">Table Sorting</h4>
				</div>
				<div className="card-body">
					<div className="table-responsive">
						<table {...getTableProps()} className="table table-striped ">
							<thead>
							   {headerGroups.map(headerGroup => (
									<tr {...headerGroup.getHeaderGroupProps()}>
										{headerGroup.headers.map(column => (
											<th {...column.getHeaderProps(column.getSortByToggleProps())}>
												{column.render('Header')}
												<span className="ml-1">
													{column.isSorted ? (column.isSortedDesc ?  <i className="fa fa-arrow-down" /> :  <i className="fa fa-arrow-up" /> ) : '' }
												</span>
											</th>
										))}
									</tr>
							   ))}
							</thead> 
							<tbody {...getTableBodyProps()}>
							
								{rows.map((row) => {
									prepareRow(row)
									return(
										<tr {...row.getRowProps()}>
											{row.cells.map((cell) => {
												return <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
											})}
											
										</tr>
									)
								})}
							</tbody>
							{/* This is only for footer if u require */}
							 <tfoot>
								{footerGroups.map(footerGroup =>(
									<tr {...footerGroup.getFooterGroupProps()}>
										{footerGroup.headers.map(column =>(
											<td {...column.getFooterProps()}>{column.render('Footer')}</td>
										))}
									</tr>		
								))}
							</tfoot> 
						</table>
					</div>
				</div>
			</div>
		</>
	)
	
}
export default SortingTable;