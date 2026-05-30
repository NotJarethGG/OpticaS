import { cn } from '../../lib/cn.js'

export default function Section({ id, children, className, container = true }) {
  return (
    <section id={id} className={cn('relative py-20 sm:py-24', className)}>
      <div className={cn(container && 'mx-auto max-w-7xl px-5 sm:px-8')}>{children}</div>
    </section>
  )
}
