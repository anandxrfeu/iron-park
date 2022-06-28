
import '../reservations/ActiveReservation.css'


const ActiveReservation  = (props) => {

  const {checkInTime, checkOutTime} = props


    return (
        <div className="activeRightBlack">
          <div className='centerActiveComponent'>
            <h1 className="titleActive">ACTIVE</h1>
            <div className="activeContainer">
              <div className="left-card-time">
                <h4 className="checkInOutLabel">CHECK-IN</h4>
                <h2 className="timeActiveLabel">{checkInTime}</h2>
              </div>
              <div className="right-card-time">
                <h4 className="checkInOutLabel">CHECK-OUT</h4>
                <h2 className="timeActiveLabel">{checkOutTime}</h2>
              </div>
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
