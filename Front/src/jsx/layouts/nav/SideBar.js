/// Menu
import MetisMenu from "metismenujs";
import React, {
  Component,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Modal } from "react-bootstrap";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";
import useScrollPosition from "use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
import Select from "react-select";
import axios from "axios";
import swal from "sweetalert";

//import profile from "../../../images/Untitled-1.jpg";
class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new MetisMenu(this.$el);
  }
  componentWillUnmount() {
    //  this.mm("dispose");
    // console.log(this.mm);
  }
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

const SideBar = () => {
  const [tcontrats, setTContrats] = useState([]);
  const [options, setTOptions] = useState([]);

  const [newProject, setNewProject] = useState(false);
  const {
    iconHover,
    sidebarposition,
    headerposition,
    sidebarLayout,
  } = useContext(ThemeContext);

  const loading = async () => {
    console.log("dddddddddddddddd");
    const res = await axios.get("http://localhost:8800/api/contrats/data");
    //setTContrats(res.data);
    setTOptions(
      res.data.map((item) => {
        return { value: item.id, label: item.data };
      })
    );
  };

  let scrollPosition = useScrollPosition();
  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  /// Active menu
  let deshBoard = [""],
    contrats = ["avancement", "nouveauContrat", "tousContrats"],
    pdf = ["pdf-export"],
    client = ["clients"],
    avancement = ["voitures"];

  const avance = useRef();
  const de = useRef();
  const a = useRef();
  const [contrat, setContrat] = useState("");

  const handleClick = async () => {
    if (
      avance.current.value !== "" &&
      de.current.value !== "" &&
      a.current.value !== "" &&
      contrat !== ""
    ) {
      setNewProject(false);
      const prolongation = {
        debut: de.current.value,
        fin: a.current.value,
        avance: avance.current.value,
        contratId: contrat,
      };
      const ress = await axios.post(
        "http://localhost:8800/api/prolongations/add",
        prolongation
      );
      swal("Terminé !", "Ajouté avec succès", "success").then(() => {
        window.location.reload();
      });
      
    } else {
      swal("Oops", "please remlir tous les champs !", "error");
    }
  };

  return (
    <div
      className={`deznav ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? scrollPosition > 120
            ? "fixed"
            : ""
          : ""
      }`}
    >
      {/* <!-- Add Project --> */}
      <Modal
        className="modal fade"
        id="addProjectSidebar"
        show={newProject}
        onHide={setNewProject}
      >
        <div className="" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Nouvelle prolongation</h5>
              <button
                type="button"
                className="close"
                onClick={() => {
                  setNewProject(false);
                }}
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="text-black font-w500">Contrat</label>
                  <Select
                    placeholder="choisir une contrat"
                    options={options}
                    onChange={(e) => {
                      setContrat(e.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="text-black font-w500">Avance</label>
                  <input type="text" className="form-control" ref={avance} />
                </div>
                <div className="form-group">
                  <label className="text-black font-w500">
                    Prolongation du
                  </label>
                  <input type="date" className="form-control" ref={de} />
                </div>
                <div className="form-group">
                  <label className="text-black font-w500">au</label>
                  <input type="date" className="form-control" ref={a} />
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleClick}
                  >
                    CRÉER
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>

      <PerfectScrollbar className="deznav-scroll">
        {/* <div className="main-profile">
			<img src={profile} alt="" />
			<Link to={"#"}><i className="fa fa-cog" aria-hidden="true"></i></Link>
			<h5 className="mb-0 fs-20 text-black "><span className="font-w400">Hello,</span> Marquez</h5>
			<p className="mb-0 fs-14 font-w400">marquezzzz@mail.com</p>
	  </div> */}
        <Link
          to={"#"}
          className="add-project-sidebar btn btn-primary"
          onClick={() => {
            loading();
            setNewProject(true);
          }}
        >
          Nouvelle Prolongation
        </Link>
        <MM className="metismenu" id="menu">
          <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="/">
              {" "}
              <i className="flaticon-047-home"></i>
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>
          <li className={`${contrats.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="/tous-les-contrats">
              <i className="flaticon-044-menu"></i>
              <span className="nav-text">Contrats</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "tousContrats" ? "mm-active" : ""}`}
                  to="/tous-les-contrats"
                >
                  Tous Les Contrats
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "nouveauContrat" ? "mm-active" : ""}`}
                  to="/nouveau-contrat"
                >
                  Nouveau Contrat
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "avancement" ? "mm-active" : ""}`}
                  to="/avancements"
                >
                  Tous Les Prolongations
                </Link>
              </li>
            </ul>
          </li>

          <li className={`${client.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="/clients">
              <i className="flaticon-086-star"></i>
              <span className="nav-text">Clients</span>
            </Link>
          </li>

          <li className={`${avancement.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="/voitures">
              <i className="flaticon-038-gauge"></i>
              <span className="nav-text">Voitures</span>
            </Link>
          </li>

          <li className={`${pdf.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="/pdf-export">
              <i className="flaticon-072-printer"></i>
              <span className="nav-text forms">Export CONTRAT VIDE</span>
            </Link>
          </li>
        </MM>
        <div className="copyright">
          <p>
            <strong>Location des voitures dashboard</strong> © 2021 All Rights
            Reserved
          </p>
          <p className="fs-12">
            Made with <span className="heart"></span> by Oussama&Houssam
          </p>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
