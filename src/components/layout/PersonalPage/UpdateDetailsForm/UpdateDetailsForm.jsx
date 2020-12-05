import React from 'react';
import styles from "./UpdateDetailsForm.module.scss";
import {Button, Form, Input} from 'antd';
import Context from "../../../../store/Context";
import api from "../../../../api";

const validateMessages = {
    required: '${label} - שדה חובה ',
    types: {
        email: 'לא כתובת אימייל חוקית',
        number: 'לא מספר חוקי',
    },
    number: {
        range: '${label} צריך להיות בין ${min} ל- ${max}',
    },
};

export const UpdateDetailsForm = () => {

    const {userState} = React.useContext(Context);

    const onFinish = (values) => {

        const reqObj = {
            firstName: userState.firstName,
            lastName: userState.lastName,
            email: userState.email,
            type: userState.userType,
            birthday: userState.birthday,
            phone: userState.phone,
            contactUser: userState.contactUser,
            ...values.user
        };

        api.patch(`users/${userState.id}`, reqObj)
            .then((res) => {
                alert('update details!');
            })
            .catch(_ => {
                alert('error!');
            })
    };

    return (
        <Form id={'UpdateDetailsForm'} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item
                name={['user', 'firstName']}
                label="שם פרטי"
                labelAlign={'right'}
                labelCol={{span: 0, offset: 0}}
                wrapperCol={{span: 8, offset: 0}}
                initialValue={userState.firstName}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name={['user', 'lastName']}
                label="שם משפחה"
                initialValue={userState.lastName}
                labelCol={{span: 0, offset: 0}}
                wrapperCol={{span: 8, offset: 0}}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input/>
            </Form.Item>


            <Form.Item
                name={['user', 'email']}
                label="אימייל"
                initialValue={userState.email}
                labelCol={{span: 0, offset: 0}}
                wrapperCol={{span: 8, offset: 0}}
                rules={[
                    {
                        required: true,
                        type: 'email',
                    },
                ]}
            >
                <Input/>
            </Form.Item>


            <Form.Item wrapperCol={{span: 10, offset: 0}}>
                <Button type="primary" htmlType="submit">שמירה</Button>
            </Form.Item>


        </Form>
    );
};
