import apiUrl from '../apiConfig'
import axios from 'axios'

export const signUp = credentials => {
  return axios({
    method: 'POST',
    url: apiUrl + '/sign-up/',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
}

export const signIn = credentials => {
  return axios({
    url: apiUrl + '/sign-in/',
    method: 'POST',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password
      }
    }
  })
}

export const signOut = user => {
  return axios({
    url: apiUrl + '/sign-out/',
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + '/change-pw/',
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}

export const getGenus = (user) => {
  return axios({
    url: apiUrl + '/genus/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const getSpecies = (user) => {
  return axios({
    url: apiUrl + '/species/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const createSpecies = (species, user) => {
  return axios({
    url: apiUrl + '/species/' + species.createdSpeciesId,
    method: 'POST',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      species: {
        name: species.name,
        description: species.description,
        genus: species.genus,
        owner: species.owner
      }
    }
  })
}

export const oneSpecies = (species, user) => {
  return axios({
    url: apiUrl + '/species/' + species._id,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
