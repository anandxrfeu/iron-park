import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import Container from "../components/layout/Container"
import Mapbox from "../components/map/Mapbox"
import ActiveReservation from "../components/reservations/ActiveReservation"
import ExpiredReservation from "../components/reservations/ExpiredReservation"
import ReservationForm from "../components/reservations/ReservationForm"
import UpdateReservationForm from "../components/reservations/UpdateReservationForm"


const displayTime = (timestamp) => {
    const time = new Date(timestamp)
    return `${time.getHours()}:${time.getMinutes()}`
  
  }


const ShowReservationPage = (props) => {
  const {parkingList,SelectparkingSpotHandler,selectedParkingSpot } = props

  // add state to track active versus expired reservation
    const [isActiveReservation, setIsActiveReservation] = useState(true)
    const [isExtendReservation, setIsExtendReservation] = useState(false)

    const {reservationId} = useParams()
    const [reservationDetail, setReservationDetail] = useState({})
    const [counter, setCounter] = useState(0)   
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`https://iron-park-e654f-default-rtdb.firebaseio.com/reservations/${reservationId}.json`)
            .then(response => {
            setReservationDetail(response.data)
            })
            .catch(error => console.log(error))
    }, [])


    useEffect(() => {
        const id = setTimeout(() => {
            const checkOutTime = reservationDetail.reservationTime +  Number(reservationDetail.parkingDuration)*60000
            const currentTime = (new Date()).getTime()
            const remainingTime = checkOutTime - currentTime
            setCounter(prev => prev - 1);
            if(remainingTime <= 0){
                // to make parkingreserved as free
                const URLParking = `https://iron-park-e654f-default-rtdb.firebaseio.com/parkings/${reservationDetail.parkingSpotId}.json`
                const parkingPayload = {
                    reserved: false
                    }
                axios.patch(URLParking, parkingPayload)
                .then(response => {
                
                //navigate('/')
                clearTimeout(id)
                setIsActiveReservation(false)

                })
                .catch(error => console.log(error))
            }
        }, 1000);
        return () => {
            clearTimeout(id)
        }
    }, [counter])


    const showExtendHandler = () => {
        setIsExtendReservation (true)
    }

    const extendReservationHandler = (newDuration) => {
        const currentDuration = Number(reservationDetail.parkingDuration)
        newDuration = newDuration + currentDuration
   
        const url = `https://iron-park-e654f-default-rtdb.firebaseio.com/reservations/${reservationId}.json`
        const payload = {
            parkingDuration : newDuration,
        }
        axios.patch(url,payload)
        .then(response => {
            console.log('Reservation extended ',response.data)
            setReservationDetail({
                ...reservationDetail,
                parkingDuration : response.data.parkingDuration
            })
            setIsExtendReservation(false)
        })
        .catch( error => console.log(error))

    }


    return(
        <Container>
                <div className="map-box" >
                    <Mapbox parkingList={parkingList}  SelectparkingSpotHandler={SelectparkingSpotHandler} selectedParkingSpot={selectedParkingSpot} />
                </div>
                <div className="reservation-box">
                    {isActiveReservation && (
                        <>
                            <ActiveReservation  checkInTime={displayTime(reservationDetail.reservationTime)} 
                                                checkOutTime={displayTime(reservationDetail.reservationTime +  Number(reservationDetail.parkingDuration)*60000)} />
                            {!isExtendReservation && <button onClick={showExtendHandler}>Extend</button> }
                            {isExtendReservation && (
                                <>
                                    <p> Show Update Form </p>
                                    <UpdateReservationForm  
                                        licensePlateNumber={reservationDetail.licensePlateNumber} 
                                        extendReservationHandler={extendReservationHandler}
                                        />
                                </>
                            )}
                        </>
                    )}
                    {!isActiveReservation && <ExpiredReservation checkOutTime={displayTime(reservationDetail.reservationTime +  Number(reservationDetail.parkingDuration)*60000)}/>}
                    
                </div>
            </Container>
    )
}

export default ShowReservationPage
