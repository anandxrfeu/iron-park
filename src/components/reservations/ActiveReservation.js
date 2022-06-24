import axios from 'axios'
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import '../reservations/ActiveReservation.css'


const ActiveReservation  = () => {
  const {reservationId} = useParams()

  const [reservationDetail, setReservationDetail] = useState({})

  useEffect(() => {
      axios.get(`https://iron-park-e654f-default-rtdb.firebaseio.com/reservations/${reservationId}.json`)
        .then(response => {
          console.log(response.data)
          setReservationDetail(response.data)
          console.log(reservationDetail)
        })
        .catch(error => console.log(error))
  }, [])





  console.log(reservationId)
    return (
        <div>
          <h1 className="titleActive">ACTIVE</h1>
          <div className="activeContainer">
            <div className="left-card-time">
              <h3>Check-In</h3>
              <h4>{reservationDetail.reservationTime}</h4>
            </div>
            <div className="right-card-time">
              <h3>Check-Out</h3>
              <h4>{reservationDetail.reservationTime}</h4>
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
