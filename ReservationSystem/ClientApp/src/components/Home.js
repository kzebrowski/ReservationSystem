import React, { Component} from 'react';
import { UncontrolledCarousel } from 'reactstrap';

export class Home extends Component {
  displayName = Home.name

  items = [
    {
      src: 'https://res.cloudinary.com/dwcl9sgyd/image/upload/v1578491376/ReservationSystem/design_ktm416.jpg'
    },
    {
      src: 'https://res.cloudinary.com/dwcl9sgyd/image/upload/v1578840614/ReservationSystem/BIH_164_aspect16x9_xb4p4k.jpg'
    },
    {
      src: 'https://res.cloudinary.com/dwcl9sgyd/image/upload/v1578491353/ReservationSystem/1-hotel-central-park-1_tgwa6s.jpg'
    }
  ];

  render() {
    return (
      <div>
        <UncontrolledCarousel items={this.items} />
      </div>
    );
  }
}
