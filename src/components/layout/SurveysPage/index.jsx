import React, {useState} from "react";
import styles from "./styles.module.scss";
import {SurveysList} from "./SurveysList";
import Modal from "react-bootstrap/Modal";
import {AddNewSurvey} from "./AddNewSurvey";
import Context from "../../../store/Context";

export const SurveysPage = () => {
    const {userState} = React.useContext(Context);

    const [showAddNewSurveyPopup, setShowAddNewSurveyPopup] = useState(false)
    const [counterFetch, setCounterFetch] = useState(0)

    const callbackAddNewSurvey = () => {
        setCounterFetch(prevState => prevState + 1)
    }

    const isAdmin = userState.userType === 'admin'

    return (
        <div className={styles.rootSurveysPage}>
            <h1 style={{marginBottom: 30}}>סקרים והצבעות</h1>

            {isAdmin && (
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end"
                }}>
                    <button
                        className={styles.addNewSurveyButton}
                        onClick={() => setShowAddNewSurveyPopup(true)}
                    >
                        <span style={{marginRight: 10, fontSize: 26}}>הוספת סקר חדש </span>
                        <i className="fas fa-plus"></i>
                    </button>
                </div>

            )}

            <SurveysList fetchDep={counterFetch}/>


            <Modal
                show={showAddNewSurveyPopup}
                // contentClassName={styles.changeImageModal}
                centered
                size="s.m"
                backdrop={"static"}
            >
                <AddNewSurvey closePopup={() => setShowAddNewSurveyPopup(false)} callback={callbackAddNewSurvey}/>
            </Modal>
        </div>
    );
}
