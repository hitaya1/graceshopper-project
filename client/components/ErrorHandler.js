import React from 'react';
import { Link } from 'react-router-dom';

const ErrorHandler = () => {
	return (
		<div style={{display: 'flex', justifyContent: 'center'}}>
			<div style={{display: 'flex', flexDirection: 'column'}}>
				<h2 style={{display: 'flex', justifyContent: 'center'}}>CATastrophy!</h2>
				<h4 style={{display: 'flex', justifyContent: 'center'}}>Human sacrifice! Dogs and cats living together! Mass hysteria!</h4>
				<img src='https://i.imgur.com/AGD32Bj.jpg' style={{width: '500px'}}/>
				<div id='error button'>
					<Link to='/'>
						<button type='button' id='error-return'>
							Generally, you don't see that kind of behavior in a major
							appliance
						</button>
					</Link>
				</div>
			</div></div>
	);
};

export default ErrorHandler;
