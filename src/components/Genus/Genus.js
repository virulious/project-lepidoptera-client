import React, { Component } from 'react'
import { getGenus } from '../../api/auth'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { withRouter } from 'react-router'

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
      .then(res => this.setState({ genera: res.data }))
      .catch(console.error)
  }

  render () {
    const genera = this.state.genera.map(genus => (
      <li key={genus.id}>
        <Link to={{ pathname: `/project-lepidoptera-client/#/genus/${genus.id}/`, query: { genus } }} >
          {genus.name}
        </Link>
      </li>
    ))

    return (
      <Router>
        <Layout>
          <h4>Genus</h4>
          <ul>
            {genera}
          </ul>
        </Layout>
      </Router>
    )
  }
}

export default withRouter(Genus)
