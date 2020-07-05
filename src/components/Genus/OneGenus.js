import React, { Component } from 'react'
import { oneGenus } from '../../api/auth'
import { Link } from 'react-router-dom'

import Layout from '../layout/layout'

class OneGenus extends Component {
  constructor (props, params) {
    super(props, params)

    this.state = {
      species: []
    }
  }

  componentDidMount () {
    console.log(this.props)
    console.log(this.params)
    const { user } = this.props
    const { genus } = this.props.matchs.params
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
