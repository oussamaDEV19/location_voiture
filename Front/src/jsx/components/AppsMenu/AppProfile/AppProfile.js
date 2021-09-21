import React, { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios"

import PageTitle from "../../../layouts/PageTitle";
import swal from "sweetalert";

const AppProfile = () => {

  const [agence, setAgence] = useState({});
  const email = useRef();
  const password = useRef();
  const address = useRef();
  const address2 = useRef();
  const nom = useRef();
  const sarl = useRef();
  const rc = useRef();
  const pat = useRef();
  const IF = useRef();
  const cnss = useRef();
  const tel = useRef();
  const fax = useRef();
  const gsm = useRef();
  const logo = useRef();
  const profileImg = useRef();

  const [file1, setFile1] = useState(null)
  const [file2, setFile2] = useState(null)


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:8800/api/agences/61460dbb02f0294a903e9498");
      setAgence(res.data)
    };
    fetchUser();
  }, []);
  
  const handleClick = async () => {
    const agenceUpdated = {
      email: email.current.value,
      password: password.current.value,
      address: address.current.value,
      address2: address2.current.value,
      nom: nom.current.value,
      sarl: sarl.current.value,
      rc: rc.current.value,
      pat: pat.current.value,
      if: IF.current.value,
      cnss: cnss.current.value,
      tel: tel.current.value,
      fax: fax.current.value,
      gsm: gsm.current.value
    }

    if(file1){

      const data = new FormData();
      const fileName = Date.now() + file1.name;
      data.append("name", fileName);
      data.append("file", file1);
      agenceUpdated.logo = fileName;

      try{
          await axios.post("http://localhost:8800/api/upload" , data);
      }catch(err){
          console.log(err)
      }
  }

    if(file2){

      const data = new FormData();
      const fileName = Date.now() + file2.name;
      data.append("name", fileName);
      data.append("file", file2);
      agenceUpdated.profileImg = fileName;

      try{
          await axios.post("http://localhost:8800/api/upload" , data);
      }catch(err){
          console.log(err)
      }
  }

    const res = await axios.put("http://localhost:8800/api/agences/" + agence._id , agenceUpdated);
    swal("Enregistrer !", "Enregistrer avec succès", "success");
  }

  return (
    <Fragment>
      <PageTitle activeMenu="Profile" motherMenu="App" />

      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <div className="pt-3">
                <div className="settings-form">
                  <h4 className="text-primary">Votre Informations</h4>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label>Email</label>
                        <input
                          type="email"
                          className="form-control"
                          defaultValue={agence.email}
                          ref={email}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control"
                          defaultValue={agence.password}
                          ref={password}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={agence.address}
                          ref={address}
                      />
                    </div>
                    <div className="form-group">
                      <label>Address 2</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={agence.address2}
                          ref={address2}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label>Nom de L'agence</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={agence.nom}
                          ref={nom}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label>sarl au capital</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={agence.sarl}
                          ref={sarl}
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>RC</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={agence.rc}
                          ref={rc}
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>PAT</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={agence.pat}
                          ref={pat}
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>IF</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={agence.if}
                          ref={IF}
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>CNSS</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={agence.cnss}
                          ref={cnss}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label>TEL</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={agence.tel}
                          ref={tel}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label>FAX</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={agence.fax}
                          ref={fax}
                        />
                      </div>

                      <div className="form-group col-md-4">
                        <label>GSM</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={agence.gsm}
                          ref={gsm}
                        />
                      </div>

                      <div className="form-group col-md-6">
					  <label>Logo de l'agence</label>
                        <div className="custom-file">
                        <input
                            className="custom-file-input"
                            type="file"
                            id="file"
                            accept=".png,.jpeg,.jpg"
                            onChange={(e) => setFile1(e.target.files[0])}
                        />
                          <label className="custom-file-label">
                            Choose file
                          </label>
                        </div>
                        {file1 && (
                <div>
                    <img className="shareImg" width="100" style={{marginTop : "20px"}} height="100"src={URL.createObjectURL(file1)} alt="" />
                </div>
                )}
                      </div>

                      <div className="form-group col-md-6">
					  <label>Image de L'administrateur</label>
                        <div className="custom-file">
                        <input
                            className="custom-file-input"
                            type="file"
                            id="file"
                            accept=".png,.jpeg,.jpg"
                            onChange={(e) => setFile2(e.target.files[0])}
                        />
                          <label className="custom-file-label">
                            Choose file
                          </label>
                        </div>
                        {file2 && (
                <div>
                    <img className="shareImg" width="100" style={{marginTop : "20px"}} height="100"src={URL.createObjectURL(file2)} alt="" />
                </div>
                )}
                      </div>

                      
                    </div>
                    <button className="btn btn-primary" type="submit" onClick={(handleClick)} >
                      Enregistrer
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AppProfile;
