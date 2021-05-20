import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import IsAuthenticated from '../services/auth';


const PrivateRoute = ({ component: Component, ...rest }) => (
  < Route {...rest} render={props => (
    IsAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/Login', state: { from: props.location } }} />
    )
  )} />
)

export default PrivateRoute;