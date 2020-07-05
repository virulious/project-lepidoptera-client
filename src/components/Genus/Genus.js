import React, { Component } from 'react'
import { getGenus } from '../../api/auth'
import { Link } from 'react-router-dom'

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
        <Link to={{
          pathname: `/genus/${genus.id}`,
          query: { props: this.props.user }
        }}>
          {genus.name}
        </Link>
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
