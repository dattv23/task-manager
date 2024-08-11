import { Form } from 'antd'
import { Button } from '~/components/atoms'
import { FormItem } from '~/components/molecules'

const WorkspacePage: React.FC = () => {
  return (
    <>
      <div className='flex h-screen p-5'>
        <div className='relative hidden items-center justify-center rounded-[32px] bg-primary lg:flex lg:px-[100px] xl:w-1/2'>
          <div className='z-10 flex-1'>
            <h2 className='z-10 mb-32 text-left text-[56px] font-semibold leading-[66px] text-white'>
              Your Environment <br /> your Will.
            </h2>
          </div>
          <div className='absolute left-3/4 h-[460px] w-[460px] overflow-hidden rounded-full border-[72px] border-[#FBBE37]'></div>
        </div>
        <div className='relative  z-10 flex h-full w-full items-center  justify-center bg-white xl:w-1/2'>
          <div className='w-full flex-col items-center justify-end lg:px-8 xl:px-40'>
            <h3 className='text-[28px] font-bold text-black lg:text-[32px]'>
              Create A <span className='text-primary'>Workspace</span>
            </h3>
            <p className='mb-2 text-base font-normal text-gray-500'>Some text to fill in this space</p>
            <Form name='basic'>
              <FormItem
                name='title'
                label='Title your workspace'
                placeholder=''
                rules={[{ required: true, message: 'Please enter your name workspace!' }]}
              />
              <FormItem
                name='describe'
                label='Describe workspace'
                placeholder=''
                rules={[{ required: true, message: 'Please enter your describe!' }]}
              />
              <Form.Item>
                <Button type='submit' className='my-3 w-full lg:w-[204px]'>
                  Create
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default WorkspacePage
