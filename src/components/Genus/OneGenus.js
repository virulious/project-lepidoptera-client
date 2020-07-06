import React, { Component } from 'react'
import { oneGenus } from '../../api/auth'
import { Link } from 'react-router-dom'

import Layout from '../layout/layout'

class OneGenus extends Component {
  constructor (props) {
    super(props)

    this.state = {
      species: []
    }
  }

  componentDidMount () {
    const { user } = this.props
    const { genus } = this.props.match.query
    oneGenus(genus, user)
      .then(res => this.setState({ species: res.data }))
      .catch(console.error)
  }

  render () {
    const species = this.state.species.map(species => (
      <li key={species.id}>
        <Link to={`/species/${species.id}`}>{species.name}</Link>
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

export default OneGenus
