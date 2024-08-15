import { Alert, Form, Input } from 'antd'

import { InputProps } from '~/@types'

const FormItem: React.FC<InputProps> = ({
  name,
  label,
  placeholder,
  required = true,
  rules = [],
  children,
  ...props
}) => {
  return (
    <>
      <label className='mb-3 text-base font-semibold text-gray-800'>{label}</label>
      <Form.Item
        name={name}
        rules={[
          {
            required: required,
            message: (
              <Alert
                className='bg-transparent text-base text-red-700'
                message={`Please input your ${label?.toLocaleLowerCase()}!`}
                banner
                type='error'
              />
            )
          },
          ...rules
        ]}
        {...props}
      >
        {children ? (
          children
        ) : (
          <Input
            className='h-12 w-full border-[2px] border-primary border-opacity-80 py-2 text-base font-normal focus:border-opacity-100'
            classNames={{ input: 'text-md font-normal font-popins' }}
            placeholder={placeholder}
          />
        )}
      </Form.Item>
    </>
  )
}

export default FormItem
