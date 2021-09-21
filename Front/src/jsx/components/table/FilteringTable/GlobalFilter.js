import React from 'react';

export const GlobalFilter = ( {filter, setFilter} ) =>{
	return(
		<div>
			Search : {' '}
			<input className="ml-2 input-search"
				value={filter || ''}  onChange={e => setFilter(e.target.value)} />
		</div>
	)
} 