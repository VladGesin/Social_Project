import React from "react";
import PrivateRoute from "./PrivateRoute";
import WelcomPage from "../components/layout/MainWin/WelcomPage/WelcomPage";
import commiteesWin from "../components/layout/CommiteesWin/commiteesWin";
import { Route } from "react-router-dom";
import chairmanItems from "../components/layout/ChairmanItems/ChairmanItems";
import SecretaryWin from "../components/layout/SecretaryWin/SecretaryWin";
import NewMeeting from "../components/layout/xpertesy/NewMeeting/NewMeeting";
import MyMeetings from "../components/layout/xpertesy/MyMeetings/MyMeetings";
import { PersonalPage } from "../components/layout/PersonalPage/PersonalPage";
import { MainCommitteesPage } from "../components/layout/MainCommitteesPage/MainCommitteesPage";
import Login from "../components/layout/Login/Login";
import ForgotPassword from "../components/layout/Login/ForgotPassword"
import PasswordReset from "../components/layout/Login/PasswordReset";
import {SurveysPage} from "../components/layout/SurveysPage/index";
import { MapsPage } from "../components/layout/MapsPage/MapsPage";

const routesData = [
   { component: WelcomPage, path: "/Social_Project/MainWin" },
   { component: chairmanItems, path: "/Social_Project/chairmanItems/:item" },
   { component: SecretaryWin, path: "/Social_Project/SecretaryWin" },
   { component: NewMeeting, path: "/Social_Project/newmeeting" },
   { component: MyMeetings, path: "/Social_Project/mymeetings" },
   { component: PersonalPage, path: "/Social_Project/personal" },
   { component: MapsPage, path: "/Social_Project/maps" },
   {
      component: MainCommitteesPage,
      path: "/Social_Project/committees",
      exact: true,
   },
   { component: commiteesWin, path: "/Social_Project/committees/:type" },
   { component: Login, path: "/Social_Project/", exact: true, public: true },
   {component: ForgotPassword,path: "/Social_Project/ForgotPassword",public: true,},
   {component: PasswordReset,path: "/Social_Project/PasswordReset",public: true,},
   {component: SurveysPage, path: "/Social_Project/Surveys"},
];

const Routes = () => {
   const routes = [];
   routesData.forEach((route) => {
      route.public
         ? routes.push(<Route key={route.path} {...route} />)
         : routes.push(<PrivateRoute key={route.path} {...route} />);
   });
   return routes;
};

export default Routes;
