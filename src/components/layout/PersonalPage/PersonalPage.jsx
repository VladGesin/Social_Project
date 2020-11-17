import React from "react";
import styles from "./PersonalPage.module.scss";
import {UpdateDetailsForm} from "./UpdateDetailsForm/UpdateDetailsForm";

export const PersonalPage = () => {
    const [isDetailsMode, setIsDetailsMode] = React.useState(true)

    return (
        <div className={styles.rootPersonalPage}>

            <div className={styles.menu}>
                <h2>איזור אישי</h2>
                <ul>
                    <li onClick={() => setIsDetailsMode(true)}>
                        <span className={styles.icon}>icon</span>
                        פרטים איישים
                    </li>
                    <li onClick={() => setIsDetailsMode(false)}>
                        <span className={styles.icon}>icon</span>
                        הפניות שלי
                    </li>
                </ul>
            </div>

            <div className={styles.main}>
                {isDetailsMode ?
                    <div>שינוי פרטים</div>
                    :
                    <div>הפניות שלי</div>
                }
            </div>

            {/*<div className={styles.container}>*/}
            {/*    <h2>עריכת פרטים אישיים:</h2>*/}

            {/*    <div className={styles.formWrapper}>*/}
            {/*        <UpdateDetailsForm/>*/}
            {/*    </div>*/}

            {/*</div>*/}

            {/*<div className={styles.container}>*/}
            {/*    <h2>הפניות שלי:</h2>*/}
            {/*</div>*/}
        </div>
    );
}
