import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { IMAGES } from '../../assets/images/images';

export default function Home() {
	return (
		<div className='container mx-auto relative h-screen'>
			<div className='flex px-8 flex-col items-center 2xl:flex-row 2xl:justify-between'>
				<Link
					to={'/'}
					className="text-primary text-[48px] font-semibold font-['Poppins']"
				>
					Alliance.
				</Link>
				<div className='flex justify-end items-center gap-2'>
					<Button
						to='/register'
						variant={'primary'}
						size={'sm'}
						className='w-28'
					>
						Sign Up
					</Button>
					<Button
						to='/login'
						variant={'secondary'}
						size={'sm'}
						className='w-28'
					>
						Sign In
					</Button>
				</div>
			</div>
			<div className='px-8 grid lg:grid-cols-2 md:grid-cols-1 md:gap-2 mt-14'>
				<div className='mt-36 flex flex-col gap-2'>
					<p className="text-5xl font-semibold font-['Poppins']">
						Task Management &<br />
						To-Do List
					</p>
					<p className="text-zinc-500 text-[24px] font-normal font-['Poppins']">
						This productive tool is designed to help
						<br />
						you better manage your task project-wise <br />
						conveniently!
					</p>
					<Button
						to='/tasks'
						className='w-full max-w-[448px] mt-4 text-2xl font-semibold'
					>
						Let’s Start
					</Button>
				</div>
				<div className='relative w-0 2xl:w-full'>
					<img src={IMAGES.female} className='absolute top-40 left-32' />
					<img src={IMAGES.calendar} className='absolute top-32 right-2' />
					<img src={IMAGES.stopwatch} className='absolute top-4 left-8' />
					<img src={IMAGES.pie_chart} className='absolute top-72' />
					<img
						src={IMAGES.notifications}
						className='absolute top-[410px] left-[520px]'
					/>
				</div>
			</div>
		</div>
	);
}
