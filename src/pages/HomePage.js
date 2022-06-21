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