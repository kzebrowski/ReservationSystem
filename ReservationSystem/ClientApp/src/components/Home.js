import React, { Component } from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import RoomSearch from './RoomSearch';

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
        <div className="front-page-section">
          <div className="vertically-centered">
            <h2 className="d-flex justify-content-center">Poznaj nasz nowoczesny komplets wypoczynkowy!</h2>
            <h6 className="pt-2 d-flex justify-content-center">Nunc elementum nulla ut augue rutrum pharetra. Morbi maximus pharetra justo, sed tempus urna varius sit amet. 
              Curabitur sagittis, nulla eleifend sollicitudin laoreet, lorem odio luctus nunc, ut ullamcorper leo tellus eu orci. Ut egestas tempus viverra. 
              Vestibulum non finibus lacus. In nec tristique justo. Proin varius luctus dui, id dignissim purus hendrerit a. Duis ut nisl vel mi lacinia porttitor. 
              Mauris iaculis vel mi a ultricies.</h6>
          </div>
        </div>
        <div className="front-page-section">
          <div className="vertically-centered">
            <h2 className="d-flex justify-content-center">Znajdź pokój dla siebie.</h2>
            <h6 className="pt-2 d-flex justify-content-center">Wpisz daty swojego pobytu i sprawdź dostępność naszych pokoi.</h6>
            <RoomSearch />
          </div>
        </div>
        <div className="front-page-section">
          <div className="vertically-centered">
            <h2 className="d-flex justify-content-center">U nas znajdziesz wszystko to, czego potrzebujesz.</h2>
            <h6 className="pt-2 d-flex justify-content-center">Tutaj jakieś ikonki wstawić.</h6>
          </div>
        </div>
      </div>
    );
  }
}
