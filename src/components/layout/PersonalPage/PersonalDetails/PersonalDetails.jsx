import React from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./PersonalDetails.module.scss";
import Context from "../../../../store/Context";
import {UpdateDetailsForm} from "../UpdateDetailsForm/UpdateDetailsForm";
import avatar from './avatar-icon.png';

export const PersonalDetails = ({callbackChangeDetails}) => {
    const {userState} = React.useContext(Context);
    const [changeImageModalIsOpen, setChangeImageModalIsOpen] = React.useState(false);
    return (
        <div className={styles.rootPersonalDetails}>
            <div className={styles.header}>
                <img className={styles.avatarImg} src={avatar}/>
                <div className={styles.options}>
                    <div className={styles.name}>{userState.lastName} {userState.firstName}</div>
                    <button
                        className={styles.changeImgBtn}
                        onClick={() => setChangeImageModalIsOpen(true)}
                    >
                        שינוי תמונת פרופיל
                    </button>
                </div>
            </div>

            <div className={styles.main}>
                <UpdateDetailsForm callbackChangeDetails={callbackChangeDetails}/>
            </div>

            <Modal
                show={changeImageModalIsOpen}
                contentClassName={styles.changeImageModal}
                centered
                size="s.m"
                backdrop={"static"}
            >
                <button>שינוי תמונת פרופיל</button>
                <button>העלאת תמונה</button>
                <button>הסרת תמונת פרופיל</button>
                <button onClick={() => setChangeImageModalIsOpen(false)}>ביטול</button>
            </Modal>


        </div>
    );
}
