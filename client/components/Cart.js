const thisUser = this.props.user;
    let assignedProjects = [];

    //convert to cart
    if (Array.isArray(thisRobot.projects)){
      fuelType = thisRobot.fuelType.charAt(0).toUpperCase() + thisRobot.fuelType.slice(1);

      assignedProjects = thisRobot.projects.map((element) => {
        return (
        <li key={element.id} className="cross-link">
          <Link to={`/projects/${element.id}`}>{element.title}</Link>
          <button type="button" className="unassign-button" name={element.id} onClick={this.clickUnassign}>Remove Directive</button>
        </li>
        );
      });

      if (thisRobot.projects.length === 0) {
        assignedProjects = 'This robot is on vacation';
      }
    }
