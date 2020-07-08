import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { oneSpecies, deleteSpecies } from '../../api/auth.js'
import Layout from '../layout/layout'
import { withRouter } from 'react-router'

class OneSpecies extends Component {
  constructor (props) {
    super(props)

    this.state = {
      species: {},
      deleted: false
    }
  }

  componentDidMount () {
    const { user } = this.props
    const { species } = this.props.location
    oneSpecies(species, user)
      .then(res => this.setState({ species: res.data }))
      .catch(console.error)
  }

  destroy = () => {
    const { user } = this.props
    const { species } = this.state
    deleteSpecies(species, user)
      .then(() => this.setState({ deleted: true }))
      .catch(console.error)
  }

  render () {
    const { species, deleted } = this.state

    if (!species) {
      return <p>Loading...</p>
    }

    if (deleted) {
      return <Redirect to={
        { pathname: '/', state: { msg: 'Species succesfully deleted!' } }
      } />
    }

    return (
      <Layout>
        <h4>{species.name}</h4>
        <p>Description: {species.description}</p>
        <button onClick={this.destroy}>Delete Species</button>
        <Link to="/genus/">Back to genus</Link>
      </Layout>
    )
  }
}

export default withRouter(OneSpecies)
