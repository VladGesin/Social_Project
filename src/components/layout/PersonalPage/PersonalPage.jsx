import React from "react";
import styles from "./PersonalPage.module.scss";
import {UpdateDetailsForm} from "./UpdateDetailsForm/UpdateDetailsForm";
import {PersonalDetails} from "./PersonalDetails/PersonalDetails";

export const PersonalPage = () => {
    const [indexCurrentMode, setIndexCurrentMode] = React.useState(0);

    const data = [
        {
            menu: {
                label: 'פרטים איישים',
                iconSrc: ''
            },
            mainComp: () => <PersonalDetails/>
        },
        {
            menu: {
                label: 'הפניות שלי',
                iconSrc: ''
            },
            mainComp: () => <div>הפניות שלי</div>
        },
    ]

    return (
        <div className={styles.rootPersonalPage}>

            <div className={styles.menu}>
                <h2>איזור אישי</h2>
                <ul>
                    {data.map(({menu}, i) => {
                        return (
                            <li key={i} onClick={() => setIndexCurrentMode(i)}>
                                <span className={styles.icon}>icon</span>
                                {menu.label}
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className={styles.main}>
                {data[indexCurrentMode].mainComp()}
            </div>
        </div>
    );
}
