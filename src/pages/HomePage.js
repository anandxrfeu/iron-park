import Container from "../components/layout/Container"
import Mapbox from "../components/map/Mapbox"
import {Link} from "react-router-dom"


const HomePage = (props) => {

    const {parkingList,SelectparkingSpotHandler,selectedParkingSpot } = props
    const url =`/make-reservation/${selectedParkingSpot}`

    return (
            <Container>
                <div className="map-box" >
                    <Mapbox parkingList={parkingList}  SelectparkingSpotHandler={SelectparkingSpotHandler} selectedParkingSpot={selectedParkingSpot}/>
                </div>
                <div className="reservation-box">
                  <Link to={url}>
                      <button className="parkBtn">PARK</button>
                  </Link>

                </div>
            </Container>
        )
}

export default HomePage

/**
 *
 * Receives all parking spots as prop and passes it to Map component
 * Receives SelectParkingSpotHandler as a prop and passes it to Map component
 * Receives SelectedParkingSpot as a prop and uses it in button
 *
 */
