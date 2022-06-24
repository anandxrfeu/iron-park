import { useState, useContext } from "react";
import AuthContext from '../../store/auth-context';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";




const ReservationForm  = () => {
  const authCtx = useContext(AuthContext)
  const [LicensePlate, setLicensePlate] = useState("")
  const [Duration, setDuration] = useState("")
  let reservationId = null
  //const [reservationId, setReservationId] = useState(null)

  const navigate  = useNavigate()


  const {parkingSpotId} = useParams()

  const handleSubmit = (event) => {
    event.preventDefault()
    const reservationPayload = {
            licensePlateNumber : LicensePlate,
            parkingDuration : Duration,
            parkingSpotId : parkingSpotId,
            reservationTime : (new Date()).getTime(),
            area : "iron hack",
            userId : authCtx.userId
      }
  const URL = 'https://iron-park-e654f-default-rtdb.firebaseio.com/reservations.json'

  axios.post(URL, reservationPayload)
    .then(response => {
      //console.log('teste', response.data)
      reservationId = response.data.name
      // --- Make HTTP Request To Parkings To Set Reserved === true
      const URLParking = `https://iron-park-e654f-default-rtdb.firebaseio.com/parkings/${parkingSpotId}.json`
      const parkingPayload = {
           reserved: true
      }
      axios.patch(URLParking, parkingPayload)
        .then(response => {
          // --- Make HTTP request to users//
          const URLUserInfo = `https://iron-park-e654f-default-rtdb.firebaseio.com/users/${authCtx.userId}.json`
          axios.get(URLUserInfo)
            .then(response => {
              const URLUsers = `https://iron-park-e654f-default-rtdb.firebaseio.com/users/${authCtx.userId}.json`
              console.log(response.data)
              const userReservations = response.data['reservations']
              userReservations.push(reservationId)
              console.log(userReservations)
              const UserPayload = {
                reservations: userReservations
               // ...response.data,
               // response.data.reservations.push(reservationId)
               // reservations: [reservationId]
          }
          //UserPayload['reservations'].push(reservationId)
          //console.log(UserPayload)
          axios.patch(URLUsers, UserPayload)
            .then(response => {
              console.log(response.data)
            })
            .catch(error => console.log(error))
            })
            .catch(error => console.log(error))



        })
        .catch(error => console.log(error))
      //setReservationId(response.data.name)
      console.log(`/show-reservation/${response.data.name}`)
      //setReservationId(response.data.name)
      navigate(`/show-reservation/${response.data.name}`)

    })
    .catch(error => console.log(error))
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
              value={authCtx.name}
              readOnly
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
