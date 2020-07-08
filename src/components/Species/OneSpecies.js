import React, { Component } from 'react'
import { Link, useHistory as history } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { oneSpecies, deleteSpecies, updateSpecies } from '../../api/auth.js'
import Layout from '../layout/layout'
import { withRouter } from 'react-router'
import messages from '../AutoDismissAlert/messages'

class OneSpecies extends Component {
  constructor (props) {
    super(props)

    this.state = {
      species: {
        name: '',
        description: '',
        genus: ''
      }
    }
  }

  componentDidMount () {
    const { user } = this.props
    const { species } = this.props.location
    oneSpecies(species, user)
      .then(res => this.setState({ species: res.data }))
      .then(() => console.log(this.state))
      .catch(console.error)
  }

  handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    this.setState(currentState => {
      return { species: { ...currentState.species, ...updatedField } }
    })
  }

  destroy = () => {
    const { user, msgAlert } = this.props
    const { species } = this.state
    deleteSpecies(species, user)
      .then(() => msgAlert({
        heading: 'Delete species successful',
        message: messages.deleteSpeciesSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        msgAlert({ heading: 'Delete Species failed with error: ' + error.message,
          message: messages.deleteSpeciesFailure,
          variant: 'danger'
        })
      })
  }

  onUpdateSpecies = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props
    const { species } = this.state
    console.log(this.props)
    console.log(this.state)
    console.log(species)

    updateSpecies(species, user)
      .then(res => this.setState({ species: res.data }))
      .then(() => msgAlert({
        heading: 'Species updated',
        message: messages.updateSpeciesSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        msgAlert({
          heading: 'Update Species failed with error: ' + error.message,
          message: messages.updateSpeciesFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { species } = this.state
    const { name, description, genus } = this.state.species

    if (!species) {
      return <p>Loading...</p>
    }

    return (
      <Layout>
        <h4>{species.name}</h4>
        <p>Description: {species.description}</p>
        <button onClick={this.destroy}>Delete Species</button>
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <h3>Update Fields</h3>
            <Form onSubmit={this.onUpdateSpecies}>
              <Form.Group controlId="name">
                <Form.Label>Species Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  placeholder={this.name}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Species description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={description}
                  placeholder={this.description}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="genus">
                <Form.Label>Species Genus</Form.Label>
                <Form.Control
                  type="text"
                  name="genus"
                  value={genus}
                  placeholder={this.genus}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
        <Link to="/genus/">Back to genus</Link>
      </Layout>
    )
  }
}

export default withRouter(OneSpecies)
