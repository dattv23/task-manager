import { useState } from 'react'
import { Button } from '../../../components/Button'
import { ICONS } from '../../../assets/icons'
import { checkEmail, checkPass } from '../../../utils'
import { loginAPI } from '../../../api/auth/Login'
import { Loading } from '../../../components/Loading'
import { AlertDialog } from '../../../components/AlertDialog'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAppDispatch } from '../../../hooks/redux'
import { updateSignIn } from '../../../redux/slices/app'

export const Login = () => {
  const [hidePass, setHidePass] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [description, setDescription] = useState('')
  const [alertOpen, setAlertOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
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

    setIsLoading(true)
    try {
      const response = await loginAPI({ email: email, password: password })
      // Do something with the response
      if (response.status === 200) {
        dispatch(updateSignIn(true))
        navigate('/boards')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Do something with this error...
        if (error.response?.status === 422) {
          setDescription('Email or password not correct!')
          setAlertOpen(true)
        } else if (error.response?.status === 401) {
          navigate('/verify-email')
        }
      } else {
        setDescription('Please try again later!')
        setAlertOpen(true)
      }
    } finally {
      setIsLoading(false)
    }
    return
  }

  return (
    <>
      <AlertDialog className='fixed top-[50px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10' title='Warning' description={description} type={'warning'} open={alertOpen} onClose={() => setAlertOpen(false)} />
      <div className="w-screen h-screen bg-white flex flex-1 flex-wrap relative">
        <div className="flex-[0.3] h-full p-8 gap-2">
          <div className="text-black text-[48px] font-medium font-['Poppins']">Welcome back!</div>
          <div className="mb-2 w-full flex-col justify-start items-start gap-2 inline-flex">
            <div className="ml-2 text-gray-800 text-base font-bold font-['Gelion']">Email</div>
            <input type='email' className="w-full h-[50px] p-4 rounded-xl border border-gray-400" onChange={(e) => setEmail(e.target.value)} />
            <div className="ml-2 text-slate-500 text-xs font-normal font-['Gelion']">Example. mano@gmail.com</div>
          </div>
          <div className="mb-2 w-full flex-col justify-start items-start gap-2 inline-flex">
            <div className="ml-2 text-gray-800 text-base font-bold font-['Gelion']">Password</div>
            <div className="w-full relative flex items-center">
              <input type={hidePass ? 'password' : 'text'} className="w-full h-[50px] p-4 rounded-xl border border-gray-400" onChange={(e) => setPassword(e.target.value)} />
              <button className="absolute right-2 bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer" onClick={() => setHidePass((pre) => !pre)}>Show</button>
            </div>
            <div className="ml-2 text-slate-500 text-xs font-normal font-['Gelion']">Upto 8 characters with an Uppercase, symbol and number</div>
          </div>
          {!isLoading ? <Button className="w-full" size={'sm'} onClick={handleLogin}>Log In</Button>
            : <Loading />}
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
            <div className="text-neutral-600 text-opacity-40 text-base font-medium font-['Poppins'] tracking-tight">Not a member?</div>
            <Button variant={'tertiary'} to='/register' className="text-primary text-base font-semibold font-['Poppins'] tracking-tight">Create an account</Button>
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
