import React, {useEffect, useState} from 'react';
import styles from "./UsersContacts.module.scss";
import Context from "../../../../store/Context";
import searchIcon from "../../SecretaryWin/assets/search.svg";
import {Menu, Dropdown} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import api from "../../../../api";

const MIN_numberOfRowInPage = 2;
const MAX_numberOfRowInPage = 7;

const fields_map = {
    inbox_id: 'מספר פניה',
    committee_name: 'שם ועדה',
    contact_full_name: 'נמען',
    subject: 'נושא הפנייה',
    inbox_sending_time: 'תאריך הפנייה',
    is_open: 'סטטוס'
}

const itemIncludeInCurrentSearch = (item, searchQuery) => {
    if (searchQuery === '') return true;

    if (item.inbox_id.toString().includes(searchQuery) || item.committee_name.includes(searchQuery) || item.subject.includes(searchQuery)) {
        return true;
    }
    return false;
}

export const UsersContacts = () => {

    const {userState} = React.useContext(Context);
    const [contacts, setContacts] = useState(null);

    const [searchQuery, setSearchQuery] = React.useState('');
    const [pageNumber, setPageNumber] = React.useState(0);
    const [fieldTypeSort, setFieldTypeSort] = React.useState('inbox_id');
    const [orderSort, setOrderSort] = React.useState('down');
    const [numberOfRowInPage, setNumberOfRowInPage] = React.useState(4);

    useEffect(() => {
        api.get(`/inbox/getBySenderId/${userState.id}`)
            .then(({data}) => setContacts(data))
    } ,[]);

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

    const getCountPages = (arr) => Math.ceil(arr.length / numberOfRowInPage);

    const getAllData = () => {
        const notSortData =  searchQuery === '' ? contacts :
            contacts.reduce((acc, item) => {
                return itemIncludeInCurrentSearch(item, searchQuery) ? [...acc, item] : acc;
            }, [])


        return notSortData.sort((a, b) =>  {
            if (fieldTypeSort === 'inbox_id'){
                return orderSort === 'down' ? b.inbox_id - a.inbox_id : a.inbox_id - b.inbox_id
            }
            var nameA = a[fieldTypeSort].toString().toUpperCase(); // ignore upper and lowercase
            var nameB = b[fieldTypeSort].toString().toUpperCase(); // ignore upper and lowercase

            if (orderSort === 'down' ){
                if (nameA < nameB) {
                    return 1;
                }
                if (nameA > nameB) {
                    return -1;
                }
                return 0;
            }else{
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            }


        })
    }

    const handleChangeNumberOfRowInPage = (value) => {
        setPageNumber(0)
        setNumberOfRowInPage(value)
    }

    const handleChangeSearch = (e) => setSearchQuery(e.target.value);

    const renderSortContainer = () => {


        const menuNumberOfRowInPage = (
            <Menu>
                {Array.apply(null, Array(MAX_numberOfRowInPage - MIN_numberOfRowInPage + 1)).map((_, i) => {
                    return (
                        <Menu.Item key={i}>
                            <div
                                style={i + MIN_numberOfRowInPage === numberOfRowInPage ? {fontWeight: 'bold'} : null}
                                onClick={() => handleChangeNumberOfRowInPage(i + MIN_numberOfRowInPage)}
                            >
                                {i + MIN_numberOfRowInPage}
                            </div>
                        </Menu.Item>
                    );
                })}
            </Menu>
        );

        const menuOrder = (
            <Menu>

                <Menu.Item>
                    <div onClick={() => setOrderSort('down')} style={orderSort === 'down' ? {fontWeight: 'bold'} : null}>
                        סדר יורד
                    </div>
                </Menu.Item>
                <Menu.Item>
                    <div onClick={() => setOrderSort('up')} style={orderSort === 'up' ? {fontWeight: 'bold'} : null}>
                        סדר עולה
                    </div>
                </Menu.Item>

            </Menu>
        );

        const menuFieldType = (
            <Menu>
                {Object.keys(fields_map).map((key, i) =>{
                    return (
                        <Menu.Item key={key}>
                            <div onClick={() => setFieldTypeSort(key)} style={fieldTypeSort === key? {fontWeight: 'bold'} : null}>
                                {fields_map[key]}
                            </div>
                        </Menu.Item>
                    );
                })}
            </Menu>
        );


        return (
            <div className={styles.sortContainer}>
                <label>מיין לפי:</label>

                <div className={styles.dropdownWrapper}>
                    <Dropdown overlay={menuFieldType}>
                        <div>

                            <span>{fields_map[fieldTypeSort]}</span>
                            <DownOutlined/>
                        </div>
                    </Dropdown>
                </div>

                <div className={styles.dropdownWrapper}>
                    <Dropdown overlay={menuOrder}>
                        <div>

                            <span>סדר {orderSort === 'down' ? 'יורד' : 'עולה'}</span>
                            <DownOutlined/>
                        </div>
                    </Dropdown>
                </div>
                <div className={styles.dropdownWrapper}>
                    <Dropdown overlay={menuNumberOfRowInPage}>
                        <div>
                            <span>מספר שורות בעמוד</span>
                            <DownOutlined/>
                        </div>
                    </Dropdown>
                </div>
            </div>
        );
    }

    const renderContactsTable = () => {
        return (
            <div className={styles.contactsTable}>
                {currentData.length > 0 ? currentData.map((item, i) => {
                        return (
                            <div key={i} className={styles.item}>
                                <div className={styles.field}>
                                    <label className={styles.label}>
                                        מספר פנייה
                                    </label>
                                    <label className={styles.value}>
                                        {item.inbox_id}
                                    </label>
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>
                                        שם ועדה
                                    </label>
                                    <label className={styles.value}>
                                        {item.committee_name}
                                    </label>
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>
                                        נמען
                                    </label>
                                    <label className={styles.value}>
                                        {item.contact_full_name}
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
                                        תאריך הפניה
                                    </label>
                                    <label className={styles.value}>
                                        {new Date(item.inbox_sending_time).toLocaleDateString('he-IL')}
                                    </label>
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>
                                        סטטוס
                                    </label>
                                    <label className={styles.value}>
                                        {item.is_open ?  'פתוח': 'סגור'}
                                    </label>
                                </div>
                            </div>
                        );
                    })
                    :
                    <div style={{textAlign: 'center'}}> לא נמצאו פניות!</div>
                }
            </div>
        );
    }

    const renderPagination = () => {
        return (
            <div className={styles.paginationContainer}>
                <div className={styles.buttonsList}>
                    {pageNumber > 0 &&
                    <button onClick={() => setPageNumber(prevState => prevState - 1)}>אחורה</button>}
                    {Array.apply(null, Array(countPages)).map((_, i) => {
                        return (
                            <button key={i} onClick={() => setPageNumber(i)}
                                    className={i === pageNumber ? styles.currentPage : ''}>{i + 1}</button>
                        );
                    })}
                    {pageNumber < countPages - 1 &&
                    <button onClick={() => setPageNumber(prevState => prevState + 1)}>קדימה</button>}
                </div>
            </div>
        );
    }

    const allData = contacts ? getAllData() : [];
    const currentData = getCurrentPageData(allData)
    const countPages = getCountPages(allData);

    return (
        <div className={styles.rootUsersContacts}>
            {contacts && <div className={styles.wrapperSearchInput}>
                <img src={searchIcon}/>
                <input
                    onChange={handleChangeSearch}
                    placeholder={'חיפוש פניות'} type={'text'}
                    className={styles.searchInput}
                    value={searchQuery}
                />
            </div>

            }



            <div className={styles.main}>
                {contacts === null && <div>טוען</div> }

                {currentData.length >0?
                    <React.Fragment>
                        {renderSortContainer()}
                        {renderContactsTable()}
                        {countPages > 1 && renderPagination()}
                    </React.Fragment>
                    :
                    <div>לא קיימות פניות!</div>

                }

            </div>

        </div>
    );
};
