import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

interface Props {
    onLogin: (username: string) => void;
}

export default function LoginForm({ onLogin }: Props) {
    const [form] = Form.useForm();
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onValuesChange = () => {
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length > 0);
        const isTouched = form.isFieldsTouched(true);
        const values = form.getFieldsValue();
        const requiredFieldsFilled = values.username && values.password;
        setSubmitDisabled(!(isTouched && requiredFieldsFilled && !hasErrors));
    };

    const onFinish = async (values: { username: string; password: string }) => {
        setLoading(true);
        setSubmitDisabled(true);
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                message.success('Login successful!', 1.5);
                onLogin(values.username); // set user in parent app
            } else {
                const data = await response.json();
                message.error(data.message || 'Login failed. Try again.', 2.5);
            }
        } catch (error) {
            message.error('Login failed. Try again.', 2.5);
        } finally {
            setLoading(false);
            setTimeout(() => setSubmitDisabled(false), 400);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105 duration-300">
                <h2 className="text-4xl font-bold mb-6 text-center text-indigo-700">Login</h2>
                <Form
                    form={form}
                    onFinish={onFinish}
                    onValuesChange={onValuesChange}
                    layout="vertical"
                    className="space-y-6"
                >
                    <Form.Item
                        label={<span className="text-lg font-semibold text-indigo-700">Username</span>}
                        name="username"
                        rules={[
                            { required: true, message: 'Username is required' },
                            { pattern: /^[a-zA-Z0-9._-]+$/, message: 'Username invalid' },
                        ]}
                    >
                        <Input placeholder="Enter your username" className="border-indigo-300 focus:border-indigo-500 rounded-lg p-2" autoComplete="username" />
                    </Form.Item>
                    <Form.Item
                        label={<span className="text-lg font-semibold text-indigo-700">Password</span>}
                        name="password"
                        rules={[
                            { required: true, message: 'Password is required' },
                            { min: 4, message: 'Password too short' },
                        ]}
                    >
                        <Input.Password placeholder="Enter your password" className="border-indigo-300 focus:border-indigo-500 rounded-lg p-2" autoComplete="current-password" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            disabled={submitDisabled}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300"
                        >
                            Log In
                        </Button>
                    </Form.Item>
                    <div className="text-center text-gray-600 space-y-2">
                        {/* Optionally, remove or customize the links below */}
                        {/* <div>
              <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">Forgot Password?</a>
            </div>
            <div>
              Don't have an account? <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">Sign Up</a>
            </div> */}
                    </div>
                </Form>
            </div>
        </div>
    );
}
