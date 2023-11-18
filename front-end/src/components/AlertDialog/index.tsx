import { cn } from '../../utils'
import { ICONS } from '../../assets/icons'
import { IAlertDialog, alertDialogVariants } from './types'

const AlertDialog = ({ className, open, onClose, type, form, title, description, ...props }: IAlertDialog) => {
  if (!open) {
    return null
  }

  return (
    <>
      <div className={cn(alertDialogVariants({ type, form, className }))} {...props}>
        <div className="w-full h-full flex justify-between items-center">
          <div>
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex justify-center items-center">
              {(type === 'error') && <ICONS.ErrorTriangle />}
              {(type === 'warning') && <ICONS.ErrorCircle />}
              {(type === 'success') && <ICONS.Check />}
              {(type === 'info') && <ICONS.ErrorCircle />}
            </div>
          </div>
          <div className='w-full px-2'>
            <p className="text-lg font-medium font-['Gelion']">{title}</p>
            <p className="text-xs font-light font-['Gelion']">{description}</p>
          </div>
        </div>
        <button onClick={onClose} className="w-[18px] h-[18px] relative">
          <ICONS.Close />
        </button>
      </div></>
  )
}

AlertDialog.displayName = 'Alert Dialog'

export { AlertDialog }