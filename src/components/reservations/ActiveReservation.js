import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import '../reservations/ActiveReservation.css'


const displayTime = (timestamp) => {
  const time = new Date(timestamp)
  return `${time.getHours()}:${time.getMinutes()}`

}

const ActiveReservation  = () => {
  const {reservationId} = useParams()
  const [reservationDetail, setReservationDetail] = useState({})
  const [counter, setCounter] = useState(10)   

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
          
          navigate('/')
        })
        .catch(error => console.log(error))


            navigate('/')
        }
    }, 1000);
     return () => {
         clearTimeout(id)
     }
}, [counter])


    return (
        <div>
          <h1 className="titleActive">ACTIVE</h1>
          <div className="activeContainer">
            <div className="left-card-time">
              <h3>Check-In</h3>
              <h4>{displayTime(reservationDetail.reservationTime)}</h4>
            </div>
            <div className="right-card-time">
              <h3>Check-Out</h3>
              <h4>{displayTime(reservationDetail.reservationTime +  Number(reservationDetail.parkingDuration)*60000)}</h4>
            </div>
          </div>
        </div>

    )
}

export default ActiveReservation

/**
 *
 * Receives reservation id in url
 * Makes get HTTP request to display active reservation details
 * State : reservation
 *
 */
