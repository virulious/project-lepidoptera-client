import React, { Component } from 'react'
import { oneGenus } from '../../api/auth'
import { Link } from 'react-router-dom'

import Layout from '../layout/layout'

class OneGenus extends Component {
  constructor (props, item) {
    super(props, item)

    this.state = {
      species: []
    }
  }

  componentDidMount () {
    console.log(this.props)
    console.log(this.item)
    const { user } = this.props
    oneGenus(this.props.match.params.id, user)
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
