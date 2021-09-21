import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Modal } from "react-bootstrap";
import { TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import axios from "axios";
import { format } from "timeago.js";
import swal from "sweetalert";

//import img1 from './../../../images/big/img1.jpg';

const Project = () => {
  const [newProject, setNewProject] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const [matricule, setMatricule] = useState("");
  const [nom, setNom] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [boiteVitess, setBoiteVitess] = useState("");
  const [file1, setFile1] = useState(null);

  const [voitures, setVoitures] = useState([]);
  const [nbvoitures, setNbVoitures] = useState([]);
  const PF = "http://localhost:8800/images/";

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:8800/api/voitures");
      setVoitures(res.data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchResult = async () => {
      const res = await axios.get("http://localhost:8800/api/voitures/result");

      setNbVoitures(res.data);
    };
    fetchResult();
  }, []);

  const fileHandler = (e) => {
    setFile1(e.target.files[0]);
  };

  function handleRemove(_id) {
    const newList = voitures.filter((item) => item._id !== _id);
    setVoitures(newList);
    axios.delete("http://localhost:8800/api/voitures/" + _id);
    setNbVoitures(nbvoitures-1);
  }

  const dataArr = {};

  const ajouterVoiture = async () => {
    var error = false;
    var errorMsg = "";
    if (
      matricule === "" ||
      nom === "" ||
      model === "" ||
      color === "" ||
      boiteVitess === ""
    ) {
      error = true;
      errorMsg = "S'il veut plait rempllir tous les champs !.";
    }

    if (!error) {
      //fetch data from Form
      dataArr.matricule = matricule;
      dataArr.nom = nom;
      dataArr.model = model;
      dataArr.color = color;
      dataArr.boiteVitess = boiteVitess;

      if (file1) {
        const data = new FormData();
        const fileName = Date.now() + file1.name;
        data.append("name", fileName);
        data.append("file", file1);
        dataArr.image = fileName;

        try {
          await axios.post("http://localhost:8800/api/upload", data);
        } catch (err) {
          console.log(err);
        }
      }

      const res = await axios.post(
        "http://localhost:8800/api/voitures/add",
        dataArr
      );

      const ress = await axios.get("http://localhost:8800/api/voitures");
      setVoitures(ress.data);
      setNbVoitures(nbvoitures + 1);

      setNewProject(false);
      swal("Terminé !", "Ajouté avec succès", "success");

      setMatricule("");
      setNom("");
      setColor("");
      setModel("");
      setBoiteVitess("");
      setFile1(null);
    } else {
      swal("Oops", errorMsg, "error");
    }
  };

  var grid = document.querySelectorAll(".tab-class");

  var fch = [].slice.call(grid);
  for (var y = 0; y < fch.length; y++) {
    fch[y].addEventListener("click", function() {
      Tabblog(this);
    });
  }

  function Tabblog(current) {
    var list = document.querySelector("#ListViewTabLink");
    var boxed = document.querySelector("#BoxedViewTabLink");

    //var listing = list.classList.remove('d-none');
    //var boxing = boxed.classList.add('d-none');

    var id = current.getAttribute("id");
    console.log(id);

    if (id === "BoxedTab") {
      boxed.classList.remove("d-none");
      list.classList.add("d-none");
    } else if (id === "ListViewTab") {
      list.classList.remove("d-none");
      boxed.classList.add("d-none");
    }
  }

  return (
    <Fragment>
      <div className="project-nav">
        <div className="card-action card-tabs  mr-auto">
          <ul className="nav nav-tabs style-2 " id="BoxedViewTabLink">
            <li className="nav-item">
              <Link
                to={"#"}
                className={
                  classnames({ active: activeTab === "1" }) + " nav-link"
                }
                onClick={() => {
                  setActiveTab("1");
                }}
              >
                Tous les voitures
                <span className="ml-1 badge badge-pill shadow-primary badge-primary">
                  {nbvoitures}
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <Link
          to={"#"}
          onClick={() => setNewProject(true)}
          className="btn btn-primary rounded text-white"
        >
          Nouvelle Voiture
        </Link>

        {/* <!-- Add Order --> */}
        <Modal className="modal fade" show={newProject} onHide={setNewProject}>
          <div className="" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ajouter Voiture</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setNewProject(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label className="text-black font-w500">
                      Immatriculation
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={matricule}
                      onChange={(event) => setMatricule(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-black font-w500">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      value={nom}
                      onChange={(event) => setNom(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-black font-w500">Model</label>
                    <input
                      type="text"
                      className="form-control"
                      value={model}
                      onChange={(event) => setModel(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-black font-w500">Color</label>
                    <input
                      type="text"
                      className="form-control"
                      value={color}
                      onChange={(event) => setColor(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-black font-w500">Boite Vitess</label>
                    <input
                      type="text"
                      className="form-control"
                      value={boiteVitess}
                      onChange={(event) => setBoiteVitess(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-black font-w500">
                      Image de Voiture
                    </label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        onChange={fileHandler}
                        accept=".png,.jpeg,.jpg"
                      />
                      <label className="custom-file-label">Choose file</label>
                    </div>
                    {file1 && (
                      <div>
                        <img
                          className="shareImg"
                          width="100"
                          style={{ marginTop: "20px" }}
                          height="100"
                          src={URL.createObjectURL(file1)}
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={ajouterVoiture}
                    >
                      Ajouter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
      </div>

      <div className="tab-content project-list-group" id="myTabContent">
        <div className="tab-pane fade active show" id="navpills-1">
          <TabContent>
            <TabPane>
              <div className="row">
                {voitures.map((item, index) => (
                  <div
                    className="col-xl-3 col-xxl-4 col-lg-4 col-md-6 col-sm-6"
                    key="index"
                  >
                    <div className="card project-boxed">
                      <div className="img-bx">
                        <img
                          src={item.image ? PF + item.image : PF + "noCar.png"}
                          style={{ height: "210px", objectFit: "cover" }}
                          alt=""
                          className="w-100"
                        />
                        {item.result}
                      </div>
                      <div className="card-header align-items-start">
                        <div>
                          <p className="fs-14 mb-2 text-primary">
                            {item.matricule}
                          </p>
                          <h6 className="fs-18 font-w500 mb-3">
                            <Link to={"#"} className="text-black user-name">
                              {item.nom}
                            </Link>
                          </h6>
                          <div className="text-dark fs-14 text-nowrap">
                            <i
                              className="fa fa-calendar-o mr-3"
                              aria-hidden="true"
                            ></i>
                            Created {format(item.createdAt)}
                          </div>
                        </div>
                        <Dropdown>
                          <Dropdown.Toggle variant="" as="div" className="i-false">	
                            <Link to={"#"} data-toggle="dropdown" aria-expanded="false">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg>
                            </Link>
                          </Dropdown.Toggle>	
                          <Dropdown.Menu  className="dropdown-menu-left">
                            <Dropdown.Item onClick={() => {
                                  handleRemove(item._id);
                                }} >Delete </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="card-body p-0 pb-3">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            <span className="mb-0 title">Model</span> :
                            <span className="text-black ml-2">
                              {item.model}
                            </span>
                          </li>
                          <li className="list-group-item">
                            <span className="mb-0 title">Boite Vitesse</span> :
                            <span className="text-black ml-2">
                              {item.boiteVitess}
                            </span>
                          </li>
                          <li className="list-group-item">
                            <span className="mb-0 title">Color</span> :
                            <span className="text-black ml-2">
                              {item.color}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </Fragment>
  );
};
export default Project;
