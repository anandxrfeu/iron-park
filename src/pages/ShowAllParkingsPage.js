
import axios from "axios"
import { useEffect,useState, useContext } from "react"
import AuthContext from '../store/auth-context';
import './ShowAllParkingPage.css'




function padTo2Digits(num) {
  return String(num).padStart(2, '0');
}

const displayDateTime = (timeStamp) => {
  const dateTime = new Date(timeStamp)
  //return dateTime.toDateString()
  return `${Intl.DateTimeFormat().format(dateTime)} ${padTo2Digits(dateTime.getHours())}:${padTo2Digits(dateTime.getMinutes())}`
}

const ShowAllParkingsPage = () => {

    const authCtx = useContext(AuthContext)
    const [resevationList, setReservationsList] = useState([])

    useEffect(()=>{

        const urlUsers =  `https://iron-park-e654f-default-rtdb.firebaseio.com/users/${authCtx.userId}.json`
        axios.get(urlUsers)
        .then(response => {
            if(response.data && response.data.isAdmin){
                //fetch all reservations
                const urlReservations = 'https://iron-park-e654f-default-rtdb.firebaseio.com/reservations.json'
                axios.get(urlReservations)
                .then(response => {
                    const keyArray = Object.keys(response.data)
                    const reservatioArray = keyArray.map (key => {
                                            const obj = {...response.data[key]}
                                            obj.id = key
                                            return obj
                                          })


                    setReservationsList(reservatioArray.reverse())
                })
                .catch(error => console.log(error))

            }
        })
        .catch(error => console.log(error))

    },[authCtx.userId])

    return (
        <>
          <div className="adminBlackBackground">
            <h1 className="titleLog">PARKING ZONE LOG</h1>
            <div className="containerTable">
                    <div className="areaContainer">
                      <h1 className='areaText'>AREA</h1>
                      <h1 className='areaName'>Iron Hack</h1>
                    </div>
                    <div className="tablecomponent">
                        <table>
                          <div className="tryline">
                            <thead className="mainthead">
                                <tr className="theadline">
                                    <th className="tableheadcustom reservationcustom">RESERVATION ID</th>
                                    <th className="tableheadcustom licenseplatecustom">LICENSE PLATE</th>
                                    <th className="tableheadcustom drivercustom">DRIVER NAME</th>
                                    <th className="tableheadcustom durationcustom">DURATION</th>
                                    <th className="tableheadcustom timecustom">DATE & TIME</th>
                                </tr>
                              </thead>
                          </div>
                          <div className="scrollit">
                            <tbody>


                                    {resevationList.map( reservation => {
                                        return (
                                            <tr className="trparkinginfo" key={reservation.id}>
                                                <div className="reservationidtd">
                                                  <td className="tdspace"><span className="circleinfo circleinfoid">{reservation.id}</span></td>
                                                </div>
                                                <div className="reservationidtd">
                                                  <td className="tdspace circleinfolicense"><span className="circleinfo circleinfolicense">{reservation.licensePlateNumber}</span></td>
                                                </div>
                                                 <div className="reservationidtd">
                                                    <td className="tdspace"><span className="circleinfo circleinfoname">{reservation.userName}</span></td>
                                                 </div>
                                                 <div className="reservationidtd">
                                                     <td className="tdspace"><span className="circleinfo circleinfoduration">{reservation.parkingDuration} mins</span></td>
                                                 </div>
                                                 <div className="reservationidtd">
                                                    <td className="tdspace"><span className="circleinfo circleinfotime">{displayDateTime(reservation.reservationTime)}</span></td>
                                                 </div>
                                            </tr>
                                            )
                                    })}

                              </tbody>
                            </div>
                        </table>
                    </div>
              </div>
            </div>
        </>
    )
}

export default ShowAllParkingsPage
