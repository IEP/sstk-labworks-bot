import React from 'react'
import Navbar from './Navbar'

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="container is-fluid">
          { this.props.children }
        </div>
      </>
    )
  }
}

export default Layout