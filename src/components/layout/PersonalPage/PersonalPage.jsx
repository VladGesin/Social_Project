import React from "react";
import styles from "./PersonalPage.module.scss";
import {PersonalDetails} from "./PersonalDetails/PersonalDetails";
import { SettingOutlined, FileTextOutlined } from '@ant-design/icons';
import {UsersContacts} from "./UsersContacts/UsersContacts";
import {UpdatePassword} from "./UpdatePassword/UpdatePassword"
import MsgBox from "../SecretaryWin/MsgBox/MsgBox";

export const PersonalPage = () => {
    const [indexCurrentMode, setIndexCurrentMode] = React.useState(0);
    const [showAlert, setShowAlert] = React.useState(false);

    const data = [
        {
            menu: {
                label: 'פרטים איישים',
                icon: () => <SettingOutlined />
            },
            mainComp: () => <PersonalDetails callbackChangeDetails={() => setShowAlert(true)}/>
        },
        {
            menu: {
                label: 'הפניות שלי',
                icon: () => <FileTextOutlined />
            },
            mainComp: () => <UsersContacts/>
        },
        {
            menu: {
                label: 'עדכון סיסמא',
                icon: () => <FileTextOutlined />
            },
            mainComp: () => <UpdatePassword/>
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
                {showAlert && <MsgBox
                    wrapperStyle={{top: 0, width: "40%"}}
                    msg={"פרטייך האישיים שונו בהצלחה!"}
                    clear={() => setShowAlert(false)}
                    type={"success"}
                />}
                {data[indexCurrentMode].mainComp()}
            </div>
        </div>
    );
}
