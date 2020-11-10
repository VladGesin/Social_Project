import React, {useContext} from 'react';
import styles from "./UpdateDetailsForm.module.scss";
import {Button, Form, Input, InputNumber} from 'antd';
import Context from "../../../../store/Context";


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
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

    const context = useContext(Context);

    const onFinish = (values) => {
        alert(values)
    };

    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item
                name={['user', 'name']}
                label="שם פרטי"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name={['user', 'name']}
                label="שם משפחה"
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
                rules={[
                    {
                        required: true,
                        type: 'email',
                    },
                ]}
            >
                <Input />
            </Form.Item>


            <Form.Item
                name={['user', 'age']}
                label="גיל"
                rules={[
                    {
                        required: true,
                        type: 'number',
                        min: 6,
                        max: 99,
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>

            <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                <Button type="primary" htmlType="submit">
                    עדכן
                </Button>
            </Form.Item>
        </Form>
    );
};
