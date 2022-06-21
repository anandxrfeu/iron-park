import Container from "../components/layout/Container"
import Map from "../components/map/Map"
import ActiveReservation from "../components/reservations/ActiveReservation"
import ReservationForm from "../components/reservations/ReservationForm"

const EditReservationPage =  () => {
    return (
        <Container>
                <div className="map-box" >
                    <Map />
                </div>
                <div className="reversation-box">
                    <ActiveReservation />
                    <ReservationForm />
                </div>
            </Container>
    )
}

export default EditReservationPage;