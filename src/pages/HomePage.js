import Container from "../components/layout/Container"
import Map from "../components/map/Map"

const HomePage = () => {
    return (
            <Container>
                <div className="map-box" >
                    <Map />
                </div>
                <div className="reversation-box">
                    <button>Park</button>
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