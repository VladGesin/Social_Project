import React, {useState} from "react";
import styles from "./styles.module.scss";
import api from "../../../../../api";

export const Survey = ({item, doFetch, activeMode}) => {

    const {title, answers, end_time, survey_id, description, isActive} = item
    const [indexSelectedAnswer, setIndexSelectedAnswer] = useState(-1)
    const [isLoading, setIsLoading] = useState(false)

    const isActiveSurvey = activeMode || isActive

    const getTotalVotes = (options) => {
        return options.reduce((acc, answer) => {
            return acc + answer.answer_counter
        }, 0)
    }

    const handleVote = () => {
        setIsLoading(true)

        const params = {
            survey_id: survey_id,
            answer_id: answers[indexSelectedAnswer].answer_id
        }

        api.patch(`voting/`, params)
            .then(res => {
                if (res.data.data.status === "failed"){
                    alert(res.data.data.description === "User already voted for this survey" ? "המשתמש הנוכחי כבר הצביע עבור סקר זה!" : res.data.data.description);
                }else {
                    doFetch();
                }

            })
            .catch(err => {
                alert('שגיאה - לא בוצעה הצבעה!');
            })
            .finally(() =>{
                setIsLoading(false);
                setIndexSelectedAnswer(-1);
            })
    }

    const getFormatDate = (date) => {

        let parts = new Intl.DateTimeFormat('en', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'Asia/Jerusalem'
        })
            .formatToParts(new Date(date))
            .reduce((acc, part) => {
                acc[part.type] = part.value;
                return acc;
            }, Object.create(null));

        return `${parts.day}/${parts.month}/${parts.year}`;
    }

    const getTime = (date) => {
        return new Date(date).toLocaleTimeString("he-IL", {timeZone: "Asia/Jerusalem"})
    }

    const totalVotes = getTotalVotes(answers)

    const sortedAnswers = answers.sort((a, b) =>{
        return b.answer_counter - a.answer_counter;
    })


    return (
        <div className={styles.surveyItem}>

            <div className={styles.headerItem}>
                <h3>?{title}</h3>
                <p>{description}</p>

                {isActiveSurvey ?
                    <label>
                        ניתן להצביע עד התאריך {getFormatDate(end_time)} עד {getTime(end_time)}
                    </label>
                    :
                    <label style={{direction: "rtl"}}>
                        סקר לא פעיל, זמן ההצבעה עבר :)
                    </label>
                }
            </div>

            <div className={styles.options}>
                <div className={styles.headerOptions}>
                    <h4>תשובות</h4>
                    <label>סה״כ הצבעות - {totalVotes}</label>
                </div>

                <>
                    {sortedAnswers.map((answer, j) => {
                        const {answer_counter, answers_content} = answer;
                        return (
                            <div className={styles.optionContainer} key={j}>
                                <div style={{display: "flex", width: "100%", alignItems: "center"}}>
                                    <div className={styles.progress}>
                                        <div style={{position: "relative", zIndex: 2}}>{answers_content}</div>
                                        <div className={styles.progressLoading}
                                             style={{width: `${answer_counter / totalVotes * 100}%`}}/>
                                    </div>
                                    {isActiveSurvey && <input
                                        className={styles.voteInput}
                                        type={'checkbox'}
                                        checked={indexSelectedAnswer === j}
                                        onChange={(e) => setIndexSelectedAnswer(j)}
                                    />}

                                </div>
                                <label className={styles.answerCounter}> {answer_counter} הצבעות </label>
                            </div>
                        );
                    })}
                </>
            </div>

            {isActiveSurvey && <button
                className={styles.voteButton}
                disabled={indexSelectedAnswer < 0 || isLoading}
                onClick={handleVote}
            >
                הצבעה
            </button>}
        </div>
    );
}