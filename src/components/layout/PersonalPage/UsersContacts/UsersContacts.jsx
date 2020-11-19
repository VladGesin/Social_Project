import React from 'react';
import styles from "./UsersContacts.module.scss";
import Context from "../../../../store/Context";

export const UsersContacts = () => {

    const {userState} = React.useContext(Context);

    return (
        <div className={styles.rootUsersContacts}>
            <input placeholder={'חיפוש פניות'} type={'text'} className={styles.searchInput}/>
            <div className={styles.main}>
                123
            </div>
        </div>
    );
};
