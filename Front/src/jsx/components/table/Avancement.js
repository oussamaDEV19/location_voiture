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

const BootstrapTable = () => {
  const chackbox = document.querySelectorAll(".bs_exam_topper input");
  const motherChackBox = document.querySelector(".bs_exam_topper_all input");

  const [prolongations, setProlongations] = useState([]);


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:8800/api/prolongations");
      setProlongations(res.data);
    };
    fetchUser();
  }, []);

  const handleRemove = async(_id) => {
    const newList = prolongations.filter((item) => item._id !== _id);
    setProlongations(newList);
    axios.delete("http://localhost:8800/api/prolongations/" + _id);
  }


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
      <PageTitle activeMenu="Tableau" motherMenu="Tous Les Prolongations" />
      <Row >
        <Col lg={12} >
          <Card >
            <Card.Header>
              <Card.Title>Tous Les Prolongations</Card.Title>
            </Card.Header>
            <Card.Body >
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <strong>Contrat</strong>
                    </th>
                    <th>
                      <strong>Avance</strong>
                    </th>
                    <th>
                      <strong>DE</strong>
                    </th>
                    <th>
                      <strong>AU</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    prolongations.map((item, index) => (

                    <tr>
                      <td>{item.data}</td>
                      <td>{item.avance}</td>
                      <td>{item.debut}</td>
                      <td>{item.fin}</td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="success"
                            className="light sharp i-false"
                          >
                            {svg1}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => {
                                  handleRemove(item._id);
                                }} >Delete</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                    ))
                  }

                  
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
