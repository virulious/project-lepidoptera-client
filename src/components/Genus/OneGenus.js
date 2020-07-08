import React, { Component } from 'react'
import { oneGenus } from '../../api/auth'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import Layout from '../layout/layout'

class OneGenus extends Component {
  constructor (props) {
    super(props)

    this.state = {
      species: []
    }
  }

  componentDidMount () {
    const { user } = this.props
    const { genus } = this.props.location
    oneGenus(genus, user)
      .then(res => this.setState({ species: res.data }))
      .catch(console.error)
  }

  render () {
    console.log(this.state.species)
    const species = this.state.species.map((species) => {
      const location = {
        pathname: `/species/${species.id}/`,
        species: species
      }
      return (
        <li key={species.id}>
          <Link to={location} >
            {species.name}
          </Link>
        </li>
      )
    })

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

export default withRouter(OneGenus)
