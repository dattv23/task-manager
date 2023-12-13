import { Button, Col, Form, Input, Row } from 'antd';
import './style.scss';

type FieldType = {
	fullname?: string;
	email?: string;
	password?: string;
};

export default function Register() {
	return (
		<Row className='p-5 register'>
			<Col xs={{ span: 0 }}></Col>
			<Col xs={{ span: 24 }} className='flex flex-col items-end'>
				<Button className='float-right w-[180px] h-12 border-2 border-primary text-primary text-lg font-medium font-sans'>
					Login
				</Button>
				<div className='w-full mt-[135px]'>
					<h2 className='text-black text-4xl font-bold'>Create an Account</h2>
					<p className='text-gray text-lg mt-2'>It’s Simple and Easy!!</p>
					<Form name='basic' className='mt-10'>
						<Form.Item<FieldType>
							label='Fullname'
							name='fullname'
							rules={[
								{ required: true, message: 'Please input your fullname!' },
							]}
							required={false}
						>
							<Input />
						</Form.Item>

						<Form.Item<FieldType>
							label='Email address'
							name='email'
							rules={[
								{ required: true, message: 'Please input your email address!' },
							]}
							required={false}
						>
							<Input />
						</Form.Item>

						<Form.Item<FieldType>
							label='Enter A Password'
							name='password'
							rules={[
								{ required: true, message: 'Please input your password!' },
							]}
							required={false}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button htmlType='submit'>Submit</Button>
						</Form.Item>
					</Form>
				</div>
			</Col>
		</Row>
	);
}
