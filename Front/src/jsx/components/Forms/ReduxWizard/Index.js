import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
//import { Values } from "redux-form-website-template";
//import store from "./store";
import showResults from "./../ReduxForm/ShowResults";
import WizardForm from "./WizardForm";

/* const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <h2>Wizard Example</h2>
      <WizardForm onSubmit={showResults} />
      <Values form="wizard" />
    </div>
  </Provider>,
  rootEl
); */

function Index(){
	return(	
		<>
		
			<div className="row justify-content-center">
				<div className="col-md-4">
					<div className="card">
						<div className="card-header">
							<h4 className="card-title">Form Step</h4>
						</div>
						<div className="card-body">
							<WizardForm onSubmit={showResults} />
							{/* <Values form="wizard" /> */}
						</div>
					</div>	
				</div>
				<div className="col-md-4" >
					<div className="card">
						<div className="card-header">
							<h4 className="card-title">Result</h4>
						</div>
						<div className="card-body">
							<pre id="ReduxFormJSON">
							</pre>
						</div>
					</div>
				</div> 
			</div>					
		</>
	)
}
export default Index;