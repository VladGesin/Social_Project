import React, {useState} from "react";
import styles from "./styles.module.scss";
import {AddNewSurvey} from "./AddNewSurvey";
import {SurveysList} from "./SurveysList";

export const SurveysPage = () => {

    const [isReviewSurveysMode, setIsReviewSurveysMode] = useState(false)

    return (
        <div className={styles.rootSurveysPage}>
            <h1>סקרים והצבעות</h1>

            <div className={styles.mainPage}>
                <div className={styles.main}>
                    {isReviewSurveysMode ?
                        <SurveysList/>
                        :
                        <AddNewSurvey/>
                    }
                </div>

                <div className={styles.menu}>
                    <button onClick={() => setIsReviewSurveysMode(false)}>הוספת סקר</button>
                    <button onClick={() => setIsReviewSurveysMode(true)}>צפייה בסקרים</button>
                </div>
            </div>


        </div>
    );
}
