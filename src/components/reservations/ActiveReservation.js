
import '../reservations/ActiveReservation.css'


const ActiveReservation  = (props) => {

  const {checkInTime, checkOutTime} = props
 

    return (
        <div>
          <h1 className="titleActive">ACTIVE</h1>
          <div className="activeContainer">
            <div className="left-card-time">
              <h3>Check-In</h3>
              <h4>{checkInTime}</h4>
            </div>
            <div className="right-card-time">
              <h3>Check-Out</h3>
              <h4>{checkOutTime}</h4>
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
