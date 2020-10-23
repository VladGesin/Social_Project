import React from "react";
import WelcomPage from "../../MainWin/WelcomPage/WelcomPage";
import commiteesWin from "../../CommiteesWin/commiteesWin";
import { Route } from "react-router-dom";
import chairmanItems from "../../ChairmanItems/ChairmanItems";
import secreturywin from "../../SecretaryWin/SecreturyWin";
import NewMeeting from "../../xpertesy/NewMeeting/NewMeeting";
import MyMeetings from "../../xpertesy/MyMeetings/MyMeetings";
import {PersonalPage} from "../../PersonalPage/PersonalPage";

const routesData =
    [
       {component: WelcomPage, path: "/MainWin"},
       {component: commiteesWin, path: "/commiteesWin/:education"},
       //  { name: "commiteesWin", path: "/commiteesWin/:sport" },
       {component: chairmanItems, path: "/chairmanItems/:item"},
       {component: secreturywin, path: "/secreturywin"},
       {component: NewMeeting, path: "/newmeeting"},
       {component: MyMeetings, path: "/mymeetings"},
       {component: PersonalPage, path: "/personal"},
    ]

const Routes = () => routesData.map(route => <Route key={route.path} {...route}/>);

export default Routes;
