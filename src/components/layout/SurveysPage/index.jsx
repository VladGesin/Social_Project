import React, {useState} from "react";
import styles from "./styles.module.scss";
import {AddNewSurvey} from "./AddNewSurvey";
import {SurveysList} from "./SurveysList";

export const SurveysPage = () => {

    const [mode, setMode] = useState('add')

    const getMainComp = () =>{
        switch (mode){
            case 'add':
                return <AddNewSurvey/>
            case 'list':
                return <SurveysList/>
            case 'vote':
                return <div>הצבעות</div>

        }
    }

    return (
        <div className={styles.rootSurveysPage}>
            <h1>סקרים והצבעות</h1>

            <div className={styles.mainPage}>
                <div className={styles.main}>{getMainComp()}</div>

                <div className={styles.menu}>
                    <button onClick={() => setMode('add')}>הוספת סקר</button>
                    <button onClick={() => setMode('list')}>צפייה בסקרים</button>
                    <button onClick={() => setMode('vote')}>הצבעה בסקר</button>
                </div>
            </div>


        </div>
    );
}
