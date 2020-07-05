import React, { Component } from 'react'
import { oneGenus } from '../../api/auth'

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
    oneGenus(user)
      .then(res => this.setState({ species: res.data }))
      .catch(console.error)
  }

  render () {
    const species = this.state.species.map(species => (
      <li key={species.id}>
        <p>{species.name}</p>
      </li>
    ))

    return (
      <Layout>
        <h4>Genus</h4>
        <ul>
          {species}
        </ul>
      </Layout>
    )
  }
}

export default OneGenus