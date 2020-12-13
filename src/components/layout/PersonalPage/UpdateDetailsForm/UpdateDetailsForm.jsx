import React from 'react';
import styles from "./UpdateDetailsForm.module.scss";
import Context from "../../../../store/Context";
import api from "../../../../api";
import {Formik} from "formik";

export const UpdateDetailsForm = () => {

    const {userState} = React.useContext(Context);

    const handleSubmit = (values, {setSubmitting}) => {
        const reqObj = {
            firstName: userState.firstName,
            lastName: userState.lastName,
            email: userState.email,
            type: userState.userType,
            birthday: userState.birthday,
            phone: userState.phone,
            contactUser: userState.contactUser,
            ...values
        };

        api.patch(`users/${userState.id}`, reqObj)
            .then((res) => {
                setSubmitting(false);
                alert('update details!');
            })
            .catch(_ => {
                alert('error!');
            })
    }

    const validateFunc = values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'שדה חובה';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'כתובת אימייל אינה תקינה';
        }

        if (!values.firstName) {
            errors.firstName = 'שדה חובה';
        }
        if (!values.phone) {
            errors.phone = 'שדה חובה';
        }
        if (!values.lastName) {
            errors.lastName = 'שדה חובה';
        }
        return errors;
    }

    return (
        <Formik
            initialValues={{
                phone: userState.phone,
                firstName: userState.firstName,
                lastName: userState.lastName,
                email: userState.email
            }}
            validate={validateFunc}
            onSubmit={handleSubmit}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.fieldContainer}>
                        <label>שם פרטי</label>
                        <input
                            type="text"
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                            className={errors.firstName && touched.firstName ? styles.notValid : ''}
                        />
                        {errors.firstName && touched.firstName && <span className={styles.error}>
                            {errors.firstName}
                        </span>}
                    </div>

                    <div className={styles.fieldContainer}>
                        <label>שם משפחה</label>
                        <input
                            type="text"
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                            className={errors.lastName && touched.lastName ? styles.notValid : ''}
                        />
                        {errors.lastName && touched.lastName && <span className={styles.error}>
                            {errors.lastName}
                        </span>}
                    </div>

                    <div className={styles.fieldContainer}>
                        <label>כתובת אימייל</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            className={errors.email && touched.email ? styles.notValid : ''}
                        />
                        {errors.email && touched.email && <span className={styles.error}>
                            {errors.email}
                        </span>}
                    </div>

                    <div className={styles.fieldContainer}>
                        <label>מספר טלפון</label>
                        <input
                            type="number"
                            name="phone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                            className={errors.phone && touched.phone ? styles.notValid : ''}
                        />
                        {errors.phone && touched.phone && <span className={styles.error}>
                           {errors.phone}
                        </span>}
                    </div>

                    <button type="submit" disabled={isSubmitting || !(Object.keys(errors).length === 0)}>
                        שמירה
                    </button>
                </form>
            )}
        </Formik>

    );
};
