import React, { Fragment, useEffect, useState } from "react";
import Slider from "./Slider/Slider";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import GoodWord from "../WelcomPage/GoodWord/GoodWord";
import News from "../WelcomPage/News/News";
import Birthday from "../WelcomPage/Birthdays/Birthday";
import Teachers from "../WelcomPage/PrivateTeacher/PrivateTeacher";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import MsgBox from "../../SecretaryWin/MsgBox/MsgBox";
import style from "./WelcomPage.module.scss";
import "./WelcomPage.css";
import api from "../../../../api";
import Contact from "../../SecretaryWin/ContentManagement/Contact/Contact";
const WelcomPage = () => {
   const [users, setUsers] = useState([]); //hook
   const [news, setNews] = useState([]); // hook news
   const [msg, setMsg] = useState({
      msg: "",
   });
   const options = {
      timeout: 3000,
      position: positions.BOTTOM_CENTER,
   };
   useEffect(() => {
      getUsers();
      //getNews("תלמיד");
   }, []);

   function getUsers() {
      api.get("users").then((res) => setUsers(res.data));
   }

   function getNews(key) {
      api.get("news?filterBy=${key}").then((res) => setNews(res.data));
   }

   return (
      <Fragment>
         <Provider template={AlertTemplate} {...options}>
            <div className={style.container}>
               <div className={style.right}>
                  <Card style={{ height: "50vh", overflowY: "auto" }}>
                     <Card.Header as="h5" style={{ textAlign: "right" }}>
                        אנשי קשר
                     </Card.Header>
                     <Card.Body>
                        <Contact />
                     </Card.Body>
                  </Card>
               </div>
               <div className={style.center}>
                  <div className="row d-block ">
                     <Slider />
                  </div>
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
                  <div className="row d-block goodWord">
                     <GoodWord setMsg={setMsg} />
                  </div>
               </div>
               <div className={style.left}>
                  <News news={news} />
                  <Birthday users={users} />
                  <Teachers />
               </div>
            </div>
         </Provider>
      </Fragment>
   );
};

export default WelcomPage;
