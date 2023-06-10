import { forwardRef } from 'react'

export const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const { className = '', ...rest } = props
  return (
    <button
      ref={ref}
      {...rest}
      className={`transition-colors font-bold h-16 w-24 rounded text-4xl flex items-center justify-center cursor-pointer disabled:cursor-not-allowed ${className}`}
    />
  )
})
