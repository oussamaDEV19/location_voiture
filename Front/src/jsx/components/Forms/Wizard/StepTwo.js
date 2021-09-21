import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const StepOne = () => {

  const [voitures, setVoitures] = useState([]);


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:8800/api/voitures");
      setVoitures(
        res.data.map((item) => {
          return { value: item._id, label: item.nom + " (" +item.matricule + ")" };
        })
      );
    };
    fetchUser();
  }, []);


  const ClearIndicatorStyles = (base, state) => ({
    ...base,
    cursor: "pointer",
    color: state.isFocused ? "blue" : "black",
 });

 const CustomClearText = () => "clear all";
const ClearIndicator = (props) => {
   const {
      children = <CustomClearText />,
      getStyles,
      innerProps: { ref, ...restInnerProps },
   } = props;
   return (
      <div
         {...restInnerProps}
         ref={ref}
         style={getStyles("clearIndicator", props)}
      >
         <div style={{ padding: "0px 5px" }}>{children}</div>
      </div>
   );
};

   return (
      <section>
         <div className="row">
         <div className="col-xl-12">
          <div className="card">
            <div className="card-body " style={{textAlign: "left"}}>
              <div className="mb-4 " >
                <h4 className="card-title" >Deuxiement Choisir la Voiture </h4>
                <p>
                  Tu peut choisir un ou plusieur Voitures.
                </p>
              </div>
              <label className="select2-label">Chercher une voiture par son nom </label>
              <br />
              <div className="mt-4 pb-5">
              <Select 
                closeMenuOnSelect={false}
                components={{ ClearIndicator }}
                styles={{ clearIndicator: ClearIndicatorStyles }}
                isMulti
                options={voitures}
              />
              </div>
            </div>
          </div>
        </div>
         </div>
      </section>
   );
};

export default StepOne;
