import React from "react";
import styles from "./MainCommitteesPage.module.scss";
import {NavLink} from "react-router-dom";
import {committeesConfig} from "./committeesConfig";
import { Table} from 'antd';



export const MainCommitteesPage = () => {

    const columns = [
        {
            title: 'שם ועדה',
            dataIndex: 'name',
            key: 'name',
            align: 'right',
            render: (text, {url}) => <NavLink to={url}>{text}</NavLink>
        },
        {
            title: 'פירוט',
            dataIndex: 'desc',
            key: 'desc',
            align: 'right',
        }
    ];

    const _data= committeesConfig.map((item, i) =>{
        return ({
            key: i+1,
            name: item.name,
            desc: item.desc,
            url: `/Social_Project/committees/${item.paramKey}`
        });
    })

    return (
        <div className={styles.rootMainCommitteesPage}>
            <h2>מסך ועדות ראשי</h2>
            <div className={styles.tableWrapper} dir={'rtl'}>
                <Table pagination={false} columns={columns} dataSource={_data} />
            </div>
        </div>
    );
}
