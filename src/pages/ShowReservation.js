import Container from "../components/layout/Container"
import Map from "../components/map/Map"
import ActiveReservation from "../components/reservations/ActiveReservation"

const ShowReservation = () => {
    return(
        <Container>
                <div className="map-box" >
                    <Map />
                </div>
                <div className="reversation-box">
                    <ActiveReservation />
                </div>
            </Container>
    )
}

export default ShowReservation