import React from "react";
import styles from "./PersonalDetails.module.scss";
import Context from "../../../../store/Context";
import {UpdateDetailsForm} from "../UpdateDetailsForm/UpdateDetailsForm";
import avatar from './avatar-icon.png';

export const PersonalDetails = () => {
    const {userState} = React.useContext(Context);
    return (
        <div className={styles.rootPersonalDetails}>
            <div className={styles.header}>
                <img className={styles.avatarImg} src={avatar}/>
                <div className={styles.options}>
                    <div className={styles.name}>{userState.lastName} {userState.firstName}</div>
                    <button
                        className={styles.changeImgBtn}
                        onClick={() => alert('שינוי תמונת פרופיל')}
                    >
                        שינוי תמונת פרופיל
                    </button>
                </div>
            </div>

            <div className={styles.main}>
                <UpdateDetailsForm/>
            </div>

        </div>
    );
}
