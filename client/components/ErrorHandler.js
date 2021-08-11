import React from 'react';
import { Link } from 'react-router-dom';

const ErrorHandler = () => {
	return (
		<div className='errors'>
			<div id='error'>
				<h2>CATastrophy!</h2>
				<h4>Human sacrifice! Dogs and cats living together! Mass hysteria!</h4>
				<img src='https://i.imgur.com/AGD32Bj.jpg' />
				<div id='error button'>
					<Link to='/'>
						<button type='button' id='error-return'>
							Generally, you don't see that kind of behavior in a major
							appliance
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ErrorHandler;
