import React, { Component } from 'react'
import { getGenus } from '../../api/auth'

import Layout from '../layout/layout'

class Genus extends Component {
  constructor (props) {
    super(props)

    this.state = {
      genera: []
    }
  }

  componentDidMount () {
    const { user } = this.props
    getGenus(user)
      .then(res => console.log(res.data) && this.setState({ genera: res.data.genus }))
      .catch(console.error)
  }

  render () {
    const genera = this.state.genera.map(genus => (
      <li key={genus.id}>
        <p>{genus.name}</p>
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
