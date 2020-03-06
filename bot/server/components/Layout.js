import React from 'react'
import Navbar from './Navbar'

const Layout = ({ children }) => (
  <>
    <Navbar />
    <div className="container is-fluid">
      { children }
    </div>
  </>
)

export default Layout