import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getGenus } from '../../api/auth'
import apiUrl from '../../apiConfig'

import Layout from '../layout/layout'

class Genus extends Component {
  constructor (props) {
    super(props)

    this.state = {
      genus: []
    }
  }

  componentDidMount () {
    const { user } = this.props
    getGenus(user)
      .then(res => this.setState({ genus: res.data.genus }))
      .catch(console.error)
  }

  render () {
    const genus = this.state.genus.map(genus => (
      <li key={genus.id}>
        <Link to={apiUrl + `/species/${genus.species.id}`}>{genus.species.name}</Link>
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
