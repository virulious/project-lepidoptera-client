import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { oneSpecies, deleteSpecies } from '../../api/auth.js'
import Layout from '../layout/layout'

class Species extends Component {
  constructor (props) {
    super(props)

    this.state = {
      species: null,
      deleted: false
    }
  }

  componentDidMount () {
    console.log(this.props)
    console.log(this.props.location)
    oneSpecies(this.props.location.params.id, this.props.user)
      .then(res => this.setState({ species: res.data.species }))
      .catch(console.error)
  }

  destroy = (species) => {
    deleteSpecies(species, this.props.user)
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
        <Link to={`/species/${this.props.match.params.id}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to="/genus/">Back to genus</Link>
      </Layout>
    )
  }
}

export default Species
