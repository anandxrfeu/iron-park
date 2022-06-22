import Container from "../components/layout/Container"
import Mapbox from "../components/map/Mapbox"
import ActiveReservation from "../components/reservations/ActiveReservation"
import ReservationForm from "../components/reservations/ReservationForm"

const EditReservationPage =  () => {
    return (
        <Container>
                <div className="map-box" >
                    <Mapbox />
                </div>
                <div className="reservation-box">
                    <ActiveReservation />
                    <ReservationForm />
                </div>
            </Container>
    )
}

export default EditReservationPage;