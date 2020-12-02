import React, { Fragment,useEffect ,useContext} from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./GoodWord.css";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import GoodWordCarusel from './GoodWordCarusel'
import api from "../../../../../api";
import Context from "../../../../../store/Context";


const GoodWord = () => {
  const [show, setShow] = useState(false);
  const [committees,setCommittees] = useState([]);
  const context = useContext(Context);
  const[erro,setErro]=useState(false);

useEffect(() => {
  getCommittees()
}, [])

  function getCommittees(){
    api.get('committees').then(res=>setCommittees(res.data)); //get committees
  }

  function handleClose(){
    setShow(false) 
    setErro(false)
    setInput(false)};

  const handleShow = () => setShow(true);
  const [input,setInput] = useState(false);

  const handleSend =()=>{
    if(document.getElementById('goodWordData').value !== ''){
      //send data function

      api.post('goodWord',{
        sender_id:context.userState.id, 
         reciever_id:"123456789",
        committee_name:document.getElementById("committeSelection").value, 
            content:document.getElementById('goodWordData').value 
          })

      handleClose()
      setInput(false)
      setErro(false)
  }
  else if(!input){
      setInput(true)
      // document.getElementById('modalBody').append("שגיאה");
      setErro(true)
  }

}

  return (
    <Fragment >
      <Card className="text-right">
        <Card.Header as="h5">מילה טובה
        </Card.Header>
        <Card.Body>
          <GoodWordCarusel indicators={false}/>

          <Button variant="primary" onClick={handleShow}>
            הכנס מילה טובה
          </Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} animation={false} className="text-right">
        <Modal.Header className="d-flex justify-content-between"  dir="rtl">
          <Modal.Title  > 
           <div>מילה טובה</div>
          </Modal.Title>
          <button  type='submit' id = 'exitGoodword' onClick={handleClose}> 
          <i className="fas fa-times"></i>
          </button>
        </Modal.Header>
        <Modal.Body id='modalBody'>
          <div>
             <form dir="rtl">
               <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">לאיזה יו"ר ברצונך לשלוח מילה </label>
                <select className="form-control" id="committeSelection" >

                {
                  committees.map(committe=>(
                  <option key={committe.name.toString()} value={committe.name}>{committe.name}</option>
                  ))
                }
                </select>
              </div>
                <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">אנא הכנס תוכן של מילה טובה :</label>
                <textarea className="form-control" id="goodWordData" rows="10"></textarea>
                
                  {erro && <div id='erro'>שגיאה לא ניתן לשלוח תוכן ריק</div>}
                
              </div>
            </form>
          </div>
 
        </Modal.Body>
        <Modal.Footer className='justify-content-start'>
          <Button variant="primary" onClick={
            handleSend}>
            שמור ושלח
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default GoodWord;
