import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { createSpecies } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreateSpecies extends Component {
  constructor (props) {
    super(props)

    this.state = {
      species: {
        name: '',
        description: '',
        genus: '',
        owner: ''
      },
      id: null
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onCreateSpecies = event => {
    event.preventDefault()

    const { msgAlert, history } = this.props

    createSpecies(this.state, this.props.user)
      .then(res => this.setState({ id: res.data.id }))
      .then(() => msgAlert({
        heading: 'Species created',
        message: messages.createSpeciesSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ name: '', description: '', genus: '' })
        msgAlert({
          heading: 'Create Species failed with error: ' + error.message,
          message: messages.createSpeciesFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { name, description, genus } = this.state

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
            <Form.Group controlId="genus">
              <Form.Label>Species Genus. Morpho(1) Antirrhea(2)</Form.Label>
              <Form.Control
                required
                type="text"
                name="genus"
                value={genus}
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

export default withRouter(CreateSpecies)
