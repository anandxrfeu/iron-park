import Container from "../components/layout/Container"
import Mapbox from "../components/map/Mapbox"
import ReservationForm from "../components/reservations/ReservationForm"

const MakeReservationPage = (props) => {
   const {parkingList,SelectparkingSpotHandler,selectedParkingSpot } = props

    return (
            <Container>
                <div className="map-box" >
                    <Mapbox parkingList={parkingList}  SelectparkingSpotHandler={SelectparkingSpotHandler} selectedParkingSpot={selectedParkingSpot}/>
                </div>
                <div className="reservation-box">
                    <ReservationForm  />
                </div>
            </Container>
    )
}

export default MakeReservationPage
