import React,{useEffect,useState} from "react";
import styles from "./MainCommitteesPage.module.scss";
import {NavLink} from "react-router-dom";
import {committeesConfig} from "./committeesConfig";
import {Input, Table} from 'antd';
import api from '../../../api'
const {Search} = Input;

export const MainCommitteesPage = () => {
    const [committeeData,setCommitteeData] = useState([])

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
    useEffect(()=>{
        getCommitteeNames();
    },[])

    const getCommitteeNames = async ()=>{
        const res = await api.get("committees");
        const data = res.data;
        data[0].desc="תיאור וועדה 1"
        data[1].desc="תיאור וועדה 1"
        data[2].desc="תיאור וועדה 1"
        console.log(res.data);
    }
    const _data = committeesConfig.map((item, i) => {
        return ({
            key: i + 1,
            name: item.name,
            desc: item.desc,
            url: `/Social_Project/committees/${item.paramKey}`
        });
    })

    const onSearch = value => console.log(value);

    return (
        <div className={styles.rootMainCommitteesPage}>
            <h2>מסך ועדות ראשי</h2>

            {/*<div className={styles.inputSearchWrapper}>*/}
            {/*    <Search*/}
            {/*        placeholder="input search text"*/}
            {/*        allowClear*/}
            {/*        onSearch={onSearch}*/}
            {/*        style={{width: 200, margin: '0 10px'}}*/}
            {/*        onPressEnter={() => alert('enter')}*/}
            {/*    />*/}
            {/*</div>*/}

            <div className={styles.tableWrapper} dir={'rtl'}>
                <Table pagination={false} columns={columns} dataSource={_data} />
            </div>
        </div>
    );
}
