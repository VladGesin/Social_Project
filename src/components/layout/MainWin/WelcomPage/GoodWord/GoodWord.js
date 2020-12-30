import React, { Fragment, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./GoodWord.css";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import GoodWordCarusel from "./GoodWordCarusel";
import api from "../../../../../api";
import Context from "../../../../../store/Context";
import { useAlert } from "react-alert";

const GoodWord = ({ setMsg }) => {
  const [show, setShow] = useState(false);
  const [committees, setCommittees] = useState([]);
  const context = useContext(Context);
  const [erro, setErro] = useState(false);
  const [goodWord, setGoodWord] = useState([]); //hook goodword
  const [goGoodword, setGoodWordSlider] = useState([]);
  const [sent, setSent] = useState(false);
  const alert = useAlert();

  useEffect(() => {
    getCommittees();
    getGoodWord();
  }, []);

  useEffect(() => {
    getEnableGoodWord();
  }, [goodWord]);

  function getGoodWord() {
    api.get("goodWord").then((res) => setGoodWord(res.data));
  }
  function getCommittees() {
    api.get("committees").then((res) => setCommittees(res.data)); //get committees
  }

  function handleClose() {
    setShow(false);
    setErro(false);
    setSent(false);
    setInput(false);
  }

  const handleShow = () => setShow(true);
  const [input, setInput] = useState(false);

  const handleSend = () => {
    if (document.getElementById("goodWordData").value !== "") {
      //send data function
      setSent(true);
      api
        .post("goodWord", {
          sender_id: context.userState.id,
          reciever_id: "123456789",
          committee_name: document.getElementById("committeSelection").value,
          content: document.getElementById("goodWordData").value,
        })
        .then(() => getGoodWord());
      // alert.show('מילה טובה נשלחה'); //Err show
      setMsg({ msg: "מילה טובה נשלחה", type: "success" });
      setErro(false);
      handleClose();
      setInput(false);
    } else if (!input) {
      setInput(true);
      // document.getElementById('modalBody').append("שגיאה");
      setErro(true);
    }
  };
  const getEnableGoodWord = () => {
    if (goGoodword.length == 0) {
      goodWord.map((godwod) => {
        if (godwod.state) {
          goGoodword.push(godwod);
        }
      });
    }
    setGoodWord(goGoodword);
  };
  return (
    <Fragment>
      <Card className="text-right h-100 cardH">
        <Card.Header as="h5">מילה טובה</Card.Header>
        <Card.Body>
          <GoodWordCarusel indicators={false} goodWord={goodWord} />

          <Button id="goodWordBTN" variant="primary" onClick={handleShow}>
            שליחת מילה טובה
          </Button>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="text-right"
      >
        <Modal.Header className="d-flex justify-content-between" dir="rtl">
          <Modal.Title>
            <div>מילה טובה</div>
          </Modal.Title>
          <button type="submit" id="exitGoodword" onClick={handleClose}>
            <i className="fas fa-times" />
          </button>
        </Modal.Header>
        <Modal.Body id="modalBody">
          <div>
            <form dir="rtl">
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1"> בחירת ועדה</label>
                <select className="form-control" id="committeSelection">
                  {committees.map((committe) => (
                    <option
                      key={committe.name.toString()}
                      value={committe.name}
                    >
                      {committe.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                  אנא הכנס תוכן של מילה טובה :
                </label>
                <textarea
                  className="form-control"
                  id="goodWordData"
                  rows="10"
                />

                {erro && <div id="erro">שדה חובה</div>}
                {sent && <dGoodWordAlert />}
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          <Button variant="primary" onClick={handleSend}>
            שליחה
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default GoodWord;
