import React, {useEffect, useState} from "react";
import styles from "./styles.module.scss";
import api from "../../../../api";

export const SurveysList = () => {

    const [surveysList, setSurveysList] = useState(null)
    const [showActiveOnly, setShowActiveOnly] = useState(true)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        setIsLoading(true)
        api.get(`/survey/${showActiveOnly ? 'getAllActiveSurvey' : 'allSurvey'}/`)
            .then(({data}) => {
                setIsLoading(false)
                alert(JSON.stringify(data, null, 2))
            })
    }, [showActiveOnly]);

    const handleChangeOnlyActiveFilter = (e) => setShowActiveOnly(e.target.checked)
    return (
        <div>
            <h2>רשימת סקרים:</h2>

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
                    !isLoading ? <div>רשימת סקרים</div> : <div>Loading...</div>
                }
            </div>

        </div>
    );
}