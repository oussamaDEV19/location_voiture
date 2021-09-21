import React from "react";
import { Link } from "react-router-dom";

const StepFour = () => {
   return (
      <section>
         <div className="row emial-setup">
            <div className="col-lg-4 col-sm-6 col-6">
               <div className="form-group">
                  <label
                     htmlFor="mailclient11"
                     className="mailclinet mailclinet-gmail"
                  >
                     <input
                        type="radio"
                        className="redio-false"
                        name="emailclient"
                        id="mailclient11"
                     />
                     <span className="mail-icon">
                        <i
                           className="mdi mdi-currency-usd-off"
                           aria-hidden="true"
                        ></i>
                     </span>
                     <span className="mail-text">CLINET NOT PAYE</span>
                  </label>
               </div>
            </div>

            <div className="col-lg-4 col-sm-6 col-6">
               <div className="form-group">
                  <label
                     htmlFor="mailclient13"
                     className="mailclinet mailclinet-drive"
                  >
                     <input
                        type="radio"
                        className="redio-false"
                        name="emailclient"
                        id="mailclient13"
                     />
                     <span className="mail-icon">
                        <i
                           className="mdi mdi-currency-usd"
                           aria-hidden="true"
                        ></i>
                     </span>
                     <span className="mail-text">CLINET PAYE</span>
                  </label>
               </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-6">
               <div className="form-group">
                  <label
                     htmlFor="mailclient14"
                     className="mailclinet mailclinet-another"
                  >
                     <input
                        type="radio"
                        className="redio-false"
                        name="emailclient"
                        id="mailclient14"
                     />
                     <span className="mail-icon">
                        <i
                           className="mdi mdi-file-pdf-box"
                           aria-hidden="true"
                        ></i>
                     </span>
                     <span className="mail-text">GENERATE CONTRAT (PDF)</span>
                  </label>
               </div>
            </div>
         </div>

         <div className="row">
            <div className="col-12">
               <div className="skip-email text-center pt-5 pb-2">
                  <p>tu peut marker un contrat comme paye ou non , et aussi de le generere comme un PDF</p>
                  <Link to="/" className="wizard-four-color">
                     Home Page
                  </Link>
               </div>
            </div>
         </div>
      </section>
   );
};

export default StepFour;
