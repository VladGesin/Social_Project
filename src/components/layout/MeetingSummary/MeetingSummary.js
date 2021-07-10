// [
//   { key: 1, approved: true, committeeName: "א" },
//   { key: 2, approved: null, committeeName: "א" },
//   { key: 3, approved: false, committeeName: "א" },
//   { key: 4, approved: true, committeeName: "ב" },
//   { key: 5, approved: null, committeeName: "ב" },
//   { key: 6, approved: undefined, committeeName: "ב" },
//   { key: 7, approved: false, committeeName: "ב" },
//   { key: 8, approved: false, committeeName: "ב" },
//   { key: 9, approved: true, committeeName: "ב" },
//   { key: 10, approved: true, committeeName: "ב" },
//   { key: 11, approved: null, committeeName: "ג" },
//   { key: 12, approved: true, committeeName: "ג" },
// ]
import React, { useState, useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import style from "./MeetingSummary.module.scss";
import { Form, Col, Button, Card } from "react-bootstrap";
import Context from "../../../store/Context";
import { v4 as uuidv4 } from "uuid";
import api from "../../../api";
import MsgBox from "../SecretaryWin/MsgBox/MsgBox";
const MeetingSummary = () => {
   const [isModelOpen, setIsOpenModel] = useState(false);
   const context = useContext(Context);
   const [form, setForm] = useState({ title: "", description: "", file: "" });
   const [selectedCommittee, setSelectedCommittee] = useState();
   const [selectedRadio, setSelectedRadio] = useState("waiting"); // waiting  , approved, denied
   const [filesList, setFilesList] = useState([]);
   const [flag, setFlag] = useState(false);
   const [myCommittees, setMyCommittees] = useState([]);
   const [msg, setMsg] = useState({ msg: "" });
   useEffect(() => {
      fetchMyCommittees();
   }, []);

   useEffect(() => {
      (async () => {
         const res = await api.get(`/meetingSummary/${selectedCommittee}`);

         setFilesList(
            res.data.map((f) => {
               return {
                  ...f,
                  approvedRadio:
                     f.approved === true
                        ? "approved"
                        : f.approved === false
                        ? "denied"
                        : "waiting",
               };
            })
         );
      })();
   }, [selectedCommittee, flag]);
   // Todo change card type according to user type
   // approved/ denied functions
   // filtering card list by committee
   // download file button

   const fetchMyCommittees = async () => {
      const res = await api.get(`committees/`);
      const filteredCommittees = res.data.map((c) => c.name);
      setSelectedCommittee(filteredCommittees[0]);
      setMyCommittees(filteredCommittees);
      const docs = await api.get(`/meetingSummary/${filteredCommittees[0]}`);
      console.log(docs.data);

      setFilesList(
         docs.data.map((f) => {
            return {
               ...f,
               approvedRadio:
                  f.approved === true
                     ? "approved"
                     : f.approved === false
                     ? "denied"
                     : "waiting",
            };
         })
      );

      setForm({ ...form, committee: filteredCommittees[0] });
   };

   const fileDownload = (file) => {
      // file download
      console.log("donwload");
      console.log(file);
   };

   const onSummaryDecision = async (card, approved) => {
      // change specific card status with index = key
      console.log(card);
      await api.patch(`meetingSummary/${card.meeting_id}`, { approved });
      setFlag(!flag);
      // const isAccept = false;
   };

   const onInputChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };

   const onFileSelected = (e) => {
      const file = new FormData();
      file.append("images", e.target.files[0], e.target.files[0].name);
      setForm({ ...form, file });
   };

   const handleClose = () => {
      setForm({
         title: "",
         description: "",
         file: "",
         committee: myCommittees[0],
      });
      setIsOpenModel(false);
   };

   const onUploadSummarySubmit = async (e) => {
      e.preventDefault();
      if (form.title !== "" && form.description !== "" && form.file !== "") {
         // upload the summary
         const ext = form.file.get("images").name.split(".")[1];
         if (ext === "doc" || ext === "docx" || ext === "pdf") {
            console.log("ok");
            const meetingSummaryReq = {
               title: form.title,
               description: form.description,
               createTime: Date(),
               approved: false,
               approvedUser: context.userState.id,
               file: form.file,
            };
            var today = new Date();
            var date =
               today.getFullYear() +
               "-" +
               (today.getMonth() + 1) +
               "-" +
               today.getDate();
            var time =
               today.getHours() +
               ":" +
               today.getMinutes() +
               ":" +
               today.getSeconds();
            var dateTime = date + " " + time;

            form.file.append("title", form.title);
            form.file.append("description", form.description);
            form.file.append("createTime", dateTime);
            form.file.append("committeeName", form.committee);
            form.file.append("extension", `.${ext}`);
            // TODO send object with post
            const res = await api.post("/meetingSummary", form.file);
            // setFlag(!flag);
            handleClose();
            console.log(form.title);
            console.log(form.description);
            console.log(dateTime);
            console.log(form.committee);
            console.log(`.${ext}`);
            setFlag(!flag);
            setMsg({ msg: "סיכום פגישה הועלה בהצלחה", type: "success" });
         } else {
            // Todo setMsg error
         }
      }
   };

   const getUniqueCommitteeNames = () => {
      const committeeNames = filesList.map((f) => f.committeeName);
      return Array.from(new Set(committeeNames));
   };

   const renderSelectMenu = () => {
      const uniqeCommittees = getUniqueCommitteeNames();
      return uniqeCommittees.map((f) => <option key={uuidv4()}>{f}</option>);
   };

   const onSelectChange = async (e) => {
      setSelectedCommittee(e.target.value);
   };

   const onRadioChange = (e) => {
      setSelectedRadio(e.target.value);
   };

   return (
      <div className={style.container}>
         {msg.msg !== "" && (
            <MsgBox
               name={msg.name}
               msg={msg.msg}
               clear={() => {
                  setMsg({ msg: "" });
               }}
               type={msg.type}
            />
         )}
         <div className={style.topMenu}>
            <Button
               variant="primary"
               dir="rtl"
               onClick={() => {
                  setIsOpenModel(true);
               }}
            >
               העלת סיכום שיחה
            </Button>
            <div className={style.filters}>
               <div className={style.radio}>
                  <label>נדחה</label>
                  <input
                     type="radio"
                     name="status"
                     value="denied"
                     onChange={onRadioChange}
                     checked={selectedRadio === "denied"}
                  />
                  <label>אושר</label>
                  <input
                     type="radio"
                     name="status"
                     value="approved"
                     onChange={onRadioChange}
                     checked={selectedRadio === "approved"}
                  />
                  <label>ממתין לאישור</label>
                  <input
                     type="radio"
                     name="status"
                     value="waiting"
                     onChange={onRadioChange}
                     checked={selectedRadio === "waiting"}
                  />
               </div>

               <select
                  className={style.drop}
                  onChange={onSelectChange}
                  value={selectedCommittee}
               >
                  {myCommittees?.map((c) => (
                     <option key={c}>{c}</option>
                  ))}
               </select>
            </div>
         </div>
         <div className={style.cardsContainer}>
            {filesList.map(
               (c) =>
                  c.approvedRadio === selectedRadio && (
                     <div className={style.cardContainer} key={c.meeting_id}>
                        <Card
                           bg="Light"
                           key={c.key}
                           text="dark"
                           style={{ width: "18rem", height: "18rem" }}
                           className="mr-2 mb-2"
                        >
                           <Card.Header
                              style={{
                                 textAlign: "right",
                                 display: "flex",
                                 justifyContent: "space-between",
                                 alignItems: "center",
                                 height: "2rem",
                              }}
                           >
                              {c.approved ? (
                                 <i
                                    className="fas fa-check-circle"
                                    style={{ color: "green" }}
                                 ></i>
                              ) : c.approved === null ||
                                c.approved == undefined ? (
                                 <i
                                    className="fas fa-clock"
                                    style={{ color: "#ffb74d" }}
                                 ></i>
                              ) : (
                                 <i
                                    className="fas fa-ban"
                                    style={{ color: "red" }}
                                 ></i>
                              )}
                              <span>{selectedCommittee}</span>
                           </Card.Header>
                           <Card.Body>
                              <Card.Title
                                 style={{
                                    textAlign: "right",
                                    direction: "rtl",
                                 }}
                              >
                                 <div
                                    style={{
                                       display: "flex",
                                       justifyContent: "space-between",
                                    }}
                                 >
                                    {c.title}
                                    {console.log(c)}
                                    {(c.approved == true ||
                                       c.approved == null) && (
                                       <div>
                                          <a
                                             href={`https://www.hitprojectscenter.com/social-API/${
                                                c.approved === true
                                                   ? c.document[1]?.path
                                                   : c.document[0]?.path
                                             }`}
                                             download
                                             target="_blank"
                                          >
                                             <i
                                                style={{ color: "#01579b" }}
                                                className="fas fa-download"
                                                onClick={() => fileDownload(c)}
                                             ></i>
                                          </a>
                                       </div>
                                    )}
                                 </div>
                                 <p
                                    className="text-muted"
                                    style={{ fontSize: "0.8rem" }}
                                 >
                                    {`${
                                       c.create_time.split("T")[1].split(".")[0]
                                    } ${c.create_time.split("T")[0]} `}
                                 </p>
                              </Card.Title>
                              <Card.Text style={{ textAlign: "right" }}>
                                 {c.description}
                              </Card.Text>
                           </Card.Body>
                           {(c.approved === null ||
                              c.approved === undefined) && (
                              <div
                                 className={style.btnContainer}
                                 style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                 }}
                              >
                                 <Button
                                    style={{
                                       backgroundColor: "#e57373",
                                       borderColor: "#e57373",
                                    }}
                                    onClick={() => onSummaryDecision(c, false)}
                                 >
                                    דחיה
                                 </Button>
                                 <Button
                                    style={{
                                       backgroundColor: "#81c784",
                                       borderColor: "#81c784",
                                    }}
                                    onClick={() => onSummaryDecision(c, true)}
                                 >
                                    אישור
                                 </Button>
                              </div>
                           )}
                        </Card>
                     </div>
                  )
            )}
         </div>
         <Modal show={isModelOpen} onHide={handleClose} size="lg" dir="rtl">
            <Card
               className="text-right h-auto container"
               height="fit-content !important"
            >
               <Card.Header as="h5" dir="rtl">
                  העלאת סיכום שיחה
               </Card.Header>
               <Card.Body>
                  <Form dir="rtl">
                     <Form.Row>
                        <Form.Group as={Col} controlId="formGridContactMail">
                           <Form.Label>
                              נושא<span className="validate">*</span>
                           </Form.Label>
                           <Form.Control
                              placeholder="נושא סיכום הישיבה"
                              value={form.title}
                              name="title"
                              dir="rtl"
                              onChange={onInputChange}
                           />
                        </Form.Group>
                     </Form.Row>
                     <Form.Row>
                        <Form.Group as={Col} controlId="formGridContactMail">
                           <Form.Label>
                              תיאור<span className="validate">*</span>
                           </Form.Label>
                           <Form.Control
                              placeholder="תיאור סיכום הישיבה"
                              value={form.description}
                              name="description"
                              dir="rtl"
                              onChange={onInputChange}
                           />
                        </Form.Group>
                     </Form.Row>
                     <Form.Row>
                        <Form.Group as={Col} controlId="formGridContactMail">
                           <Form.Label>
                              ועדה<span className="validate">*</span>
                           </Form.Label>
                           <Form.Control
                              as="select"
                              //={form.description}
                              name="committee"
                              dir="rtl"
                              onChange={onInputChange}
                           >
                              {myCommittees.map((c) => (
                                 <option key={uuidv4()}>{c}</option>
                              ))}
                           </Form.Control>
                        </Form.Group>
                     </Form.Row>
                     <Form.Row>
                        <Form.Group as={Col} controlId="formGridContactMail">
                           <input type="file" onChange={onFileSelected} />
                           {/* <Form.File label="בחר קובץ" custom /> */}
                           <Form.Label
                              style={{ marginRight: "2rem" }}
                           ></Form.Label>
                        </Form.Group>
                     </Form.Row>
                     <Button
                        variant="success"
                        type="submit"
                        onClick={onUploadSummarySubmit}
                     >
                        הוסף
                     </Button>
                     <Button
                        variant="secondary"
                        onClick={handleClose}
                        style={{ padding: "6px 12px" }}
                        style={{ margin: "6px" }}
                     >
                        ביטול
                     </Button>
                  </Form>
               </Card.Body>
            </Card>
         </Modal>
      </div>
   );
};

export default MeetingSummary;
