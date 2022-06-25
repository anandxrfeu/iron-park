
import axios from "axios"
import { useEffect,useState, useContext } from "react"
import AuthContext from '../store/auth-context';


const displayDateTime = (timeStamp) => {
    const dateTime = new Date(timeStamp)
    //return dateTime.toDateString()
    return `${Intl.DateTimeFormat().format(dateTime)} ${dateTime.getHours()}:${dateTime.getMinutes()}`
}

const ShowAllParkingsPage = () => {

    const authCtx = useContext(AuthContext)
    const [resevationList, setReservationsList] = useState([])
    
    useEffect(()=>{

        const urlUsers =  `https://iron-park-e654f-default-rtdb.firebaseio.com/users/${authCtx.userId}.json`
        axios.get(urlUsers)
        .then(response => {
            console.log(response.data)
            if(response.data && response.data.isAdmin){
                //fetch all reservations
                const urlReservations = 'https://iron-park-e654f-default-rtdb.firebaseio.com/reservations.json'
                axios.get(urlReservations)
                .then(response => {
                    console.log(response.data)

                    const keyArray = Object.keys(response.data)
                    const reservatioArray = keyArray.map (key => {
                                            const obj = {...response.data[key]}
                                            obj.id = key
                                            return obj
                                          })


                    setReservationsList(reservatioArray)
                })
                .catch(error => console.log(error))

            }
        })
        .catch(error => console.log(error))

    },[])

    return (
        <>
            <p>Show All Parking (Admin Only)</p>
            <table>
                <tr>
                    <th>Reservation Id</th>
                    <th>License Plate</th>
                    <th>Driver Name</th>
                    <th>Duration</th>
                    <th>Date & Time</th>

                </tr>
               
                    {resevationList.map( reservation => {
                        return (
                            <tr key={reservation.id}>
                                <td>{reservation.id}</td>
                                <td>{reservation.licensePlateNumber}</td>
                                <td>{reservation.userName}</td>
                                <td>{reservation.parkingDuration} mins</td>
                                <td>{displayDateTime(reservation.reservationTime)}</td>
                            </tr>
                            )
                    })}

            </table>
        </>
    )
}

export default ShowAllParkingsPage


