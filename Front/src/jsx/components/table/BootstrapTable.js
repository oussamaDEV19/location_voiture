import React, { Fragment, useEffect, useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Dropdown,
  ProgressBar,
} from "react-bootstrap";

/// imge
import avatar1 from "../../../images/avatar/1.jpg";
import avatar2 from "../../../images/avatar/2.jpg";
import avatar3 from "../../../images/avatar/3.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";

const BootstrapTable = () => {
  const [contrats, setContarts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:8800/api/contrats");
      setContarts(res.data);
    };
    fetchUser();
  }, []);

  const handleRemove = async (_id) => {
    const newList = contrats.filter((item) => item._id !== _id);
    setContarts(newList);
    axios.delete("http://localhost:8800/api/contrats/" + _id);
  }

  const handlePayed = async (_id) => {
    axios.put("http://localhost:8800/api/contrats/payed/" + _id  , {"statut" : "Paye"}) ;
    window.location.reload();
  }

  const chackbox = document.querySelectorAll(".bs_exam_topper input");
  const motherChackBox = document.querySelector(".bs_exam_topper_all input");
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === "all") {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };
  const svg1 = (
    <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect x="0" y="0" width="24" height="24"></rect>
        <circle fill="#000000" cx="5" cy="12" r="2"></circle>
        <circle fill="#000000" cx="12" cy="12" r="2"></circle>
        <circle fill="#000000" cx="19" cy="12" r="2"></circle>
      </g>
    </svg>
  );

  return (
    <Fragment>
      <PageTitle activeMenu="Tableau" motherMenu="Tous Les contrats" />
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Tous Les contrats</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <strong>creation</strong>
                    </th>
                    <th>
                      <strong>CLIENT</strong>
                    </th>
                    <th>
                      <strong>VOITURE</strong>
                    </th>
                    <th>
                      <strong>NBRE Jour</strong>
                    </th>
                    <th>
                      <strong>STATUT</strong>
                    </th>
                    <th>
                      <strong>PRICE</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {contrats.map((item) => (
                    <tr key={item._id}>
                      <td>
                        Created {format(item.createdAt)} 
                      </td>
                      <td>{item.nomClient}</td>
                      <td>{item.nomVoiture}</td>
                      <td>{item.NbreJour} Jours</td>
                      <td>
                        {
                        item.statut === "Paye" ?
                        <Badge variant="success light">
                          {item.statut}
                        </Badge> :
                        <Badge variant="danger light">{item.statut}</Badge>}  
                      </td>
                      <td><strong>{item.prixLocation} DH </strong></td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="primary"
                            className="light sharp i-false"
                          >
                            {svg1}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                            onClick={() => {
                              window.open("http://localhost:3000/agence/pdf-export?idContrat=" + item._id, "_blank")
                            }}
                            >Exporter</Dropdown.Item>
                            <Dropdown.Item 
                            onClick={() => {
                              handleRemove(item._id);
                            }}
                            >Supprimer</Dropdown.Item>
                            {
                              item.statut === "Paye" ? null : <Dropdown.Item
                              onClick={() => {
                                handlePayed(item._id);
                              }}
                              >Paye</Dropdown.Item>
                            }
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default BootstrapTable;
