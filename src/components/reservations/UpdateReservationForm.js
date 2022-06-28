import { useState, useContext } from "react";
import AuthContext from '../../store/auth-context';




const UpdateReservationForm  = (props) => {
  const authCtx = useContext(AuthContext)
  const [duration, setDuration] = useState("")
  const {licensePlateNumber, extendReservationHandler} = props

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('inhandleSubmit of Update reservationform')
    extendReservationHandler(Number(duration))
  }

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




  return (
    <div>


      <form onSubmit={handleSubmit}>
        <div>
          <label className='labelFormUpdate'>LICENSE PLATE</label>
          <div>
            <input  className="inputFormUpdate inputFormUpdate1"
              type="text"
              name="LicensePlate"
              value={licensePlateNumber}
              readOnly
            />
          </div>
        </div>
        <div>
          <label  className='labelFormUpdate'>DRIVER NAME</label>
          <div>
            <input className="inputFormUpdate"
              type="text"
              name="DriverName"
              value={authCtx.name}
              readOnly
            />
          </div>
        </div>
        <div>
        <label className="durationLabel labelFormUpdate">DURATION</label>
            <div>
              <div className="radio">
                <label className={is5Clicked ?  "btn btn-light btn-selectTime2 btn-selectTimeClicked" : "btn btn-light btn-selectTime2 "} htmlFor="option1">
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

              <label className={is10Clicked ?  "btn btn-light btn-selectTime2 btn-selectTimeClicked" : "btn btn-light btn-selectTime2 "} htmlFor="option2">
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
              <label className={is15Clicked ?  "btn btn-light btn-selectTime2 btn-selectTimeClicked" : "btn btn-light btn-selectTime2 "}  htmlFor="option3" >
                <input
                  type="radio"
                  className="btn-check"
                  value="15"
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

export default UpdateReservationForm
