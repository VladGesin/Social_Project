import React, {useState} from "react";
import styles from "./styles.module.scss";
import api from "../../../../api";
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        // width: "100%",
    },
}));

export const AddNewSurvey = ({callback, closePopup}) => {
    const classes = useStyles();

    const [surveyData, setSurveyData] = useState({
        title: "",
        description: "",
        start_time: "",
        end_time: "",
        answers: ["", ""]
    })
    const [newOptionValue, setNewOptionValue] = useState('')

    const handleChange = (value, key) => {
        console.log('value', value)
        setSurveyData((prevState) => ({
            ...prevState,
            [key]: value
        }))
    }
    const handleUpdateAnswer = (answerIndex, value) => {
        setSurveyData(prevState => {
            let newAnswers = prevState.answers
            newAnswers[answerIndex] = value
            return ({
                ...prevState,
                answers: newAnswers
            })
        })
    }
    const getIsSurveyDataValid = () => {
        const {answers, ...newSurveyData} = surveyData;

        const allAnswersIsValid = answers.every(answer => !!answer);
        const surveyDetailsIsValid = Object.keys(newSurveyData).every(key => !!newSurveyData[key])

        return allAnswersIsValid && surveyDetailsIsValid;
    }
    const handleAddNewSurvey = () => {
        api.post('/survey/', surveyData)
            .then((res) => {
                if (!res.data.data) {
                    alert('הסקר לא נוסף');
                } else {
                    callback();
                }
            })
            .catch(err => {
                alert('הסקר לא נוסף - שגיאה');
            })
            .finally(() => {
                closePopup();
            })
    }

    const renderOptions = () => {
        const newOptionIsAvailable = surveyData.answers.length < 4
        const validToRemoveOption = surveyData.answers.length > 2

        const handleRemoveOption = (indexOption) => {
            setSurveyData(prevState => {
                const newOptions = [...prevState.answers]
                newOptions.splice(indexOption, 1);
                return {
                    ...prevState,
                    answers: newOptions
                }
            })
        }

        const handleAddNewOption = () => {
            if (!!newOptionValue) {
                setSurveyData(prevState => ({
                    ...prevState,
                    answers: [
                        ...prevState.answers,
                        newOptionValue
                    ]
                }))

                setNewOptionValue("")
            }

        }

        return (
            <div>
                {
                    surveyData.answers.map((answer, i) => {
                        return (
                            <div key={i} className={styles.optionContainer}>
                                <button
                                    onClick={() => handleRemoveOption(i)}
                                    disabled={!validToRemoveOption}
                                >
                                    X
                                </button>
                                <input
                                    type={'text'}
                                    value={answer}
                                    placeholder={` אפשרות ${i + 1} `}
                                    onChange={(e) => handleUpdateAnswer(i, e.target.value)}
                                />

                            </div>
                        );
                    })
                }

                {newOptionIsAvailable && (
                    <input
                        style={{width: "92.5%", marginLeft: "auto"}}
                        onChange={(e) => setNewOptionValue(e.target.value)}
                        value={newOptionValue}
                        type={'text'}
                        placeholder={"הוספת אפשרות"}
                        onBlur={handleAddNewOption}
                    />
                )}

            </div>
        );
    }

    return (
        <div className={styles.rootAddNewSurvey}>
            <div className={styles.header}>
                <button onClick={closePopup}>X</button>
                <label style={{fontSize: 22}}>הוספת סקר חדש</label>
            </div>

            <div className={styles.main}>

                <input
                    type={'text'}
                    onChange={(e) => handleChange(e.target.value, "title")}
                    placeholder={'כותרת הסקר'}
                />


                <input
                    type={'text'}
                    onChange={(e) => handleChange(e.target.value, "description")}
                    placeholder={'תיאור הסקר'}
                />

                <h5 style={{marginTop: 30}}>תשובות אפשריות לסקר</h5>

                {renderOptions()}

                <h5 style={{marginTop: 30}}>תוקף הסקר</h5>
                <h6 style={{fontSize: 12, color: "#6c757d"}}>הגדרת טווח הזמנים שניתן להצביע לסקר</h6>

                <div style={{display: "flex", flexDirection: 'column'}}>
                    <label>התחלה</label>
                    <TextField
                        id="datetime-local1"
                        // label="Next appointment"
                        type="datetime-local"
                        // defaultValue="2017-05-24T10:30"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth={true}
                        onChange={e => handleChange(e.target.value, "start_time")}
                    />
                </div>
                <div style={{display: "flex", flexDirection: 'column'}}>
                    <label>סיום</label>
                    <TextField
                        fullWidth={true}
                        id="datetime-local2"
                        // label="Next appointment"
                        type="datetime-local"
                        // defaultValue="2017-05-24T10:30"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={e => handleChange(e.target.value, "end_time")}
                    />
                </div>


                <div style={{
                    display: "flex",
                    marginTop: 30,
                    justifyContent: "center",
                }}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleAddNewSurvey}
                        disabled={!getIsSurveyDataValid()}
                        className={styles.addButton}
                    >
                        הוספת סקר
                    </Button>
                </div>

            </div>
        </div>
    );
}