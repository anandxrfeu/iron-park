import Container from "../components/layout/Container"
import Map from "../components/map/Map"
import ReservationForm from "../components/reservations/ReservationForm"

const MakeReservationPage = () => {
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

export default MakeReservationPage