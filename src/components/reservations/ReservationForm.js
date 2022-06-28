import { useState, useContext } from "react";
import AuthContext from '../../store/auth-context';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";





const ReservationForm  = () => {
  const authCtx = useContext(AuthContext)
  const [LicensePlate, setLicensePlate] = useState("")
  const [Duration, setDuration] = useState("")



  const [is5Clicked, setIs5Clicked] = useState(false)
  const [is10Clicked, setIs10Clicked] = useState(false)
  const [is15Clicked, setIs15Clicked] = useState(false)

  const setDurationHandler = (event) => {
    const id = event.target.id
    if (id === "option1") {
      setIs5Clicked(true)
      is10Clicked && setIs10Clicked(false)
      is15Clicked && setIs15Clicked(false)
    }
    else if (id === "option2") {
      setIs10Clicked(true)
      is5Clicked && setIs5Clicked(false)
      is15Clicked && setIs15Clicked(false)

    }
    else if (id === "option3") {
      setIs15Clicked(true)
      is10Clicked && setIs10Clicked(false)
      is5Clicked && setIs5Clicked(false)
    }

    setDuration(event.target.value)
  }


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
            userId : authCtx.userId,
            userName : authCtx.name
      }
  const URL = 'https://iron-park-e654f-default-rtdb.firebaseio.com/reservations.json'
  //create new reservation
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
          console.log('Patching parking as true ',response.data)
          const URLUserInfo = `https://iron-park-e654f-default-rtdb.firebaseio.com/users/${authCtx.userId}.json`
          axios.get(URLUserInfo)
            .then(response => {
              console.log('Getting User Info: ',response.data)
              const URLUsers = `https://iron-park-e654f-default-rtdb.firebaseio.com/users/${authCtx.userId}.json`
              let userReservations = []
              if(response.data['reservations']){
                userReservations = response.data['reservations']
              }
              userReservations.push(reservationId)
              console.log(userReservations)
              const UserPayload = {
                reservations: userReservations
          }
          axios.patch(URLUsers, UserPayload)
            .then(response => {
              console.log(response.data)
            })
            .catch(error => console.log(error))
            })
            .catch(error => console.log(error))



        })
        .catch(error => console.log(error))
        console.log(`/show-reservation/${response.data.name}`)
        navigate(`/show-reservation/${response.data.name}`)

    })
    .catch(error => console.log(error))
  }





  return (
    <div className="reservationFormContainer">

      <div>
        <h1 className="parkingInfo">PARKING INFO</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label className="labelForm">LICENSE PLATE</label>
          <div>
            <input className="inputForForm inputForForm1"
              type="text"
              name="LicensePlate"
              onChange={(e) => setLicensePlate(e.target.value)}
              value={LicensePlate}
            />
          </div>
        </div>
        <div className="positionInputForm2">
          <label  className="labelForm">DRIVER NAME</label>
          <div>
            <input className="inputForForm inputForForm2"
              type="text"
              name="DriverName"
              value={authCtx.name}
              readOnly
            />
          </div>
        </div>
        <div>
        <label className="labelForm">DURATION</label>
          <div className="allRadioBtns">
            <div className="radio">
                <label className={is5Clicked ?  "btn btn-light btn-selectTime btn-selectTimeClicked" : "btn btn-light btn-selectTime "} htmlFor="option1" >
                  <input
                    type="radio"
                    className="btn-check"
                    value="5"
                    id="option1"
                    autoComplete="off"
                    name="Duration Radio Buttons"
                    onChange={setDurationHandler}
                  />
                  5 Min
                </label>

                <label  className={is10Clicked ?  "btn btn-light btn-selectTime btn-selectTimeClicked" : "btn btn-light btn-selectTime "} htmlFor="option2"  >
                  <input
                    type="radio"
                    className="btn-check"
                    value="10"
                    id="option2"
                    autoComplete="off"
                    name="Duration Radio Buttons"
                    onChange={setDurationHandler}
                  />
                  10 Min
                </label>
                <label  className={is15Clicked ?  "btn btn-light btn-selectTime btn-selectTimeClicked" : "btn btn-light btn-selectTime "}  htmlFor="option3" >
                  <input
                    type="radio"
                    value="15"
                    className="btn-check"
                    id="option3"
                    autoComplete="off"
                    name="Duration Radio Buttons"
                    onChange={setDurationHandler}
                  />
                  15 Min
                </label>
             </div>
          </div>
        </div>
        <button className='ConfirmBtn' type="submit">CONFIRM</button>
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
