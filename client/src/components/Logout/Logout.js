import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import './Logout.scss';
import logo from '../../assets/images/logo3.png';

const Logout = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<p className='logout__link'>
			<a href='#!' className='logout__link-a' onClick={logout}>
				Logout
			</a>
		</p>
	);

	return (
		<div className='logout'>
			<Link to='/'>
				<img src={logo} alt='artfully live logo' className='logout__img' />
			</Link>
			{!loading && <>{isAuthenticated && authLinks}</>}
		</div>
	);
};

Logout.propTypes = {};

Logout.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(Logout);
