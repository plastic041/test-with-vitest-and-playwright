import { forwardRef } from 'react'

export const IconButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`flex select-none outline-none items-center justify-center h-8 w-8 border border-transparent rounded bg-white hover:bg-teal-100/75 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition-all ${className}`}
      {...props}
    >
      {children}
    </button>
  )
})
