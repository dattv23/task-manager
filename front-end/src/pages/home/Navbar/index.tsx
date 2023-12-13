import { Link } from 'react-router-dom';
import { Button } from '../../../components/Button';

export const Navbar = () => {
	return (
		<div className='flex justify-between'>
			<Link
				to={'/'}
				className="text-primary text-[48px] font-semibold font-['Poppins']"
			>
				Alliance.
			</Link>
			<div className='flex justify-end items-center gap-2'>
				<Button to='/register' variant={'primary'} size={'sm'} className='w-28'>
					Sign Up
				</Button>
				<Button to='/login' variant={'secondary'} size={'sm'} className='w-28'>
					Sign In
				</Button>
			</div>
		</div>
	);
};
