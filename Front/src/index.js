import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/store';
//import store from './store';

import reportWebVitals from './reportWebVitals';
import SimpleReactLightbox from "simple-react-lightbox";
import  ThemeContext  from "./context/ThemeContext"; 

ReactDOM.render(
	
		<Provider store = {store}>
			<SimpleReactLightbox>
			 <BrowserRouter basename="/agence">
				<ThemeContext>
					<App />
				</ThemeContext>
				 </BrowserRouter>
			</SimpleReactLightbox>	
		</Provider>	
	,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
