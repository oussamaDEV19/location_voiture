import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Modal } from "react-bootstrap";
import { TabContent, TabPane } from "reactstrap";
import swal from "sweetalert";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useSelector, useDispatch } from "react-redux";

//Images


import axios from "axios";

const Contacts = () => {
  
  const [clients, setClients] = useState([]);
  const [nbClients, setNbClients] = useState([]);
  const PF = "http://localhost:8800/images/";

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:8800/api/clients");
      setClients(res.data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchResult = async () => {
      const res = await axios.get("http://localhost:8800/api/clients/result");

      setNbClients(res.data);
    };
    fetchResult();
  }, []);

  //tab function
  const [activeTab, setActiveTab] = useState("1");

  // This is Model function
  const [addContact, setAddContact] = useState(false);

  //Remove and delete List from Blog 'function'

  function handleRemove(_id) {
    const newList = clients.filter((item) => item._id !== _id);
    setClients(newList);
    axios.delete("http://localhost:8800/api/clients/" + _id);
    setNbClients(nbClients-1);
  }

  function handleMauvaise(_id , x) {
    if(x === 0){
      axios.put("http://localhost:8800/api/clients/mauvaise/" + _id , {"note" : "mauvaise"});
      window.location.reload();
    }else{
      axios.put("http://localhost:8800/api/clients/mauvaise/" + _id , {"note" : ""});
      window.location.reload();
    }
    
  }


  const [fullName, setFullName] = useState("");
  const [lieu, setLieu] = useState("");
  const [date, setDate] = useState("");
  const [idCard, setIdCard] = useState("");
  const [valable, setValable] = useState("");
  const [passport, setPassport] = useState("");
  const [pLe, setPLe] = useState("");
  const [pA, setPa] = useState("");
  const [permit, setPermit] = useState("");
  const [perLe, setPerLe] = useState("");
  const [perA, setPerA] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [file1, setFile1] = useState(null);
  const [disabled1, setDisabled1] = useState(false);
  const [disabled2, setDisabled2] = useState(false);

  const dataArr = {};

  //console.log(list);

  //Error message
  const handleClick = async (e) => {
    e.preventDefault();
    var error = false;
    var errorMsg = "";
    if (
      fullName === "" ||
      lieu === "" ||
      date === "" ||
      permit === "" ||
      perLe === "" ||
      perA === "" ||
      tel === "" ||
      email === ""
    ) {
      error = true;
      errorMsg = "S'il veut plait rempllir tous les champs !.";
    }

    if (idCard !== "" && passport !== "") {
      error = true;
      errorMsg = "remplir les champs de id card ou passport , pas les deux.";
    }

    if (!error) {
      //fetch data from Form
      dataArr.fullName = fullName;
      dataArr.lieuNaissance = lieu;
      dataArr.dateNaissance = date;
      dataArr.idCard = idCard;
      dataArr.valable = valable;
      dataArr.passport = passport;
      dataArr.passportLe = pLe;
      dataArr.passportA = pA;
      dataArr.permit = permit;
      dataArr.permitLe = perLe;
      dataArr.permitA = perA;
      dataArr.tel = tel;
      dataArr.email = email;
      dataArr.id = idCard !== "" ? idCard : passport;

      if (file1) {
        const data = new FormData();
        const fileName = Date.now() + file1.name;
        data.append("name", fileName);
        data.append("file", file1);
        dataArr.profilePicture = fileName;

        try {
          await axios.post("http://localhost:8800/api/upload", data);
        } catch (err) {
          console.log(err);
        }
      }

      const res = await axios.post(
        "http://localhost:8800/api/clients/add",
        dataArr
      );

      const ress = await axios.get("http://localhost:8800/api/clients");
      setClients(ress.data);
      setNbClients(nbClients+1);

      setAddContact(false);
      swal("Terminé !", "Ajouté avec succès", "success");

      setFullName("");
      setLieu("");
      setDate("");
      setIdCard("");
      setValable("");
      setPassport("");
      setPLe("");
      setPa("");
      setPermit("");
      setPerLe("");
      setPerA("");
      setTel("");
      setEmail("");
      setFile1(null);

    } else {
      swal("Oops", errorMsg, "error");
    }
  };

  //For Image upload in ListBlog

  const fileHandler = (e) => {
    setFile1(e.target.files[0]);
  };

  return (
    <Fragment>
      <div className="project-nav">
        <div className="card-action card-tabs  mr-auto">
          <ul className="nav nav-tabs style-2">
            <li className="nav-item">
              <Link to={"#"} className={"active nav-link"}>
                Tous Les Clients
                <span className="ml-1 badge badge-primary shadow-primary">
                  {nbClients}
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center">
          <Link
            to={"#"}
            id="btn-add-contact"
            onClick={() => setAddContact(true)}
            className="btn btn-primary rounded text-white"
          >
            + Nouveau Client
          </Link>
        </div>
        {/* <!-- Modal --> */}
        <Modal
          className="modal fade"
          id="addContactModal"
          show={addContact}
          onHide={setAddContact}
        >
          <div className="" role="document">
            <div className="">
              <form id="addContactModalTitle" onSubmit={handleClick}>
                <div className="modal-header">
                  <h4 className="modal-title fs-20">Ajouter Client</h4>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setAddContact(false)}
                    data-dismiss="modal"
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <i
                    className="flaticon-cancel-12 close"
                    data-dismiss="modal"
                  ></i>
                  <div className="add-contact-box">
                    <div className="add-contact-content">
                      <div className="image-placeholder">
                        <div className="avatar-edit">
                          <input
                            type="file"
                            onChange={fileHandler}
                            accept=".png,.jpeg,.jpg"
                            id="imageUpload"
                          />
                          <label htmlFor="imageUpload" name=""></label>
                        </div>
                        <div className="avatar-preview">
                          <div id="imagePreview">
                            <img
                              src={file1 ? URL.createObjectURL(file1) : PF + "noAvatar.png"}
                              alt={file1 ? file1.name : null}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="text-black font-w500">
                          Nom et Prenom
                        </label>
                        <div className="contact-name">
                          <input
                            type="text"
                            id="c-name"
                            className="form-control"
                            autocomplete="off"
                            value={fullName}
                            onChange={(event) =>
                              setFullName(event.target.value)
                            }
                            placeholder="Name"
                          />
                          <span className="validation-text"></span>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="text-black font-w500">
                          Lieu de Naissance
                        </label>
                        <div className="contact-occupation">
                          <input
                            type="text"
                            id="c-occupation"
                            autocomplete="off"
                            value={lieu}
                            onChange={(event) => setLieu(event.target.value)}
                            className="form-control"
                            placeholder="Adress"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="text-black font-w500">
                          Date de Naissance
                        </label>
                        <div className="contact-occupation">
                          <input
                            type="text"
                            id="c-occupation"
                            autocomplete="off"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            className="form-control"
                            placeholder="12-01-1992"
                          />
                        </div>
                      </div>

                      <div
                        style={{
                          border: "2px solid #e8e8e8",
                          borderRadius: "25px",
                          padding: "15px",
                          marginBottom: "20px",
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <div className="form-group col-md-6">
                            <label className="text-black font-w500">
                              Nº Id card
                            </label>
                            <div className="contact-occupation">
                              <input
                                type="text"
                                id="c-occupation"
                                autocomplete="off"
                                value={idCard}
                                onChange={(event) =>
                                  {
                                    setIdCard(event.target.value)
                                    setDisabled1(false);
                                    
                                    if(event.target.value !== "") {
                                      setDisabled2(true)
                                    }
                                    else{
                                      setDisabled2(false)
                                    }
                                  }
                                }
                                disabled = {(disabled1) ? "disabled" : ""}
                                className="form-control "
                                placeholder="J552203"
                              />
                            </div>
                          </div>

                          <div className="form-group col-md-6">
                            <label className="text-black font-w500">
                              Valable Jusqu'au
                            </label>
                            <div className="contact-occupation">
                              <input
                                type="text"
                                id="c-occupation"
                                autocomplete="off"
                                value={valable}
                                onChange={(event) =>
                                  setValable(event.target.value)
                                }
                                disabled = {(disabled1) ? "disabled" : ""}
                                className="form-control "
                                placeholder="10-12-2027"
                              />
                            </div>
                          </div>
                        </div>

                        <div
                          style={{ marginLeft: "40%", marginBottom: "10px" }}
                        >
                          OU BIEN
                        </div>

                        <div style={{ display: "flex" }}>
                          <div className="form-group col-md-4">
                            <label className="text-black font-w500">
                              Nº Passport
                            </label>
                            <div className="contact-occupation">
                              <input
                                type="text"
                                id="c-occupation"
                                autocomplete="off"
                                value={passport}
                                onChange={(event) => {
                                  setPassport(event.target.value)
                                  setDisabled2(false)
                                  if(event.target.value !== "") {
                                    setDisabled1(true)
                                  }else{
                                    setDisabled1(false)
                                  }
                                    
                                }
                                }
                                disabled = {(disabled2) ? "disabled" : ""}
                                className="form-control "
                                placeholder="J552203"
                              />
                            </div>
                          </div>

                          <div className="form-group col-md-4">
                            <label className="text-black font-w500">
                              Delivre Le
                            </label>
                            <div className="contact-occupation">
                              <input
                                type="text"
                                id="c-occupation"
                                autocomplete="off"
                                value={pLe}
                                onChange={(event) => setPLe(event.target.value)}
                                disabled = {(disabled2) ? "disabled" : ""}
                                className="form-control "
                                placeholder="10-12-2027"
                              />
                            </div>
                          </div>

                          <div className="form-group col-md-4">
                            <label className="text-black font-w500">A</label>
                            <div className="contact-occupation">
                              <input
                                type="text"
                                id="c-occupation"
                                autocomplete="off"
                                value={pA}
                                onChange={(event) => setPa(event.target.value)}
                                disabled = {(disabled2) ? "disabled" : ""}
                                className="form-control "
                                placeholder="10-12-2027"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex" }}>
                        <div className="form-group col-md-4">
                          <label className="text-black font-w500">
                            Nº Permit
                          </label>
                          <div className="contact-occupation">
                            <input
                              type="text"
                              id="c-occupation"
                              autocomplete="off"
                              value={permit}
                              onChange={(event) =>
                                setPermit(event.target.value)
                              }
                              className="form-control "
                              placeholder="J552203"
                            />
                          </div>
                        </div>

                        <div className="form-group col-md-4">
                          <label className="text-black font-w500">
                            Delivre Le
                          </label>
                          <div className="contact-occupation">
                            <input
                              type="text"
                              id="c-occupation"
                              autocomplete="off"
                              value={perLe}
                              onChange={(event) => setPerLe(event.target.value)}
                              className="form-control "
                              placeholder="10-12-2019"
                            />
                          </div>
                        </div>

                        <div className="form-group col-md-4">
                          <label className="text-black font-w500">A</label>
                          <div className="contact-occupation">
                            <input
                              type="text"
                              id="c-occupation"
                              autocomplete="off"
                              value={perA}
                              onChange={(event) => setPerA(event.target.value)}
                              className="form-control "
                              placeholder="10-12-2027"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="text-black font-w500">Tel</label>
                        <div className="contact-occupation">
                          <input
                            type="text"
                            id="c-occupation"
                            autocomplete="off"
                            value={tel}
                            onChange={(event) => setTel(event.target.value)}
                            className="form-control"
                            placeholder="0678987641"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="text-black font-w500">Email</label>
                        <div className="contact-occupation">
                          <input
                            type="text"
                            id="c-occupation"
                            autocomplete="off"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="form-control"
                            placeholder="example@gmail.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  {/*<button type="submit" id="btn-edit" className="float-left btn btn-primary">Save</button>*/}
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => setAddContact(false)}
                  >
                    {" "}
                    <i className="flaticon-delete-1"></i> Annuler
                  </button>
                  <button id="btn-add" className="btn btn-primary">
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
      <div className="tab-content">
        <div className="tab-pane fade show active" id="navpills-1">
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <PerfectScrollbar
                className="row dz-scroll  loadmore-content searchable-items list"
                id="allContactListContent"
              >
                <div className="items items-header-section"></div>

                {clients.map((item) => (
                  <div
                    className="col-xl-3 col-xxl-4 col-lg-4 col-md-6 col-sm-6 items"
                    key={item._id}
                  >
                    <div className="card contact-bx item-content">
                      <div className="card-header border-0">
                        <div className="action-dropdown">
                          <Dropdown className="">
                            <Dropdown.Toggle
                              variant=""
                              as="div"
                              className="i-false"
                            >
                              <Link
                                to={"#"}
                                data-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                                    stroke="#575757"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                  <path
                                    d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                                    stroke="#575757"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                  <path
                                    d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                                    stroke="#575757"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                </svg>
                              </Link>
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                              className="dropdown-menu-right"
                              alignRight={true}
                            >
                              <Dropdown.Item
                                className="delete text-danger"
                                onClick={() => {
                                  console.log(item._id);
                                  handleRemove(item._id);
                                }}
                              >
                                Delete
                              </Dropdown.Item>
                              { item.note === "" ? 
                              <Dropdown.Item
                                className="delete text-danger"
                                onClick={() => {
                                  handleMauvaise(item._id , 0);
                                }}
                              >
                                Problem
                              </Dropdown.Item>
                              :
                              <Dropdown.Item
                                className="delete text-success"
                                onClick={() => {
                                  handleMauvaise(item._id , 1);
                                }}
                              >
                                pas de problem
                              </Dropdown.Item>
                              }
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                      <div className="card-body user-profile">
                        <div className="image-bx">
                          <img
                            src={
                              item.profilePicture
                                ? PF + item.profilePicture
                                : PF + "noAvatar.png"
                            }
                            alt=""
                            className="rounded-circle"
                          />
                        </div>
                        <div className="media-body user-meta-info">
                          <h6 className="fs-20 font-w500 my-1">
                            
                              {item.fullName}
                            
                          </h6>
                          <p
                            className="fs-14 mb-3 user-work"
                            data-occupation="UI Designer"
                          >
                            Id : {item.id}
                          </p>
                          <ul>
                            <li>
                              <Link onClick={() =>{
                                swal("Telephone de " + item.fullName, item.tel, "info");
                              }}>
                                <i
                                  className="fa fa-phone"
                                  aria-hidden="true"
                                ></i>
                              </Link>
                            </li>
                            <li>
                              <Link onClick={() =>{
                                swal("Email de " + item.fullName, item.email, "info");
                              }}>
                                <i
                                  className="fa  fa-address-book"
                                  aria-hidden="true"
                                ></i>
                              </Link>
                            </li>
                            {
                              item.note === "" ? null : 
                              <li>
                              <Link onClick={() =>{
                                
                              }}
                              style={{backgroundColor: "#f7d1c9", color: "red" , fontSize: "17px" , width: "150px"}}>
                                Problems avec
                              </Link>
                            </li>
                            }
                            
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                
                
              </PerfectScrollbar>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </Fragment>
  );
};
export default Contacts;
