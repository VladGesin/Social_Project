import React from "react";
import styles from "./PersonalPage.module.scss";
import {PersonalDetails} from "./PersonalDetails/PersonalDetails";
import { SettingOutlined, FileTextOutlined } from '@ant-design/icons';

export const PersonalPage = () => {
    const [indexCurrentMode, setIndexCurrentMode] = React.useState(0);

    const data = [
        {
            menu: {
                label: 'פרטים איישים',
                icon: () => <SettingOutlined />
            },
            mainComp: () => <PersonalDetails/>
        },
        {
            menu: {
                label: 'הפניות שלי',
                icon: () => <FileTextOutlined />
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
                            <li key={i} onClick={() => setIndexCurrentMode(i)} className={`${indexCurrentMode === i? styles.selected: ''}`}>
                                <span className={styles.icon}>{menu.icon()}</span>
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
