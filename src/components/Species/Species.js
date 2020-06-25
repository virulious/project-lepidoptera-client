import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getSpecies } from '../../api/auth'

import Layout from '../layout/layout'

class Species extends Component {
  constructor (props) {
    super(props)

    this.state = {
      species: []
    }
  }

  componentDidMount () {
    getSpecies(this.props.user)
      .then(res => this.setState({ species: res.data.species }))
      .catch(console.error)
  }

  render () {
    const species = this.state.species.map(species => (
      <li key={species.id}>
        <Link to={`/species/${species._id}`}>{species.name}</Link>
      </li>
    ))

    return (
      <Layout>
        <h4>Species</h4>
        <ul>
          {species}
        </ul>
      </Layout>
    )
  }
}

export default Species
