import React from 'react';
import styles from "./UsersContacts.module.scss";
import Context from "../../../../store/Context";

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
        destination: 'שם נמען5',
        subject: 'נושא הפנייה 000',
        time: '3453453453',
        status: 'סגור'
    },
    {
        id: '1213',
        destination: 'שם נמען6',
        subject: 'נושא הפנייה 000',
        time: '3453453453',
        status: 'סגור'
    },
]

const itemIncludeInCurrentSearch = (item, searchQuery) => {
    if (searchQuery === '') return true;

    if (item.id.includes(searchQuery) || item.destination.includes(searchQuery) || item.subject.includes(searchQuery)) {
        return true;
    }
    return false;
}

export const UsersContacts = () => {

    const {userState} = React.useContext(Context);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [pageNumber, setPageNumber] = React.useState(0);
    const [fieldTypeSort, setFieldTypeSort] = React.useState(null);
    const [orderSort, setOrderSort] = React.useState(null);
    const [numberOfRowInPage, setNumberOfRowInPage] = React.useState(4);

    const getCurrentPageData = (arr) => {
        return arr.reduce((acc, item, i) => {
            const minIndex = pageNumber * numberOfRowInPage;
            const maxIndex = pageNumber * numberOfRowInPage + numberOfRowInPage
            if (i >= minIndex && i < maxIndex) {
                return [...acc, item]
            }
            return acc;
        }, [])
    }

    const allData = searchQuery === '' ?
        mock_data :
        mock_data.reduce((acc, item) => {
            return itemIncludeInCurrentSearch(item, searchQuery) ? [...acc, item] : acc;
        }, [])

    const currentData = getCurrentPageData(allData)

    const getCountPages = () => {
        return Math.ceil(allData.length / numberOfRowInPage);
    }

    const countPages = getCountPages();
    debugger

    const handleChangeNumberOfRowInPage = (e) => {
        setPageNumber(1)
        setNumberOfRowInPage(+e.target.value)
    }

    const handleChangeSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    console.log('search', searchQuery)

    return (
        <div className={styles.rootUsersContacts}>
            <input onChange={handleChangeSearch} placeholder={'חיפוש פניות'} type={'text'}
                   className={styles.searchInput} value={searchQuery}/>
            <div className={styles.main}>
                <div className={styles.sortContainer}>
                    <label>מיין לפי:</label>

                    <div>
                        מספר שורות בעמוד
                        <select onChange={handleChangeNumberOfRowInPage} value={numberOfRowInPage}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                        </select>
                    </div>


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


                {countPages > 1 && <div className={styles.paginationContainer}>
                    <div className={styles.buttonsList}>
                        {pageNumber > 0 &&
                        <button onClick={() => setPageNumber(prevState => prevState - 1)}>אחורה</button>}
                        {Array.apply(null, Array(countPages)).map((_, i) => {
                            return (
                                <button onClick={() => setPageNumber(i)}
                                        className={i === pageNumber ? styles.currentPage : ''}>{i + 1}</button>
                            );
                        })}
                        {pageNumber < countPages- 1 &&
                        <button onClick={() => setPageNumber(prevState => prevState + 1)}>קדימה</button>}
                    </div>
                </div>}
            </div>

        </div>
    );
};
