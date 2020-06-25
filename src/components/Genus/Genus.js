import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getGenus, oneSpecies } from '../../api/auth'

import Layout from '../layout/layout'

class Genus extends Component {
  constructor (props) {
    super(props)

    this.state = {
      genus: []
    }
  }

  componentDidMount () {
    getGenus(this.props.user)
      .then(res => this.setState({ genus: res.data.genus }))
      .catch(console.error)
  }

  render () {
    const genus = this.state.genus.map(genus => (
      <li key={genus.id}>
        <Link to={oneSpecies}>{oneSpecies.name}</Link>
      </li>
    ))

    return (
      <Layout>
        <h4>Genus</h4>
        <ul>
          {genus}
        </ul>
      </Layout>
    )
  }
}

export default Genus
