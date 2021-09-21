import React,{Fragment} from 'react';
import CalendarData from '../Fasto/Calendar/CalendarData';

const DashboardCalendar = () =>{
	return(
		<Fragment>
			{/* <div id="calendar" class="app-fullcalendar dashboard-calendar">
			</div> */}				
			<CalendarData />
		</Fragment>
	)
}
export default DashboardCalendar;