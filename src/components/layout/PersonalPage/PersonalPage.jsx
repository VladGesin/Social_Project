import React from "react";
import styles from "./PersonalPage.module.scss";

export const PersonalPage = () =>{
    return (
        <div className={styles.rootPersonalPage}>
            <h1>איזור אישי</h1>

            <div className={styles.container}>
                <h2>עריכת פרטים אישיים:</h2>
            </div>

            <div className={styles.container}>
                <h2>הפניות שלי:</h2>
            </div>
        </div>
    );
}
