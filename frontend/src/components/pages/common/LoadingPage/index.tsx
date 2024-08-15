const LoadingPage: React.FC = () => {
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center'>
      <img
        src='https://cdn.dribbble.com/users/308400/screenshots/3718849/media/ce4fa4998b6b73d52335a474bd6ad651.gif'
        alt='Loading'
      />
      <h1 className='mt-2 text-2xl'>Thanks for your patience!</h1>
    </div>
  )
}

export default LoadingPage
