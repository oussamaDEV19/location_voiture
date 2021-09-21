import React,{ useMemo } from 'react';
import {Link} from 'react-router-dom';
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
import MOCK_DATA from './MOCK_DATA_2.json';
import { COLUMNS } from './Columns';
import { GlobalFilter } from './GlobalFilter'; 
//import './table.css';
import './filtering.css';


export const FilteringTable = () => {
	const columns = useMemo( () => COLUMNS, [] )
	const data = useMemo( () => MOCK_DATA, [] )
	const tableInstance = useTable({
		columns,
		data,	
		initialState : {pageIndex : 0}
	}, useFilters, useGlobalFilter, usePagination)
	
	const { 
		getTableProps, 
		getTableBodyProps, 
		headerGroups, 
		prepareRow,
		state,
		page,
		gotoPage,
		pageCount,
		pageOptions,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		setGlobalFilter,
	} = tableInstance
	
	
	const {globalFilter, pageIndex} = state
	
	
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
						<li className="breadcrumb-item active"><Link to={"#"}>Filtering</Link></li>
					</ol>
				</div>
			</div>
			<div className="card">
				<div className="card-header">
					<h4 className="card-title">Table Filtering</h4>
				</div>
				<div className="card-body">
					<div className="table-responsive">
						<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
						<table {...getTableProps()} className="table filtering-table table-responsive-lg">
							<thead>
							   {headerGroups.map(headerGroup => (
									<tr {...headerGroup.getHeaderGroupProps()}>
										{headerGroup.headers.map(column => (
											<th {...column.getHeaderProps()}>
												{column.render('Header')}
												{column.canFilter ? column.render('Filter') : null}
											</th>
										))}
									</tr>
							   ))}
							</thead> 
							<tbody {...getTableBodyProps()} className="" >
							
								{page.map((row) => {
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
							{/* This is only for footer if u require 
							<tfoot>
								{footerGroups.map(footerGroup =>(
									<tr {...footerGroup.getFooterGroupProps()}>
										{footerGroup.headers.map(column =>(
											<td {...column.getFooterProps()}>{column.render('Footer')}</td>
										))}
									</tr>		
								))}
							</tfoot>*/}
						</table>
						<div className="d-flex table-index justify-content-between">
							<span>
								Page{' '}
								<strong>
									{pageIndex + 1} of {pageOptions.length}
								</strong>{''}
							</span>
							<span>
								Go to page : {' '}
								<input type="number" 
									className="ml-2 index-input"
									defaultValue={pageIndex + 1} 
									onChange = {e => { 
										const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0 
										gotoPage(pageNumber)
									} } 
                                />
							</span>
						</div>
						<div className="text-center">	
							<div className="filter-pagination  mt-3">
								<button className=" previous-button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
								
								<button className="previous-button" onClick={() => previousPage()} disabled={!canPreviousPage}>
									Previous
								</button>
								<button className="next-button" onClick={() => nextPage()} disabled={!canNextPage}>
									Next
								</button>
								<button className=" next-button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
	
}
export default FilteringTable;