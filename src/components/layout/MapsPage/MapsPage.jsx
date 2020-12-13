import React from "react";
import styles from "./MapsPage.module.scss";
import MarkersMap from "./MarkersMap/MarkersMap";

export const MapsPage = () =>{
    return (
        <div className={styles.rootMapsPage}>
            <MarkersMap/>
        </div>
    );
}
