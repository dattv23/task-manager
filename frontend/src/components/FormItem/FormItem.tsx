import { Form, Input } from 'antd'
import { Rule } from 'antd/es/form'
import { ReactNode } from 'react'

interface FormItemProps {
  name?: string
  label?: string
  placeholder?: string
  rules?: Rule[]
  type?: 'text' | 'password'
  children?: ReactNode
}

const FormItem: React.FC<FormItemProps> = ({
  name = '',
  label = '',
  placeholder = '',
  rules,
  type = 'text',
  children
}) => {
  return (
    <>
      <p className='mb-3 text-base font-semibold text-gray-800'>{label}</p>
      <Form.Item name={name} rules={rules}>
        {children ? (
          children
        ) : type === 'text' ? (
          <Input
            className='h-12 w-full border-[2px] border-primary border-opacity-80 py-2 text-base font-normal focus:border-opacity-100'
            classNames={{ input: 'text-md font-normal font-popins' }}
            placeholder={placeholder}
          />
        ) : (
          <Input.Password className='h-12 w-full border-[2px] border-primary border-opacity-80 py-2 text-base font-normal focus:border-opacity-100' />
        )}
      </Form.Item>
    </>
  )
}

export default FormItem
