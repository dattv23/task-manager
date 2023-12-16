import { Button, Form, Input } from 'antd';
import './style.scss';

type FieldType = {
	fullname?: string;
	email?: string;
	password?: string;
};

export default function Register() {
	return (
		<div className='flex p-4 h-screen'>
			<div className='w-1/2 hidden lg:block relative bg-left px-24 py-7'>
				<h2 className='text-5xl font-semibold text-white mt-28'>
					Take your productivity to the next level.
				</h2>
				<fieldset className='border border-[#ccc] py-2 px-4 rounded-md mt-36 w-[370px]'>
					<legend className='ml-2 px-2 text-white font-semibold'>
						Get the Mobile App
					</legend>
					<Button className='bg-yellow-400 font-semibold text-primary mr-4'>
						Download on Apple
					</Button>
					<Button className='bg-white font-semibold text-primary'>
						Download on Apple
					</Button>
				</fieldset>
				<p className='text-white font-light mt-20'>
					Copyright 2023 | All Right Reserved
				</p>
			</div>
			<div className='w-full lg:w-1/2'>
				<Button className='float-right mt-2 mr-2 px-8 font-semibold border-primary text-primary'>
					Log In
				</Button>
				<div className='mt-32 px-16'>
					<h3 className='text-3xl font-bold'>Create an Account</h3>
					<p className='text-stone-600 mb-9'>It's Simple and Easy!</p>
					<Form name='basic' autoComplete='off'>
						<Form.Item<FieldType>
							label='Fullname'
							name='fullname'
							rules={[
								{ required: true, message: 'Please input your Fullname!' },
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item<FieldType>
							label='Email Address'
							name='email'
							rules={[{ required: true, message: 'Please input your email!' }]}
						>
							<Input />
						</Form.Item>

						<Form.Item<FieldType>
							label='Enter A Password'
							name='password'
							rules={[
								{ required: true, message: 'Please input your password!' },
							]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item className='w-full'>
							<Button
								type='primary'
								htmlType='submit'
								className='bg-primary w-full font-semibold'
							>
								Create Account
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
}
