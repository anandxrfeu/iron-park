import Container from "../components/layout/Container"
import Mapbox from "../components/map/Mapbox"
import ReservationForm from "../components/reservations/ReservationForm"

const MakeReservationPage = () => {
    return (
            <Container>
                <div className="map-box" >
                    <Mapbox />
                </div>
                <div className="reservation-box">
                    <ReservationForm />
                </div>
            </Container>
    )
}

export default MakeReservationPage