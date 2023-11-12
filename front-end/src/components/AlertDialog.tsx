import * as React from 'react'
import { cn } from '../utils'
import { ICONS } from '../assets/icons'
import { IAlertDialog, alertDialogVariants } from '../types/AlertDialog.types'


const AlertDialog = ({ className, type, form, title, description, ...props }: IAlertDialog) => {
  const [close, setClose] = React.useState(false)

  if (!close) {
    return <div className={cn(alertDialogVariants({ type, form, className }))} {...props}>
      <div className="relative">
        <div className="w-10 h-10 left-0 top-[1px] absolute">
          <div className="w-10 h-10 left-0 top-0 absolute bg-white bg-opacity-20 rounded-full">
          </div>
          <div className="w-[18px] h-[18px] left-[11px] top-[11px] absolute">
            {(type === 'error') && <ICONS.ErrorTriangle />}
            {(type === 'warning') && <ICONS.ErrorCircle />}
            {(type === 'success') && <ICONS.Check />}
            {(type === 'info') && <ICONS.ErrorCircle />}
          </div>
        </div>
        <div className="w-[107px] h-[38px] left-[60px] top-0 absolute">
          <div className="left-0 top-0 absolute text-lg font-medium font-['Gelion']">{title}</div>
          <div className="left-0 top-[24px] absolute text-xs font-light font-['Gelion']">{description}</div>
        </div>
      </div>
      <button onClick={() => setClose(true)} className="w-[18px] h-[18px] relative">
        <ICONS.Close />
      </button>
    </div>
  }
}

AlertDialog.displayName = 'Alert Dialog'

export { AlertDialog }