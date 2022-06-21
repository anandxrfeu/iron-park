import Container from "../components/layout/Container"
import Map from "../components/map/Map"
import ReservationForm from "../components/reservations/ReservationForm"

const MakeReservation = () => {
    return (
            <Container>
                <div className="map-box" >
                    <Map />
                </div>
                <div className="reversation-box">
                    <ReservationForm />
                </div>
            </Container>
    )
}

export default MakeReservation