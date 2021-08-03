import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//supposed be linked to products and the user/guest buying
//leave for 8/4 (tomorrow)
class Cart extends React.Component {
	render() {
		const thisUser = this.props.user;
		let assignedProjects = [];
		return <div></div>;
	}
}

export default Cart;

//convert to cart
// if (Array.isArray(thisRobot.projects)){
//   fuelType = thisRobot.fuelType.charAt(0).toUpperCase() + thisRobot.fuelType.slice(1);

//   assignedProjects = thisRobot.projects.map((element) => {
//     return (
//     <li key={element.id} className="cross-link">
//       <Link to={`/projects/${element.id}`}>{element.title}</Link>
//       <button type="button" className="unassign-button" name={element.id} onClick={this.clickUnassign}>Remove Directive</button>
//     </li>
//     );
//   });

//   if (thisRobot.projects.length === 0) {
//     assignedProjects = 'This robot is on vacation';
//   }
// }
