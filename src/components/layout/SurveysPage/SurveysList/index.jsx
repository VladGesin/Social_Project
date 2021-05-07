import React, {useEffect, useState} from "react";
import styles from "./styles.module.scss";
import Context from "../../../../store/Context";
import api from "../../../../api";

export const SurveysList = () => {
    const {userState: {token}} = React.useContext(Context);

    const [surveysList, setSurveysList] = useState([])
    const [showActiveOnly, setShowActiveOnly] = useState(false)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        setIsLoading(true)
        api.get(`survey/${showActiveOnly ? 'getAllActiveSurveys' : 'allSurveys'}`)
            .then(({data}) => {
                setIsLoading(false)
                setSurveysList(data)
            })
    }, [showActiveOnly]);

    const handleChangeOnlyActiveFilter = (e) => setShowActiveOnly(e.target.checked)
    return (
        <div>
            <h2>:רשימת סקרים</h2>

            <div>
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
                        <div>
                            {surveysList.map(({title, description, committee, owner_id, answers}, i) => {
                                return (
                                    <div key={i} className={styles.surveyItem}>
                                        <label>{title} :שם </label>
                                        <label>{description} :תיאור </label>
                                        <label>{committee} :וועדה </label>
                                        <label>{owner_id} :יוצר הסקר </label>
                                        <div>
                                            <label>:תשובות</label>
                                            {answers.map(({answer_counter, answers_content}, j) => {
                                                return (
                                                    <div>
                                                        {answer_counter} - {answers_content}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        :
                        <div>Loading...</div>
                }
            </div>

        </div>
    );
}