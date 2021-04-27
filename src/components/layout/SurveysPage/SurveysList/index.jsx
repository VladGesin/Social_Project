import React, {useEffect} from "react";
import styles from "./styles.module.scss";
import api from "../../../../api";

export const SurveysList = () =>{

    useEffect(() => {
        api.get(`/survey/allSurvey/`)
            .then((res) =>{
                debugger
            } )
    } ,[]);
    return (
        <div>SurveysList</div>
    );
}