import Link from 'next/link'
import Router from 'next/router'

const NavbarMenuItem = ({ label, href }) => (
  <Link href={href}>
    <a
      className={
        Router.pathname === href ? 'navbar-item has-text-link' : 'navbar-item'
      }
    >
      {label}
    </a>
  </Link>
)

export default NavbarMenuItem
