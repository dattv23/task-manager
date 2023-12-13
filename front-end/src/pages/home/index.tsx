import { Button } from '../../components/Button';
import { IMAGES } from '../../assets/images/images';
import { Navbar } from './Navbar';

export default function Home() {
	return (
		<div className='px-8'>
			<Navbar />
			<div className='grid grid-cols-2'>
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
				<div className='invisible desktop:visible'>
					<img
						src={IMAGES.female}
						width={500}
						className='fixed z-10 bottom-3'
					/>
					<img
						src={IMAGES.stopwatch}
						className='fixed top-30 left-98'
						width={110}
					/>
					<img
						src={IMAGES.pie_chart}
						width={60}
						className='fixed top-64 left-[600px]'
					/>
					<img
						src={IMAGES.calendar}
						width={90}
						className='fixed top-56 left-[1100px]'
					/>
					<img
						src={IMAGES.notifications}
						className='fixed z-10 bottom-52 left-[1048px]'
					/>
					<img src={IMAGES.vector} className='fixed bottom-0 left-0 h-44' />
				</div>
			</div>
		</div>
	);
}
