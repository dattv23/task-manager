import { useState } from 'react'
import { Button } from '../../../components/Button'
import { ICONS } from '../../../assets/icons'
import { AlertDialog } from '../../../components/AlertDialog'
import { useNavigate } from 'react-router-dom'
import { checkEmail, checkPass } from '../../../utils'
import { registerAPI } from '../../../api/auth/Register'

export const Register = () => {
  const navigate = useNavigate()

  const [hidePass, setHidePass] = useState(true)
  const [hidePassConfirm, setHidePassConfirm] = useState(true)

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')

  const [description, setDescription] = useState('')
  const [alertOpen, setAlertOpen] = useState(false)

  const handleRegister = () => {
    if (name === '' || email === '' || password === '' || passwordConfirm === '') {
      setDescription('Please fill full all fields!')
      setAlertOpen(true)
      return
    }

    if (password !== passwordConfirm) {
      setDescription('Password and Confirm Password not match!')
      setAlertOpen(true)
      return
    }

    if (password.length <= 8) {
      setDescription('Password must be have minimum 8 characters with an Uppercase, symbol and number!')
      setAlertOpen(true)
      return
    }

    if (!checkEmail(email)) {
      setDescription('Email invalid!')
      setAlertOpen(true)
      return
    }

    if (!checkPass(password)) {
      setDescription('Password invalid!')
      setAlertOpen(true)
      return
    }

    registerAPI({ name: name, email: email, password: password, password_confirm: passwordConfirm })
      .then(response => {
        localStorage.setItem('userID', response.data._id)
        localStorage.setItem('email', email)
        navigate('/verify-email')
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error)
        setDescription('Please try again later!')
        setAlertOpen(true)
        return
      })

  }

  return (
    <>
      <AlertDialog className='fixed top-[50px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10' title='Warning' description={description} type={'warning'} open={alertOpen} onClose={() => setAlertOpen(false)} />
      <div className="max-w-full bg-white flex flex-1 flex-wrap relative h-screen">
        <div className="flex-[0.3] px-8 pt-3 gap-1">
          <div><span className="text-black text-[48px] font-medium font-['Poppins']">Welcome to </span><span className="text-sky-400 text-[48px] font-semibold font-['Poppins']">Alliance</span></div>
          <div className="mb-2 w-full flex-col justify-start items-start gap-2 inline-flex">
            <div className="ml-2 text-gray-800 text-base font-bold font-['Gelion']">Full name</div>
            <input className="w-full h-[50px] p-4 rounded-xl border border-gray-400" onChange={(event) => setName(event.target.value)} />
            <div className="ml-2 text-slate-500 text-xs font-normal font-['Gelion']">Example. Truong Van Dat</div>
          </div>
          <div className="mb-2 w-full flex-col justify-start items-start gap-2 inline-flex">
            <div className="ml-2 text-gray-800 text-base font-bold font-['Gelion']">Email</div>
            <input type='email' className="w-full h-[50px] p-4 rounded-xl border border-gray-400" onChange={(event) => setEmail(event.target.value)} />
            <div className="ml-2 text-slate-500 text-xs font-normal font-['Gelion']">Example. mano@gmail.com</div>
          </div>
          <div className="mb-2 w-full flex-col justify-start items-start gap-2 inline-flex">
            <div className="ml-2 text-gray-800 text-base font-bold font-['Gelion']">Password</div>
            <div className="w-full relative flex items-center">
              <input type={hidePass ? 'password' : 'text'} className="w-full h-[50px] p-4 rounded-xl border border-gray-400" onChange={(event) => setPassword(event.target.value)} />
              <button className="absolute right-2 bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer" onClick={() => setHidePass((pre) => !pre)}>Show</button>
            </div>
            <div className="ml-2 text-slate-500 text-xs font-normal font-['Gelion']">Minimum 8 characters with an Uppercase, symbol and number</div>
          </div>
          <div className="mb-2 w-full flex-col justify-start items-start gap-2 inline-flex">
            <div className="ml-2 text-gray-800 text-base font-bold font-['Gelion']">Confirm Password</div>
            <div className="w-full relative flex items-center">
              <input type={hidePassConfirm ? 'password' : 'text'} className="w-full h-[50px] p-4 rounded-xl border border-gray-400" onChange={(event) => setPasswordConfirm(event.target.value)} />
              <button className="absolute right-2 bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer" onClick={() => setHidePassConfirm((pre) => !pre)}>Show</button>
            </div>
            <div className="ml-2 text-slate-500 text-xs font-normal font-['Gelion']">Minimum 8 characters with an Uppercase, symbol and number</div>
          </div>
          <Button className="w-full" size={'sm'} onClick={handleRegister}>Continue</Button>
          <div className="my-2 w-full flex items-center justify-center">
            <div className="w-full h-[2px] border border-neutral-600 border-opacity-20"></div>
            <div className="w-full text-neutral-600 text-opacity-40 text-center font-normal font-['Poppins'] tracking-tight">Or Sign up with</div>
            <div className="w-full h-[2px] border border-neutral-600 border-opacity-20"></div>
          </div>
          <div className='flex justify-between'>
            <Button className="flex justify-center text-orange-500 items-center gap-2 text-lg w-32 h-14 bg-white rounded-[10px] border border-neutral-600 border-opacity-20">
              <ICONS.Google />
              <p>Google</p>
            </Button>
            <Button className="flex justify-center text-[#1877F2] items-center gap-2 text-lg w-32 h-14 bg-white rounded-[10px] border border-neutral-600 border-opacity-20">
              <ICONS.Facebook />
              <p>Facebook</p>
            </Button>
            <Button className="flex justify-center text-black items-center gap-2 text-lg w-32 h-14 bg-white rounded-[10px] border border-neutral-600 border-opacity-20">
              <ICONS.Github />
              <p>Github</p>
            </Button>
          </div>
          <div className='flex justify-end items-center'>
            <div className="text-neutral-600 text-opacity-40 text-base font-medium font-['Poppins'] tracking-tight">Already have an account?</div>
            <Button variant={'tertiary'} to='/login' className="text-primary text-base font-semibold font-['Poppins'] tracking-tight w-14 h-14">Log In</Button>
          </div>
        </div>
        <div className="flex-[0.7] relative h-full flex justify-end">
          <div className="w-[144px] h-[90%] bg-gradient-to-b from-sky-100 to-sky-100 shadow-inner" />
          <div className="w-[127px] h-full bg-gradient-to-b from-blue-100 to-blue-100 shadow-inner" />
          <div className="w-[157px] h-full bg-gradient-to-b from-sky-100 to-sky-100 shadow-inner" />
          <div className="w-[195px] h-full bg-gradient-to-b from-blue-200 via-blue-100 to-blue-100 shadow-inner" />
          <div className="w-[153px] h-full bg-gradient-to-b from-sky-100 to-sky-100 shadow-inner" />
          <div className="w-[127px] h-full bg-gradient-to-b from-blue-100 to-blue-100 shadow-inner" />
          <div className="w-[91px] h-full bg-gradient-to-b from-sky-100 to-sky-100 shadow-inner" />
          <div className="w-[468px] h-[100px] right-2 top-[60px] absolute">
            <div className="w-[468px] h-[100px] left-0 top-0 absolute bg-gradient-to-l from-yellow-50 to-pink-300 rounded-md shadow" />
            <div className="w-[250px] h-[47px] left-[32px] top-[27px] absolute">
              <div className="w-[250px] h-4 left-0 top-0 absolute bg-zinc-300 bg-opacity-70 rounded-sm" />
              <div className="w-[145px] h-4 left-0 top-[31px] absolute bg-zinc-300 bg-opacity-70 rounded-sm" />
            </div>
            <div className="w-[50px] h-[50px] left-[384px] top-[25px] absolute bg-white rounded-full shadow-inner" />
          </div>
          <div className="w-[728px] h-[100px] right-52 top-[200px] absolute">
            <div className="w-[728px] h-[100px] left-0 top-0 absolute bg-gradient-to-l from-pink-200 to-violet-300 rounded-md shadow" />
            <div className="w-[419px] h-[47px] left-[32px] top-[27px] absolute">
              <div className="w-[419px] h-4 left-0 top-0 absolute bg-zinc-300 rounded-sm" />
              <div className="w-[243.02px] h-4 left-0 top-[31px] absolute bg-zinc-300 rounded-sm" />
            </div>
            <div className="w-[50px] h-[50px] left-[637px] top-[35px] absolute bg-white rounded-full shadow-inner" />
          </div>
          <div className="w-[499px] h-[100px] right-32 top-[360px] absolute">
            <div className="w-[499px] h-[100px] left-0 top-0 absolute bg-gradient-to-l from-pink-200 via-indigo-700 to-pink-300 rounded-md shadow" />
            <div className="w-[250px] h-4 left-[28px] top-[26px] absolute bg-zinc-300 bg-opacity-70 rounded-sm" />
            <div className="w-[50px] h-[50px] left-[348px] top-[34px] absolute bg-white rounded-full shadow-inner" />
            <div className="w-[50px] h-[50px] left-[409px] top-[34px] absolute bg-white rounded-full shadow-inner" />
            <div className="w-[21px] h-[21px] left-[28px] top-[61px] absolute">
            </div>
            <div className="left-[61px] top-[63px] absolute text-white text-opacity-60 text-xs font-semibold font-['Poppins']">Upcoming </div>
          </div>
          <div className="w-[468px] h-[100px] left-0 top-[500px] absolute">
            <div className="w-[468px] h-[100px] left-0 top-0 absolute bg-gradient-to-l from-orange-200 to-pink-400 rounded-md shadow" />
            <div className="w-[250px] h-4 left-[23px] top-[24px] absolute bg-zinc-300 bg-opacity-70 rounded-sm" />
            <div className="w-[50px] h-[50px] left-[379px] top-[32px] absolute bg-white rounded-full shadow-inner" />
            <div className="w-[21px] h-[21px] left-[23px] top-[55px] absolute">
            </div>
            <div className="left-[54px] top-[57px] absolute text-white text-opacity-60 text-xs font-semibold font-['Poppins']">In Progress  (3/7)</div>
          </div>
          <div className="w-[610px] h-[100px] left-[413px] top-[620px] absolute">
            <div className="w-[610px] h-[100px] left-0 top-0 absolute bg-gradient-to-l from-white to-violet-100 rounded-md shadow" />
            <div className="w-[402px] h-[47px] left-[32px] top-[27px] absolute">
              <div className="w-[402px] h-4 left-0 top-0 absolute bg-zinc-300 bg-opacity-40 rounded-sm" />
              <div className="w-[233.16px] h-4 left-0 top-[31px] absolute bg-zinc-300 bg-opacity-40 rounded-sm" />
            </div>
            <div className="w-[50px] h-[50px] left-[530px] top-[33px] absolute bg-white rounded-full shadow-inner" />
          </div>
        </div>
      </div>
    </>
  )
}
