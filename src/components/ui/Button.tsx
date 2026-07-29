import { type ButtonHTMLAttributes, type ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'line'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: Variant
  asChild?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-ink text-paper hover:bg-ink/90 dark:bg-paper dark:text-ink dark:hover:bg-paper/90',
  ghost:
    'bg-transparent text-ink border border-line hover:bg-ink/5 dark:text-paper dark:border-line-dark dark:hover:bg-paper/5',
  line: 'bg-transparent text-ink underline-offset-4 hover:underline dark:text-paper',
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
