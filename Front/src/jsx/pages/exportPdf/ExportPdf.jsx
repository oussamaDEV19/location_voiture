import "./exportPdf.css"
import car from "../../../images/car.png";
import jsPDF from "jspdf";
import domtoimage from 'dom-to-image';
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";


export default function ExportPdf() {


    const [agence, setAgence] = useState([]);
    const [client, setClient] = useState([]);
    const [client2, setClient2] = useState([]);
    const [contrat, setContrat] = useState([]);
    const [voiture, setVoiture] = useState([]);
    const [prolongations, setProlongations] = useState([]);


    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('idContrat');


    const PF = "http://localhost:8800/images/";
  
    useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get("http://localhost:8800/api/agences/61460dbb02f0294a903e9498");
          setAgence(res.data)
        };
        fetchUser();
      }, []);

      useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get("http://localhost:8800/api/contrats/"+id);
          setContrat(res.data)
          const res2 = await axios.get("http://localhost:8800/api/prolongations");
          res2.data.forEach((item) => {
              console.log("sssss" + contrat._id)
              if(item.contratId === res.data._id){
                  setProlongations([...prolongations , item])
              }
          })
          const res3 = await axios.get("http://localhost:8800/api/clients/"+res.data.clients[0]);
          setClient(res3.data)
          const res4 = await axios.get("http://localhost:8800/api/voitures/"+res.data.voiture);
          setVoiture(res4.data)
          if(res.data.clients[1]){
            const res5 = await axios.get("http://localhost:8800/api/clients/"+res.data.clients[1]);
            setClient2(res5.data)
          }
          
        };
        fetchUser();
      }, []);

      

      
    
    const generatePDF = () => {

        const input = document.getElementById('pddf');
            const pdf = new jsPDF();
            if (pdf) {
              domtoimage.toPng(input)
                .then(imgData => {
                  pdf.addImage(imgData, 'PNG', 0, -5, 210, 300);
                  pdf.save('download.pdf');
                });
            }

        /*

        var doc  = new jsPDF("p" , "pt" , "a2");
  
        doc.html(document.querySelector("#pddf") , {
            callback: function(pdf){
                pdf.processArabic(pdf);
                pdf.save("contrat.pdf");
            }
        });

        */
    }; 

    return (

        <>
        <div className="btnGen">
            <Button className="mr-2 generateBTN" variant="secondary light" onClick={(generatePDF)} > GENERATE CONTRAT PDF </Button>
        </div>
        
        <div className="exportPdf" id="pddf">
            
<div className="exportHeader">
                <div className="headerLeft">
                    <div className="headerCompanyName">{agence.nom}</div>
                    <div className="headerCompanyNameSubTitle">Location de Voitures</div>
                    <div className="headerCompanyInfo">
                        Sarl au capital {agence.sarl} DH <br />
                        {agence.address} <br />
                        {agence.address2} <br />
                        RC : {agence.rc} - PAT : {agence.pat} <br />
                        IF : {agence.if} - CNSS : {agence.cnss} <br />
                        <div className="headerCompanyContact">
                            Tel : {agence.tel} - Fax : {agence.fax} <br />
                            Gsm : {agence.gsm}
                        </div>
                    </div>
                </div>
                <div className="headerLogo">
                    <img src={agence.logo ? PF + agence.logo : PF + "noCar.png"} alt="logo" className="Logo" />
                </div>
                <div className="headerRight">
                <div className="ArheaderCompanyName">سوفت واى كار</div>
                    <div className="ArheaderCompanyNameSubTitle">كراء السيارات</div>
                    <div className="ArheaderCompanyInfo">
                        المسؤولية رأسمالها {agence.sarl} درهم<br />
                        شارع الزرقطوني زنقة تامعروفت <br />
                        بوركون - الدار البيضاء<br />
                        التعريفة الجباثية : {agence.pat} - س.ت : {agence.rc}<br />
                        البتانتا  : {agence.if} -  ص.و.ض.ج : {agence.cnss} <br />
                        <div className="ArheaderCompanyContact">
                        الهاتف ؛ {agence.tel} - الفاكس : {agence.fax} <br />
                        المحمول : {agence.gsm}     
                        </div>
                    </div>
                </div>
            </div>
            <div className="exportBody">
                <div className="bodyTitle">CONTRAT DE LOCATION</div>
                <div className="bodySubTitle">Nº {agence._id}</div>
                <div className="infoClient">
                    <div className="infoClientTitle">INFORMATION CLIENT</div>
                    <div className="infoClientText">Nom & Prenom : <div className="content">{client.fullName} </div> </div>
                    <div className="infoClientText">date et lieu de naissance : <div className="content">{client.dateNaissance} </div> </div>
                    <div className="flexing">
                        <div className="infoClientText flex-1">N de C.I.N : <div className="content">{client.idCard} </div> </div>
                        <div className="infoClientText flex-2">Valable jusqu'au : <div className="content">{client.valable} </div> </div>
                    </div>
                    <div className="flexing">
                        <div className="infoClientText flex-1">N passeport : <div className="content">{client.passport} </div> </div>
                        <div className="infoClientText flex-1">Delivre le : <div className="content">{client.passportLe} </div> </div>
                        <div className="infoClientText flex-1">a : <div className="content">{client.passportA} </div> </div>
                    </div>
                    <div className="infoClientText">N d'entree : <div className="content">{client._id} </div> </div>
                    <div className="flexing">
                        <div className="infoClientText flex-1">N de permis : <div className="content">{client.permit} </div> </div>
                        <div className="infoClientText flex-1">Delivre le : <div className="content">{client.permitLe} </div> </div>
                        <div className="infoClientText flex-1">a : <div className="content">{client.permitA} </div> </div>
                    </div>
                    <div className="infoClientText">Adresse : <div className="content">{client.lieuNaissance} </div> </div>
                </div>
                <div className="infoClient">
                    <div className="infoClientTitle">AUTRE CONDUCTEUR AGREE</div>
                    <div className="infoClientText">Nom & Prenom : <div className="content">{client2.fullName} </div> </div>
                    <div className="infoClientText">date et lieu de naissance : <div className="content">{client2.dateNaissance} </div> </div>
                    <div className="flexing">
                        <div className="infoClientText flex-1">N de C.I.N : <div className="content">{client2.idCard} </div> </div>
                        <div className="infoClientText flex-2">Valable jusqu'au : <div className="content">{client2.valable} </div> </div>
                    </div>
                    <div className="flexing">
                        <div className="infoClientText flex-1">N passeport : <div className="content">{client2.passport} </div> </div>
                        <div className="infoClientText flex-1">Delivre le : <div className="content">{client2.passportLe} </div> </div>
                        <div className="infoClientText flex-1">a : <div className="content">{client2.passportA} </div> </div>
                    </div>
                    <div className="infoClientText">N d'entree : <div className="content">{client2._id} </div> </div>
                    <div className="flexing">
                        <div className="infoClientText flex-1">N de permis : <div className="content">{client2.permit} </div> </div>
                        <div className="infoClientText flex-1">Delivre le : <div className="content">{client2.permitLe} </div> </div>
                        <div className="infoClientText flex-1">a : <div className="content">{client2.permitA} </div> </div>
                    </div>
                    <div className="infoClientText">Adresse : <div className="content">{client2.lieuNaissance} </div> </div>
                </div>
                <div className="infoVoiture">
                    <div className="infoVoitureTitle">INFROMATION SUR LA VOITURE</div>
                    <div className="flexing">
                        <div className="infoVoitureText flex-1">Marque : <div className="content">{voiture.nom} </div> </div>
                        <div className="infoVoitureText flex-1">Immatriculation : <div className="content">{voiture.matricule} </div> </div>
                    </div>
                    <div className="flexing">
                        <div className="infoVoitureText flex-1">Agence depart : <div className="content">{contrat.agenceDepart} </div> </div>
                        <div className="infoVoitureText flex-1">Agence reteur : <div className="content">{contrat.agenceReteur} </div> </div>
                    </div>
                    <div className="flexing">
                        <div className="infoVoitureText flex-1">Jour depart : <div className="content">{contrat.jourDepart} </div>  </div>
                        <div className="infoVoitureText flex-1">Reteur Prevu : <div className="content">{contrat.reteurPrevu} </div> </div>
                        <div className="infoVoitureText flex-1">reteur reel : </div>
                    </div>
                    <div className="flexing">
                        <div className="infoVoitureText flex-1">Carburant depart : <div className="content">{contrat.carburantDepart} </div></div>
                        <div className="infoVoitureText flex-1">Carburant reteur : </div>
                    </div>
                    <div className="flexing">
                        <div className="infoVoitureText flex-1">KM depart : <div className="content">{contrat.kmDepart} </div></div>
                        <div className="infoVoitureText flex-1">KM reteur : </div>
                    </div>
                    <div>
                    <table className="table table-striped tablee    ">
                        <thead>
                            <tr>
                            <th scope="col">Nbre Jour</th>
                            <th scope="col">P.U</th>
                            <th scope="col">Prix location</th>
                            <th scope="col">Assurance</th>
                            <th scope="col">Frais Livraison</th>
                            <th scope="col">Montant(HT)</th>
                            <th scope="col">Montant(T.T.C)</th>
                            <th scope="col">Carburant</th>
                            <th scope="col">Depot</th>
                            <th scope="col">Solde</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><div className="contentTable">{contrat.NbreJour} </div></td>
                                <td><div className="contentTable">{contrat.PU} </div></td>
                                <td><div className="contentTable">{contrat.prixLocation} </div></td>
                                <td><div className="contentTable">{contrat.assurance} </div></td>
                                <td><div className="contentTable">{contrat.frais} </div></td>
                                <td><div className="contentTable">{contrat.montantHT} </div></td>
                                <td><div className="contentTable">{contrat.montantTTC} </div></td>
                                <td><div className="contentTable">{contrat.carburant} </div></td>
                                <td><div className="contentTable">{contrat.depot} </div></td>
                                <td><div className="contentTable">{contrat.solde} </div></td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <div className="flexing">
                        <div className="infoVoitureText flex-1">Mode de reglement : <div className="content">{contrat.mode} </div> </div>
                        <div className="infoVoitureText flex-1">Montant Franchise : <div className="content">{contrat.franchise} </div> </div>
                        <div className="infoVoitureText flex-1">Montant Caution : <div className="content">{contrat.caution} </div> </div>
                    </div>

                </div>
                <div className="infoVoitureTitle">NB : Ce contrat ne vaut en aucun cas comme facture</div>
                    
                <div className="footerr">
                    <div className="footerLeft">
                        <div className="signatures">SIGNATURE DE L'AGENT QUI A LIVRE</div>
                        <div className="signatures">SIGNATURE DU LOCATION</div>
                        <div className="signatures">SIGNATURE DE DECHARGE</div>
                    </div>
                    <div className="footerMiddle">
                        <img src={car} alt="car" className="carImg" />
                    </div>
                    <div className="footerRight">
                    <table className="table table-striped tablee    ">
  <thead>
    <tr>
      <th scope="col" width="30px">Avances</th>
      <th scope="col">Prolongations</th>
    </tr>
  </thead>
  <tbody>
      {
          prolongations.map((item) => (
            <tr key={item._id}>
                <td className="tdd"> {item.avance}  </td>
                <td  className="tdd">Du: {item.debut }  Au:  {item.fin}  </td>
            </tr>
          ))
      }
    


    <tr>
      <td>. . . .  </td>
      <td>Du: . . . . . . . . Au: . . . . . . . . </td>
    </tr>
    <tr>
      <td>. . . .  </td>
      <td>Du: . . . . . . . . Au: . . . . . . . . </td>
    </tr>
  </tbody>
</table>
                    </div>
                </div>
            </div>
            
        
        
        </div>

        </>

    )
}
