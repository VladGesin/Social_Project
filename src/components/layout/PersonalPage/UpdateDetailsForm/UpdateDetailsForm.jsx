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

    console.log('22222222', userState)

    const onFinish = (values) => {
        api.patch('users/' + userState.id, values.user)
            .then((res) =>{
                debugger
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
                <Input />
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
                <Input />
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
                <Input />
            </Form.Item>


            <Form.Item wrapperCol={{span: 10, offset: 0}}>
                <Button type="primary" htmlType="submit">שמירה</Button>
            </Form.Item>


        </Form>
    );
};
