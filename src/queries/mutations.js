import { gql } from "@apollo/client";

// mutations
export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: UserInput) {
    createUser(input: $input) {
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
export const CREATE_RIDE_MUTATION = gql`
  mutation CreateRide($input: RideInputCreate) {
    createRide(input: $input) {
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

export const SEND_RESET_PASSWORD_MUTATION = gql`
  mutation SendResetPasswordLink($email: String!) {
    sendResetPasswordLink(email: $email)
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($input: UserForgetPassInput) {
    resetPassword(input: $input) {
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
