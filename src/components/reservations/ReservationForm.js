import { useState, useEffect, useContext } from "react";
import AuthContext from '../../store/auth-context';
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";




const ReservationForm  = () => {
  const authCtx = useContext(AuthContext)
  const [LicensePlate, setLicensePlate] = useState("");
  const [DriverName, setDriverName] = useState(authCtx.name);
  const [Duration, setDuration] = useState("");
  const {parkingSpotId} = useParams()
  const [isNavigate, setIsNavigate] = useState(false)

  let reservationId = null
  let showReservationURL = ''

  console.log(authCtx)
  const handleSubmit = async(e) => {
    e.preventDefault();
    const reservationInfo = {
      licensePlateNumber : LicensePlate,
      parkingDuration : Duration,
      parkingSpotId : parkingSpotId,
      reservationTime : (new Date()).getTime(),
      area : "iron hack",
      userId : authCtx.userId
}
  const URL = 'https://iron-park-e654f-default-rtdb.firebaseio.com/reservations.json'
  axios.post(URL, reservationInfo)
    .then(response => {
      console.log('teste', response.data)
      reservationId = response.data.name
      showReservationURL = `/show-reservation/${reservationId}`
      console.log('URL', showReservationURL)
      setIsNavigate(true)
    })

    .catch(error => console.log(error))

    console.log(reservationInfo)
  }

  if (isNavigate) {
    return (

       <Navigate to={showReservationURL}></Navigate>

    )
  }

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>License Plate</label>
          <div>
            <input
              type="text"
              name="LicensePlate"
              onChange={(e) => setLicensePlate(e.target.value)}
              value={LicensePlate}
            />
          </div>
        </div>
        <div>
          <label>Driver Name</label>
          <div>
            <input
              type="text"
              name="DriverName"
              value={DriverName}
            />
          </div>
        </div>
        <div>
        <label>Duration</label>
          <div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="5"
                  name="Duration Radio Buttons"
                  onChange={(e) => setDuration(e.target.value)}
                />
                5 Min
              </label>
          </div>
            <label>
              <input
                type="radio"
                value="10"
                name="Duration Radio Buttons"
                onChange={(e) => setDuration(e.target.value)}
              />
              10 Min
            </label>
            <label>
              <input
                type="radio"
                value="15"
                name="Duration Radio Buttons"
                onChange={(e) => setDuration(e.target.value)}
              />
              15 Min
            </label>
          </div>
        </div>
        <button className='ConfirmBtn' type="submit">Confirm</button>
      </form>
    </div>
  );
}

export default ReservationForm

/**
 *
 * Receives Selected Parking spot in URL
 * Makes post HTTP request to
 *  1) Parking API to set parking reserved as true
 *  2) Reservations API to create new reservation
 *  3) Updates User API to update user with reservations record
 *
 * Makes put http request to
 *  1) 2) and 3)
 *
 * State 1 SelectedParking
 * State 2 NewReservation
 * State 3 User
 *
 */
