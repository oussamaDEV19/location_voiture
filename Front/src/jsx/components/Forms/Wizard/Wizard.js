import React, { Fragment, useEffect, useRef, useState } from "react";
import Multistep from "react-multistep";

import StepOne from "./StepOne";
import PageTitle from "../../../layouts/PageTitle";
import { Link } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import swal from "sweetalert";

const Wizard = () => {
  const [voitures, setVoitures] = useState([]);
  const [clients, setClients] = useState([]);
  const [paye, setPaye] = useState(false);
  const [selectedClient, setSelectedClient] = useState([]);
  const [selectedVoiture, setSelectedVoiture] = useState([]);
  const carburantDepart = useRef();
  const kmDepart = useRef();
  const nbreJour = useRef();
  const pu = useRef();
  const prixLocation = useRef();
  const assurance = useRef();
  const frais = useRef();
  const montantHt = useRef();
  const montantTtc = useRef();
  const carburant = useRef();
  const depot = useRef();
  const solde = useRef();
  const statut = useRef();
  const jourDepart = useRef();
  const agenceDepart = useRef();
  const agenceReteur = useRef();
  const reteurPrevu = useRef();
  const mode = useRef();
  const franchise = useRef();
  const caution = useRef();

  const color1 = "#b2bec3";
  const color2 = "#27D26B";

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:8800/api/voitures");
      setVoitures(
        res.data.map((item) => {
          return {
            value: item._id,
            label: item.nom + " (" + item.matricule + ")",
          };
        })
      );
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:8800/api/clients");
      setClients(
        res.data.map((item) => {
          return {
            value: item._id,
            label: item.fullName + " (" + item.id + ")",
          };
        })
      );
    };
    fetchUser();
  }, []);

  const notPaye = () => {
    setPaye(false)
  }

  const Paye = () => {
    setPaye(true)
  }

  const enregistrer = async (e) => {
    e.preventDefault();
    if (
      selectedVoiture !== "" &&
      selectedClient !== "" &&
      carburantDepart.current.value !== "" &&
      kmDepart.current.value !== "" &&
      nbreJour.current.value !== "" &&
      pu.current.value !== "" &&
      prixLocation.current.value !== "" &&
      assurance.current.value !== "" &&
      frais.current.value !== "" &&
      montantHt.current.value !== "" &&
      montantTtc.current.value !== "" &&
      carburant.current.value !== "" &&
      depot.current.value !== "" &&
      jourDepart.current.value !== "" &&
      agenceDepart.current.value !== "" &&
      agenceReteur.current.value !== "" &&
      reteurPrevu.current.value !== "" &&
      mode.current.value !== "" &&
      franchise.current.value !== "" &&
      caution.current.value !== "" &&
      solde.current.value !== ""
    ) {
      
      const valls = [];
      selectedClient.forEach((e) => {
        valls.push(e.value)
      })

      const contratNew = {
        clients : valls,
        voiture : selectedVoiture[0].value,
        carburantDepart : carburantDepart.current.value,
        kmDepart : kmDepart.current.value,
        NbreJour : nbreJour.current.value,
        PU : pu.current.value,
        prixLocation : prixLocation.current.value,
        assurance : assurance.current.value,
        frais : frais.current.value,
        montantHT : montantHt.current.value,
        montantTTC : montantTtc.current.value,
        carburant : carburant.current.value,
        depot : depot.current.value,
        solde : solde.current.value ,
        jourDepart : jourDepart.current.value ,
        agenceDepart : agenceDepart.current.value ,
        agenceReteur : agenceReteur.current.value ,
        mode : mode.current.value ,
        franchise : franchise.current.value ,
        caution : caution.current.value ,
        reteurPrevu : reteurPrevu.current.value 
      };
      if(statut){
        contratNew.statut = "Non Paye"
      }else{
        contratNew.statut = "Paye"
      }
      const ress = await axios.post(
        "http://localhost:8800/api/contrats/add",
        contratNew
      );
      swal("Terminé !", "Ajouté avec succès", "success");
      
    } else {
      swal("Oops", "please remlir tous les champs de contrat !", "error");
    }
  }

  const handleChange = (options) => {
    setSelectedClient(options);
  };

  const handleChange2 = (options) => {
    setSelectedVoiture(options);
  };

  const CustomClearText = () => "clear all";
  const ClearIndicator1 = (props) => {
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

  const ClearIndicatorStyles = (base, state) => ({
    ...base,
    cursor: "pointer",
    color: state.isFocused ? "blue" : "black",
  });

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
    <Fragment>
      <PageTitle activeMenu="Contrat" motherMenu="Nouveau contrat" />

      <div className="row">
        <div className="col-xl-12 col-xxl-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Nouveau Contrat</h4>
            </div>
            <div className="card-body">
              <section>
                <div className="row">
                  <div className="col-xl-12">
                    <div className="card">
                      <div className="card-body " style={{ textAlign: "left" }}>
                        <div className="mb-4 ">
                          <h4 className="card-title">
                            Premierement Choisir le Client{" "}
                          </h4>
                          <p>Tu peut choisir un ou plusieur clients.</p>
                        </div>
                        <label className="select2-label">
                          Chercher un client avec son nom ou prenom ou cin
                          (passport)
                        </label>
                        <br />
                        <div className="mt-4 pb-5">
                          <Select
                            closeMenuOnSelect={false}
                            components={{ ClearIndicator }}
                            styles={{ clearIndicator: ClearIndicatorStyles }}
                            isMulti
                            options={clients}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <br />
              <br />
              <section>
                <div className="row">
                  <div className="col-xl-12">
                    <div className="card">
                      <div className="card-body " style={{ textAlign: "left" }}>
                        <div className="mb-4 ">
                          <h4 className="card-title">
                            Deuxiement Choisir la Voiture{" "}
                          </h4>
                          <p>Tu peut choisir un ou plusieur Voitures.</p>
                        </div>
                        <label className="select2-label">
                          Chercher une voiture par son nom{" "}
                        </label>
                        <br />
                        <div className="mt-4 pb-5">
                          <Select
                            closeMenuOnSelect={false}
                            components={{ ClearIndicator }}
                            styles={{ clearIndicator: ClearIndicatorStyles }}
                            isMulti
                            options={voitures}
                            onChange={handleChange2}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <br />
              <br />
              <section>
                <div className="row">
                  <div className="col-sm-2 mt-2">
                    <h4>Carburant depart</h4>
                  </div>
                  <div className="col-6 col-sm-3 mb-2">
                    <div className="form-group">
                      <input className="form-control" type="text" ref={carburantDepart} />
                    </div>
                  </div>
                  <div className="col-sm-2 mt-2">
                    <h4>Km Depart</h4>
                  </div>
                  <div className="col-6 col-sm-3 mb-2">
                    <div className="form-group">
                      <input className="form-control" type="text" ref={kmDepart} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-2 mt-2">
                    <h4>Nbre Jour</h4>
                  </div>
                  <div className="col-6 col-sm-3 mb-2">
                    <div className="form-group">
                      <input className="form-control" type="text" ref={nbreJour} />
                    </div>
                  </div>
                  <div className="col-sm-2 mt-2">
                    <h4>Carburant</h4>
                  </div>
                  <div className="col-6 col-sm-3 mb-2">
                    <div className="form-group">
                      <input className="form-control" type="text" ref={carburant} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-2 mt-2">
                    <h4>PU</h4>
                  </div>
                  <div className="col-6 col-sm-3 mb-2">
                    <div className="form-group">
                      <input className="form-control" type="text" ref={pu} />
                    </div>
                  </div>
                  <div className="col-sm-2 mt-2">
                    <h4>Montant TTC</h4>
                  </div>
                  <div className="col-6 col-sm-3 mb-2">
                    <div className="form-group">
                      <input className="form-control" type="text" ref={montantTtc} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-2 mt-2">
                    <h4>Prix Location</h4>
                  </div>
                  <div className="col-6 col-sm-3 mb-2">
                    <div className="form-group">
                      <input className="form-control" type="text" ref={prixLocation} />
                    </div>
                  </div>
                  <div className="col-sm-2 mt-2">
                    <h4>Montant HT</h4>
                  </div>
                  <div className="col-6 col-sm-3 mb-2">
                    <div className="form-group">
                      <input className="form-control" type="text" ref={montantHt} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-2 mt-2">
                    <h4>Assurance</h4>
                  </div>
                  <div className="col-6 col-sm-3 mb-2">
                    <div className="form-group">
                      <input className="form-control" type="text" ref={assurance} />
                    </div>
                  </div>
                  <div className="col-sm-2 mt-2">
                    <h4>Frais</h4>
                  </div>
                  <div className="col-6 col-sm-3 mb-2">
                    <div className="form-group">
                      <input className="form-control" type="text" ref={frais} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-2 mt-2">
                    <h4>Depot</h4>
                  </div>
                  <div className="col-6 col-sm-3 mb-2">
                    <div className="form-group">
                      <input className="form-control" type="text" ref={depot} />
                    </div>
                  </div>
                  <div className="col-sm-2 mt-2">
                    <h4>Solde</h4>
                  </div>
                  <div className="col-6 col-sm-3 mb-2">
                    <div className="form-group">
                      <input className="form-control" type="text" ref={solde} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-2 mt-2">
                    <h4>Jour Depart</h4>
                  </div>
                  <div className="col-6 col-sm-3 mb-2">
                    <div className="form-group">
                      <input className="form-control" type="text" ref={jourDepart} />
                    </div>
                  </div>
                  <div className="col-sm-2 mt-2">
                    <h4>Agence Depart</h4>
                  </div>
                  <div className="col-6 col-sm-3 mb-2">
                    <div className="form-group">
                      <input className="form-control" type="text" ref={agenceDepart} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-2 mt-2">
                    <h4>Agence Reteur</h4>
                  </div>
                  <div className="col-6 col-sm-3 mb-2">
                    <div className="form-group">
                      <input className="form-control" type="text" ref={agenceReteur} />
                    </div>
                  </div>
                  <div className="col-sm-2 mt-2">
                    <h4>Reteur Prevu</h4>
                  </div>
                  <div className="col-6 col-sm-3 mb-2">
                    <div className="form-group">
                      <input className="form-control" type="text" ref={reteurPrevu} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-2 mt-2">
                    <h4>Mode de reglement</h4>
                  </div>
                  <div className="col-6 col-sm-3 mb-2">
                    <div className="form-group">
                      <input className="form-control" type="text" ref={mode} />
                    </div>
                  </div>
                  <div className="col-sm-2 mt-2">
                    <h4>Montant Franchise</h4>
                  </div>
                  <div className="col-6 col-sm-3 mb-2">
                    <div className="form-group">
                      <input className="form-control" type="text" ref={franchise} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-2 mt-2">
                    <h4>Montant Caution</h4>
                  </div>
                  <div className="col-6 col-sm-3 mb-2">
                    <div className="form-group">
                      <input className="form-control" type="text" ref={caution} />
                    </div>
                  </div>
                </div>
              </section>
              <br />
              <br />
              <section>
                <div className="row emial-setup">
                <div className="col-lg-12  kip-email text-center pt-5 pb-2">
                      <p>
                        tu peut marker un contrat comme paye ou non paye
                      </p>
                      </div>
                  <div className="col-lg-6 col-sm-6 col-6">
                    <div className="form-group" >
                      <label
                        htmlFor="mailclient11"
                        className="mailclinet mailclinet-gmail"
                        style={{   backgroundColor: paye ? color1 : color2 , color: "white" }}
                        onClick={(notPaye)}
                      >
                        <span className="mail-icon" >
                          <i
                            className="mdi mdi-currency-usd-off"
                            aria-hidden="true"
                          ></i>
                        </span>
                        <span className="mail-text">CLIENT NOT PAYE</span>
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-6 col-sm-6 col-6">
                    <div className="form-group">
                      <label
                        htmlFor="mailclient13"
                        className="mailclinet mailclinet-drive"
                        style={{   backgroundColor: paye ? color2: color1 , color: "white"}}
                        onClick={(Paye)}
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
                        <span className="mail-text">CLIENT PAYE</span>
                      </label>
                    </div>
                  </div>
                  
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="skip-email text-center pt-5 pb-2">
                      <p>
                        Enregistrer et exporter le pdf par une seul click
                      </p>
                      <div className="col-lg-12 col-sm-6 col-6">
                    <div className="form-group">
                      <label
                        htmlFor="mailclient14"
                        className="mailclinet mailclinet-another"
                        style={{   backgroundColor: "#74b9ff" , color: "white"}}
                        onClick={(enregistrer)}
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
                        <span className="mail-text">
                          Enregistrer et Generer le PDF
                        </span>
                      </label>
                    </div>
                  </div>
                      <Link to="/" className="wizard-four-color">
                        Home Page
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Wizard;
