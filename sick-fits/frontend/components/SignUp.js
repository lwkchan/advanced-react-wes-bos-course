import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signUp(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;
class SignUp extends Component {
  state = { email: "", name: "", password: "" };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signUp, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              const res = await signUp();
              console.log(res);
              this.setState({ name: "", email: "", password: "" });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign up for an account</h2>
              <Error error={error} />
              <label htmlFor="email">
                Email
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>
            </fieldset>
            <button type="submit">Sign up!</button>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default SignUp;