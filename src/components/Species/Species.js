import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
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
    axios(`${apiUrl}/species/${this.props.match.params.id}`)
      .then(res => this.setState({ species: res.data.species }))
      .catch(console.error)
  }

  destroy = () => {
    axios({
      url: `${apiUrl}/species/${this.props.match.params.id}`,
      method: 'DELETE'
    })
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
        <button onClick={this.destroy}>Delete Species</button>
        <Link to={`/species/${this.props.match.params.id}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to="/species/">Back to all species</Link>
      </Layout>
    )
  }
}

export default Species
