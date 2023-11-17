import { useState, useEffect } from 'react'
import { Button } from '../../../components/Button'
import { AlertDialog } from '../../../components/AlertDialog'
import { verifyEmailAPI } from '../../../api/auth/VerifyEmail'
import { useNavigate } from 'react-router-dom'
import { resendVerifyAPI } from '../../../api/auth/ResendVerify'
import { useAppDispatch } from '../../../hook/redux'
import { updateSignIn } from '../../../redux/slices/app'

export const VerifyEmail = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [alertWarningOpen, setAlertWarningOpen] = useState(false)
  const [alertSuccessOpen, setAlertSuccessOpen] = useState(false)
  const [description, setDescription] = useState('')

  useEffect(() => {
    const email = localStorage.getItem('email')
    if (!email) {
      setDescription('No email for verify!')
      setAlertWarningOpen(true)
      return
    }
    setEmail(email)
  }, [])


  const getDataInputs = () => {
    const values: string[] = []
    document.querySelectorAll('input').forEach(input => {
      values.push(input.value)
    })
    return values
  }

  const handleVerify = () => {
    const code = getDataInputs().join('')
    if (code.length !== 6) {
      setDescription('Code OTP must be have six digit!')
      setAlertWarningOpen(true)
      return
    }
    verifyEmailAPI({ email: email, code: code })
      .then((response) => {
        if (response.status === 200) {
          dispatch(updateSignIn(true))
          navigate('/boards')
        }
      })
      .catch(error => {
        if (error.response) {
          setDescription(error.response.data.message)
          setAlertWarningOpen(true)
          return
        }

        if (error.code === 'ERR_NETWORK') {
          setDescription('Network Error. Please check your internet connection and try again.')
          setAlertWarningOpen(true)
        } else {
          // Handle other errors as needed
          setDescription('An unexpected error occurred. Please try again later.')
          setAlertWarningOpen(true)
        }
      })
  }

  const handleResendVerify = () => {
    resendVerifyAPI({ email: email })
      .then(response => {
        setDescription(response.data.message)
        setAlertSuccessOpen(true)
        return
      })
      .catch(() => {
        setDescription('Please try again later!')
        setAlertWarningOpen(true)
        return
      })
  }

  return (
    <>
      <AlertDialog className='fixed top-[50px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10' title='Warning' description={description} type={'warning'} open={alertWarningOpen} onClose={() => setAlertWarningOpen(false)} />
      <AlertDialog className='fixed top-[50px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10' title='Success' description={description} type={'success'} open={alertSuccessOpen} onClose={() => setAlertSuccessOpen(false)} />
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen min-w-screen flex justify-center items-center">
        <div className="w-3/5 bg-slate-400 rounded-md flex items-center flex-col opacity-80 py-12">
          <h2 className="text-4xl py-5 font-medium">Verify Your Account</h2>
          <p className="text-xl">
            We emailed you the six digit code to {email} <br />
            Enter the code below to confirm your email address
          </p>
          <div className="my-5">
            <input type="number" className="m-3 h-20 w-16 bg-slate-100 border border-[#eee] text-center rounded" placeholder="0" min="0" max="9" required />
            <input type="number" className="m-3 h-20 w-16 bg-slate-100 border border-[#eee] text-center rounded" placeholder="0" min="0" max="9" required />
            <input type="number" className="m-3 h-20 w-16 bg-slate-100 border border-[#eee] text-center rounded" placeholder="0" min="0" max="9" required />
            <input type="number" className="m-3 h-20 w-16 bg-slate-100 border border-[#eee] text-center rounded" placeholder="0" min="0" max="9" required />
            <input type="number" className="m-3 h-20 w-16 bg-slate-100 border border-[#eee] text-center rounded" placeholder="0" min="0" max="9" required />
            <input type="number" className="m-3 h-20 w-16 bg-slate-100 border border-[#eee] text-center rounded" placeholder="0" min="0" max="9" required />
          </div>
          <div>
            <Button variant={'primary'} className='mt-2 mb-8' onClick={handleVerify}>Verify</Button>
          </div>
          <small className="text-base">
            If you didn't receive a code !! <Button variant={'tertiary'} className='w-50 text-red-600' onClick={handleResendVerify}> RESEND</Button>
          </small>
        </div>
      </div>
    </>
  )
}
