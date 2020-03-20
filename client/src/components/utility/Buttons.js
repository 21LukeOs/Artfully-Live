import React from 'react';
import './Buttons.scss';

const Buttons = ({ text }) => {
	return (
		<button className='button'>
			<span className='button__text'>{text}</span>
		</button>
	);
};

export default Buttons;
