import React from "react";
import styles from "./UpdatePassword.module.scss";
import ResetPassword from "../../SecretaryWin/modals/RestPasswordModal/RestPassword"

export const UpdatePassword = () => {
 
    return (
        <div className={styles.rootUpdatePassword}>
            <div className={styles.formWrapper}>
                <ResetPassword />
            </div>
            
        </div>
    );
}
