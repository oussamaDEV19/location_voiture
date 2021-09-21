import React from "react";

import Select from "react-select";




const options = [
   { value: "contrat n-212330", label: "n-213530" },
   { value: "contrat n-212230", label: "n-213520" },
   { value: "contrat n-213330", label: "n-213330" },
   { value: "contrat n-213230", label: "n-213220" },
   { value: "contrat n-443330", label: "n-213440" },
   { value: "contrat n-213640", label: "n-213336" },
];


const handleChange = function(e){
 this.setState({selectValue:e.target.value});
}
export default function customGroup() {


   return (
      <div >
         <Select placeholder="choisir une contrat" options={options} value={this.state.selectValue} onChange={(handleChange)}  />
      </div>
   );
}
