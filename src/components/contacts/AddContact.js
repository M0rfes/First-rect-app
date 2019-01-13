import React, { Component } from 'react';
import { Consumer } from '../../Context';
import TExtInputGroup from './../layout/TextInputGroup';
export default class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (despatch, e) => {
    e.preventDefault();
    if (this.state.name === '') {
      this.setState({ errors: { name: 'name is required' } });
      return;
    }
    if (this.state.email === '') {
      this.setState({ errors: { name: 'email is required' } });
      return;
    }
    if (this.state.phone === '') {
      this.setState({ errors: { name: 'phone is required' } });
      return;
    }
    despatch({
      type: 'ADD_CONTACT',
      payload: { ...this.state, id: Math.random() }
    });
    this.setState({ name: '', email: '', phone: '', errors: {} });
    this.props.history.push('/');
  };
  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TExtInputGroup
                    label="Name"
                    name="name"
                    value={name}
                    placeholder="Enter your Name"
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TExtInputGroup
                    type="email"
                    label="Eame"
                    name="email"
                    value={email}
                    placeholder="Enter your Email"
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TExtInputGroup
                    type="phone"
                    label="Phone"
                    name="phone"
                    value={phone}
                    placeholder="Enter your Phone Number"
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <br />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-block btn-light"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
