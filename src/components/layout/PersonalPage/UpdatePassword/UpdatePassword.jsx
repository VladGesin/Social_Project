import React from "react";
import styles from "./UpdatePassword.module.scss";
import ResetPassword from "../../SecretaryWin/modals/RestPasswordModal/RestPassword";
import Context from "../../../../store/Context";
export const UpdatePassword = () => {
   const { userState } = React.useContext(Context);
   return (
      <div className={styles.rootUpdatePassword}>
         <div className={styles.formWrapper}>
            <ResetPassword id={userState.id} />
         </div>
      </div>
   );
};
