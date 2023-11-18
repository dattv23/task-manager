import { Button } from '../Button'

export const Loading = () => {
  return (
    <>
      <Button className="w-full" size={'sm'}>
        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
          ...
        </svg>
        Processing...
      </Button>
    </>
  )
}
