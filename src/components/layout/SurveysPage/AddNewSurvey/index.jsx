import React, {useState} from "react";
import styles from "./styles.module.scss";
import api from "../../../../api";

export const AddNewSurvey = () => {

    const [surveyData, setSurveyData] = useState({
        title: "",
        description: "",
        committee: "",
        startTime: "",
        endTime: "",
        answers: [
            {
                answer: "",
            },
            {
                answer: "",
            }
        ]
    })

    const [addingIsCompleted, setAddingIsCompleted] = useState(false)

    const handleChange = (value, key) => {
        setSurveyData((prevState) => ({
            ...prevState,
            [key]: value
        }))
    }

    const handleUpdateAnswer = (answerIndex, value) => {
        setSurveyData(prevState => {
            let newAnswers = prevState.answers
            newAnswers[answerIndex] = {
                answer: value
            }
            return ({
                ...prevState,
                answers: newAnswers
            })
        })
    }

    const addNewAnswer = () => {
        setSurveyData(prevState => ({
            ...prevState,
            answers: [
                ...prevState.answers,
                {
                    answer: ""
                }
            ]
        }))
    }

    const getIsSurveyDataValid = () => {
        const {answers, ...newSurveyData} = surveyData;

        return answers.every(({answer}) => !!answer) && Object.keys(newSurveyData).every((key) => !!newSurveyData[key])
    }

    const handleAddNewSurvey = () => {
        debugger
        api.post('/survey/', surveyData)
            .then((res) => {
                res.data ? setAddingIsCompleted(true) : alert('הסקר לא נוסף')
            })
            .catch((err) => {
                alert('הסקר לא נוסף - שגיאה')
            })
    }

    return (
        <div className={styles.rootAddNewSurvey}>
            <h2>הוספת סקר:</h2>

            {
                !addingIsCompleted ?
                    <React.Fragment>
                        <div>
                            <label>כותרת</label>
                            <input type={'text'} onChange={(e) => handleChange(e.target.value, "title")}/>
                        </div>
                        <div>
                            <label>תיאור</label>
                            <input type={'text'} onChange={(e) => handleChange(e.target.value, "description")}/>
                        </div>
                        <div>
                            <label>וועדה</label>
                            <input type={'text'} onChange={(e) => handleChange(e.target.value, "committee")}/>
                        </div>
                        <div>
                            <label>כותרת</label>
                            <input type={'date'} onChange={(e) => handleChange(e.target.value, "startTime")}/>
                        </div>
                        <div>
                            <label>כותרת</label>
                            <input type={'date'} onChange={(e) => handleChange(e.target.value, "endTime")}/>
                        </div>
                        <div>
                            <label>תשובות</label>
                            <button onClick={addNewAnswer}>+</button>
                            {
                                surveyData.answers.map((answer, i) => {
                                    return (
                                        <div key={i}>
                                            <label> {i} תשובה </label>
                                            <input
                                                type={'text'}
                                                onChange={(e) => handleUpdateAnswer(i, e.target.value)}/>
                                        </div>
                                    );
                                })
                            }
                        </div>

                        <button disabled={!getIsSurveyDataValid()} onClick={handleAddNewSurvey}>יצירה</button>
                    </React.Fragment>
                    :
                    <div>
                        הסקר נוסף בהצלחה!
                    </div>
            }


            {/*<pre>*/}
            {/*    {JSON.stringify(surveyData, null, 2)}*/}
            {/*</pre>*/}
        </div>
    );
}