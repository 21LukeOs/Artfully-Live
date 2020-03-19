import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';
import PageTitle from '../PageTitle/PageTitle';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

	const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log('SUCCESS')
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
            required
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
            minLength='6'
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

export default Login;
