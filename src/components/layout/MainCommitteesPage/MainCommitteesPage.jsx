import React from "react";
import styles from "./MainCommitteesPage.module.scss";
import {NavLink} from "react-router-dom";
import {committeesConfig} from "./committeesConfig";


export const MainCommitteesPage = () => {

    return (
        <div className={styles.rootMainCommitteesPage}>
            <h1>מסך ועדות ראשי</h1>
            <ul>
                {committeesConfig.map(({paramKey, name}, i) => {
                    return (
                        <li key={i}>
                            <NavLink to={`/Social_Project/committees/${paramKey}`}>{name}</NavLink>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
