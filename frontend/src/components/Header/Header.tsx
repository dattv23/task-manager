import Search from '../Search'

const Header: React.FC = () => {
  return (
    <header className='flex justify-between py-6'>
      <Search />
      <button className='lg:mr-6'>
        <i className='icon ion-md-notifications-outline text-2xl text-primary'></i>
      </button>
    </header>
  )
}

export default Header
