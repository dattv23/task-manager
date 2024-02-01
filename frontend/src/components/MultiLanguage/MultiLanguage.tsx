import { useState } from 'react'

const MultiLanguage: React.FC = () => {
  const [language, setLanguage] = useState('english')

  return (
    <div className='flex items-center'>
      <i
        className='icon ion-md-globe mr-2 cursor-pointer text-2xl'
        onClick={() => setLanguage((pre) => (pre === 'english' ? 'vietnamese' : 'english'))}
      ></i>
      <p>{language.charAt(0).toUpperCase() + language.slice(1)}</p>
    </div>
  )
}

export default MultiLanguage
