import React, { Component } from 'react'
import { getGenus } from '../../api/auth'
import Nav from 'react-bootstrap/Nav'

import Layout from '../layout/layout'

class Genus extends Component {
  constructor (props) {
    super(props)

    this.state = {
      genera: [],
      species: []
    }
  }

  componentDidMount () {
    const { user } = this.props
    getGenus(user)
      .then(res => this.setState({ genera: res.data }))
      .catch(console.error)
  }

  render () {
    const genera = this.state.genera.map(genus => (
      <li key={genus.id}>
        <Nav.Link href="#genus/:id/" id={genus.id}>{genus.name}</Nav.Link>
      </li>
    ))

    return (
      <Layout>
        <h4>Genus</h4>
        <ul>
          {genera}
        </ul>
      </Layout>
    )
  }
}

export default Genus
