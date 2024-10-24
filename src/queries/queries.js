import { gql } from "@apollo/client";

// queries
export const GET_USERS_QUERY = gql`
  query GetUsers {
    getUsers {
      _id
      name
      avatar
      language
      green
      address {
        street
        city
        state
        zip_code
      }
      contact {
        email
        phone
      }
      createdAt
    }
  }
`;
export const GET_USER_QUERY = gql`
  query GetUser($id: ID) {
    getUser(ID: $id) {
      _id
      name
      password
      avatar
      language
      green
      address {
        street
        city
        state
        zip_code
      }
      contact {
        email
        phone
      }
      createdAt
    }
  }
`;
export const LOGIN_USER_QUERY = gql`
  query Login($input: AuthInput) {
    login(input: $input) {
      user {
        _id
        name
        avatar
        language
        green
        address {
          street
          city
          state
          zip_code
        }
        contact {
          email
          phone
        }
        createdAt
      }
      token
      tokenExpiration
    }
  }
`;
export const GET_RIDES = gql`
  query GetRides($amount: Int) {
    getRides(amount: $amount) {
      _id
      start_location
      end_location
      date
      available_weight
      price_per_kg
      start_time
      end_time
      distance
      travel_mode
      user {
        _id
        name
        password
        avatar
        language
        green
        address {
          street
          city
          state
          zip_code
        }
        contact {
          email
          phone
        }
        createdAt
      }
    }
  }
`;
