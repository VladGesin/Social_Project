import React from 'react';
import styles from "./UsersContacts.module.scss";
import Context from "../../../../store/Context";
import {min} from "moment";

const mock_data = [
    {
        id: '1234',
        destination: 'שם נמען1',
        subject: 'נושא הפנייה 123',
        time: '3453453453',
        status: 'פתוח'
    },
    {
        id: '5678',
        destination: 'שם נמען2',
        subject: 'נושא הפנייה 456',
        time: '3453453453',
        status: 'סגור'
    },
    {
        id: '9101',
        destination: 'שם נמען3',
        subject: 'נושא הפנייה 789',
        time: '3453453453',
        status: 'פתוח'
    },
    {
        id: '1213',
        destination: 'שם נמען4',
        subject: 'נושא הפנייה 000',
        time: '3453453453',
        status: 'סגור'
    },
    {
        id: '1213',
        destination: 'שם נמען4',
        subject: 'נושא הפנייה 000',
        time: '3453453453',
        status: 'סגור'
    },
]

export const UsersContacts = () => {

    const {userState} = React.useContext(Context);
    const [pageNumber, setPageNumber] = React.useState(0);
    const [fieldTypeSort, setFieldTypeSort] = React.useState(null);
    const [orderSort, setOrderSort] = React.useState(null);
    const [numberOfRowInPage, setNumberOfRowInPage] = React.useState(4);

    const currentData = mock_data.reduce((acc, item, i) => {
        const minIndex = pageNumber * numberOfRowInPage;
        const maxIndex = pageNumber * numberOfRowInPage + numberOfRowInPage
        if (i >= minIndex && i < maxIndex) {
            return [...acc, item]
        }
        return acc;
    }, [])

    const countPages= Array.apply(null, Array(Math.ceil(mock_data.length / numberOfRowInPage)));

    return (
        <div className={styles.rootUsersContacts}>
            <input placeholder={'חיפוש פניות'} type={'text'} className={styles.searchInput}/>
            <div className={styles.main}>
                <div className={styles.sortContainer}>
                    מיין לפי
                </div>
                <div className={styles.contactsTable}>
                    {currentData.map((item, i) => {
                        return (
                            <div key={i} className={styles.item}>
                                <div className={styles.field}>
                                    <label className={styles.label}>
                                        מספר פנייה
                                    </label>
                                    <label className={styles.value}>
                                        {item.id}
                                    </label>
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>
                                        נמען
                                    </label>
                                    <label className={styles.value}>
                                        {item.destination}
                                    </label>
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>
                                        נושא פניה
                                    </label>
                                    <label className={styles.value}>
                                        {item.subject}
                                    </label>
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>
                                        תאריך ושעת פניה
                                    </label>
                                    <label className={styles.value}>
                                        {item.time}
                                    </label>
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>
                                        סטטוס
                                    </label>
                                    <label className={styles.value}>
                                        {item.status}
                                    </label>
                                </div>
                            </div>
                        );
                    })}
                </div>


                {mock_data.length % numberOfRowInPage !== 0 && <div className={styles.paginationContainer}>
                    <div className={styles.buttonsList}>
                        {pageNumber > 0 && <button onClick={() => setPageNumber(prevState => prevState -1)}>אחורה</button>}
                        {countPages.map((_ , i) =>{
                            return (
                                <button onClick={() => setPageNumber(i)}>{i+ 1}</button>
                            );
                        })}
                        {pageNumber < countPages.length -1 && <button onClick={() => setPageNumber(prevState => prevState +1)}>קדימה</button>}
                    </div>
                </div>}
            </div>

        </div>
    );
};
