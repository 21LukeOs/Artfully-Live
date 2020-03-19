import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

import './Register.scss';
import PageTitle from '../PageTitle/PageTitle';

const Register = ({ setAlert, register, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const { name, email, password, password2 } = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async e => {
		e.preventDefault();
		if (password !== password2) {
			setAlert('Passwords do not match', 'danger');
		} else {
			register({ name, email, password });
		}
  };
  
  //Redirect if logged in
  if(isAuthenticated) {
    return <Redirect to='/profile' />
  }

	return (
		<div className='register'>
			<div className='register__title'>
				<PageTitle text='Register' />
			</div>
			<form className='register__form' onSubmit={e => onSubmit(e)}>
				<div className='register__form-group'>
					<input
						type='text'
						placeholder='Name'
						name='name'
						value={name}
						onChange={e => onChange(e)}
						// required
						className='register__form-input'
					/>
				</div>
				<div className='register__form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={e => onChange(e)}
						// required
						className='register__form-input'
					/>
				</div>
				<div className='register__form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						onChange={e => onChange(e)}
						// minLength='6'
						className='register__form-input'
					/>
				</div>
				<div className='register__form-group'>
					<input
						type='password'
						placeholder='Confirm Password'
						name='password2'
						value={password2}
						onChange={e => onChange(e)}
						// minLength='6'
						className='register__form-input'
					/>
				</div>
				<input
					type='submit'
					className='register__upload-submit'
					value='Register'
				/>
			</form>
			<p className='register__already'>
				Already have an account?{' '}
				<Link to='/login' className='register__login'>
					{' '}
					Log In
				</Link>
			</p>
		</div>
	);
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
