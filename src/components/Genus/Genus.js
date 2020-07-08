import React, { Component } from 'react'
import { getGenus } from '../../api/auth'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import Layout from '../layout/layout'
import messages from '../AutoDismissAlert/messages'

class Genus extends Component {
  constructor (props) {
    super(props)

    this.state = {
      genera: []
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props
    getGenus(user)
      .then(res => this.setState({ genera: res.data }))
      .catch(error => {
        msgAlert({ heading: 'Failed to mount with error: ' + error.message,
          message: messages.failedToMount,
          variant: 'danger'
        })
      })
  }

  render () {
    const genera = this.state.genera.map((genus) => {
      const location = {
        pathname: `${genus.id}/`,
        genus: genus
      }
      return (
        <li key={genus.id}>
          <Link to={location} >
            {genus.name}
          </Link>
        </li>
      )
    })
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

export default withRouter(Genus)
