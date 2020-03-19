import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';

import PageTitle from '../PageTitle/PageTitle';

import './Login.scss';

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

	const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if logged in
  if(isAuthenticated) {
    return <Redirect to='/profile' />
  }

	return (
		<div className='login'>
			<div className='login__title'>
				<PageTitle text='Login' />
			</div>
			<form className='login__form' onSubmit={e => onSubmit(e)}>
				<div className='login__form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={e => onChange(e)}
            // required
            className='login__form-input'
					/>
				</div>
				<div className='login__form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						onChange={e => onChange(e)}
            // minLength='6'
            className='login__form-input'
					/>
				</div>
				<input type='submit' className='login__upload-submit' value='Login' />
			</form>
      <p className='login__already'>
				Don't have an account? <Link to='/register' className='login__register'> Register</Link>
			</p>
		</div>
	);
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
