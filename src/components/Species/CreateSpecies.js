import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { createSpecies } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class Species extends Component {
  constructor () {
    super()

    this.state = {
      species: {
        name: '',
        description: '',
        upper: '',
        owner: ''
      },
      createdSpeciesId: null
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onCreateSpecies = event => {
    event.preventDefault()

    const { msgAlert, history } = this.props

    createSpecies(this.state)
      .then(res => this.setState({ createdSpeciesId: res.data.species._id }))
      .then(() => msgAlert({
        heading: 'Species created',
        message: messages.createSpeciesSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ name: '', description: '' })
        msgAlert({
          heading: 'Create Species failed with error: ' + error.message,
          message: messages.createSpeciesFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { name, description, upper } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Species</h3>
          <Form onSubmit={this.onCreateSpecies}>
            <Form.Group controlId="name">
              <Form.Label>Species Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={name}
                placeholder="Species name"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Species description</Form.Label>
              <Form.Control
                required
                type="text"
                name="description"
                value={description}
                placeholder="Species description"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="upper">
              <Form.Label>Species Genus</Form.Label>
              <Form.Control
                required
                type="text"
                name="upper"
                value={upper}
                placeholder="Species Genus"
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
    )
  }
}

export default withRouter(Species)
