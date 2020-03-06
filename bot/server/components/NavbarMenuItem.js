import Link from 'next/link'

const NavbarMenuItem = ({ label, href }) => (
  <Link href={href}>
    <a className="navbar-item">
      { label }
    </a>
  </Link>
)

export default NavbarMenuItem