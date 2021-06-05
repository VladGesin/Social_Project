import React, {useEffect, useState} from "react";
import styles from "./styles.module.scss";
import api from "../../../../api";
import {Survey} from "./Survey";

export const SurveysList = ({fetchDep}) => {

    const [surveysList, setSurveysList] = useState([])
    const [showActiveOnly, setShowActiveOnly] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [fetchDep2, setFetchDep2] = useState(0)


    useEffect(() => {
        setIsLoading(true)
        api.get(`survey/${showActiveOnly ? 'getAllActiveSurveys' : 'allSurveys'}`)
            .then(({data}) => {
                setIsLoading(false)
                setSurveysList(data)
            })
    }, [showActiveOnly, fetchDep, fetchDep2]);

    const doFetch = () => setFetchDep2(prevState => prevState + 1)


    const handleChangeOnlyActiveFilter = (e) => setShowActiveOnly(e.target.checked)

    return (
        <div style={{paddingTop: 50}}>

            <div style={{marginBottom : 30}}>
                <label>פעילים בלבד</label>
                <input
                    type={'checkbox'}
                    disabled={isLoading}
                    checked={showActiveOnly}
                    onChange={handleChangeOnlyActiveFilter}
                />
            </div>

            <div>
                {
                    !isLoading ?
                        <div className={styles.list}>
                            {surveysList.map((item, i) => {
                                return <Survey item={item} key={i} doFetch={doFetch}/>
                            })}
                        </div>
                        :
                        <div>Loading...</div>
                }
            </div>

        </div>
    );
}