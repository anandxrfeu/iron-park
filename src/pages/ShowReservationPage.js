import Container from "../components/layout/Container"
import Mapbox from "../components/map/Mapbox"
import ActiveReservation from "../components/reservations/ActiveReservation"

const ShowReservationPage = (props) => {
  console.log('Teste')
  const {parkingList,SelectparkingSpotHandler,selectedParkingSpot } = props

    return(
        <Container>
                <div className="map-box" >
                    <Mapbox parkingList={parkingList}  SelectparkingSpotHandler={SelectparkingSpotHandler} selectedParkingSpot={selectedParkingSpot} />
                </div>
                <div className="reservation-box">
                    <ActiveReservation />
                </div>
            </Container>
    )
}

export default ShowReservationPage
