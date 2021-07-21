import React, {useEffect, useState} from "react";
import styles from "./styles.module.scss";
import api from "../../../../api";
import {Survey} from "./Survey";
import Switch from '@material-ui/core/Switch';

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

    const sortedList = !isLoading && surveysList.sort((a, b) => {
        return b.isActive - a.isActive;
    })


    return (
        <div style={{paddingTop: 50}}>

            <div style={{marginBottom : 30}}>
                <label>פעילים בלבד</label>
                <Switch
                    checked={showActiveOnly}
                    onChange={handleChangeOnlyActiveFilter}
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </div>

            <div>
                {
                    !isLoading ?
                        <div className={styles.list}>
                            {sortedList.map((item, i) => {
                                return <Survey item={item} key={i} doFetch={doFetch} activeMode={showActiveOnly}/>
                            })}
                        </div>
                        :
                        <div>טוען נתונים</div>
                }
            </div>

        </div>
    );
}