import { useState, useContext } from "react";
import AuthContext from '../../store/auth-context';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";




const UpdateReservationForm  = (props) => {
  const authCtx = useContext(AuthContext)
  const [duration, setDuration] = useState("")
  const {licensePlateNumber, extendReservationHandler} = props
  
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('inhandleSubmit of Update reservationform')
    extendReservationHandler(Number(duration))
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
              value={licensePlateNumber}
              readOnly
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

export default UpdateReservationForm


