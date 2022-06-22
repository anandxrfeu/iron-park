import Container from "../components/layout/Container"
import Mapbox from "../components/map/Mapbox"
import ActiveReservation from "../components/reservations/ActiveReservation"

const ShowReservationPage = () => {
    return(
        <Container>
                <div className="map-box" >
                    <Mapbox />
                </div>
                <div className="reservation-box">
                    <ActiveReservation />
                </div>
            </Container>
    )
}

export default ShowReservationPage