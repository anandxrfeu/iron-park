import React, {useState} from "react";
import Map, {Marker} from 'react-map-gl'
import './MapBox.css'
import pin from '../../assets/images/pin.png'
//import pin2 from './pin test.png'
//import pin3 from './pin3-square.png'
//import pin4 from './Reverse-Pin.png'

const Mapbox = (props) => {

    const {parkingList, SelectparkingSpotHandler, selectedParkingSpot} = props
    //console.log(parkingList)
    //console.log(selectedParkingSpot)

    const [viewport, setViewport] = useState({
        //latitude: -23.56167922801466,
        //longitude: -46.66003661013792,

        latitude: -23.5617757,
        longitude: -46.6610803,

        width: '100%',
        height: '100%',
        zoom: 18,
    
      })

    return (
        <div>
            <Map
            initialViewState = {{...viewport}}
            mapboxAccessToken = 'pk.eyJ1IjoiY2dsaWswMDEiLCJhIjoiY2w0ZXNocnZ1MDBoNTNrcGY4OWphYnZkMCJ9.RvQmDejsiPEhdQnR3o94Iw'
            style ={{width: '55vw', height: '100vh'}}
            mapStyle = "mapbox://styles/mapbox/streets-v9"
            >
                {parkingList.map( parkingSpot => {
                            let selectedButtonClass= ''
                            if(parkingSpot.id === selectedParkingSpot){
                                selectedButtonClass = 'btnFocus'

                            }

                            return (
                                <Marker key={parkingSpot.id} 
                                        latitude={parkingSpot.latitude} 
                                        longitude={parkingSpot.longitude} 
                                        anchor="bottom" >
                                    <button 
                                            className={parkingSpot.reserved ? 'btnPinReserved' : `btnPinFree ${selectedButtonClass}`}>
                                        <img 
                                            src={pin} 
                                            id={parkingSpot.id} 
                                            onClick={SelectparkingSpotHandler} 
                                            style={{height: '40px', width: '40px'}} 
                                            className={parkingSpot.reserved ? 'pinRed' : `pinGreen ${selectedButtonClass} `}
                                            alt='pin'/>
                                    </button>
                                </Marker>  
                            )
                        } )}
            </Map>
        </div>
    )
}

export default Mapbox