import Search from '../Search'

const Header: React.FC = () => {
  return (
    <div className='flex justify-between py-6'>
      <Search />
      <button>
        <i className='icon ion-md-notifications-outline text-2xl text-primary'></i>
      </button>
    </div>
  )
}

export default Header
