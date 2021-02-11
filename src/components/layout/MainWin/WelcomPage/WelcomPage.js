import React, { Fragment, useEffect, useState, useContext } from "react";
import Slider from "./Slider/Slider";
import Container from "react-bootstrap/Container";
import GoodWord from "../WelcomPage/GoodWord/GoodWord";
import News from "../WelcomPage/News/News";
import Birthday from "../WelcomPage/Birthdays/Birthday";
import Teachers from "../WelcomPage/PrivateTeacher/PrivateTeacher";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import MsgBox from "../../SecretaryWin/MsgBox/MsgBox";
import { Link } from "react-router-dom";
import { Message } from "semantic-ui-react";
import Context from "../../../../store/Context";

import "./WelcomPage.css";
import api from "../../../../api";

const WelcomPage = () => {
   const [users, setUsers] = useState([]); //hook
   const [news, setNews] = useState([]); // hook news
   const [msg, setMsg] = useState({
      msg: "",
   });
   const context = useContext(Context);
   const options = {
      timeout: 3000,
      position: positions.BOTTOM_CENTER,
   };
   useEffect(() => {
      getUsers();
      getNews("תלמיד");
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
            <Container>
               <div className="row justify-content-md-center">
                  <div className="col-md-8 ">
                     <div className="row d-block ">
                        <Slider />
                     </div>
                     {context.isExpired() && (
                        <p>
                           <Message>
                              <h14>
                                 <span>
                                    {console.log(context.isExpiredIn())}
                                    הסיסמא עומדת לפוג בעוד{" "}
                                    {context.isExpiredIn()} ימים.
                                    <Link to="/Social_Project/ForgotPassword">
                                       <p> לחץ כאן </p>
                                    </Link>
                                    לשנות סיסמה.
                                 </span>
                              </h14>
                           </Message>
                        </p>
                     )}
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
                     <div className="row d-block  ">
                        <GoodWord setMsg={setMsg} />
                     </div>
                  </div>
                  <div className="col">
                     <News news={news} />
                     <Birthday users={users} />
                     <Teachers />
                  </div>
               </div>
            </Container>
         </Provider>
      </Fragment>
   );
};

export default WelcomPage;
