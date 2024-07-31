export default function Card({
  children,
  className = '',
}: {
  children: React.ReactNode
  className: string
}) {
  return (
    <div className={[className, 'flex flex-col'].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}
const Header = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex">{children}</div>
)
Card.Header = Header
const Body = ({ children }: { children: React.ReactNode }) => (
  <div className="relative  p-3 md:p-6 lg:p-9 ">{children}</div>
)
Card.Body = Body
const Footer = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex">{children}</div>
)
Card.Footer = Footer
