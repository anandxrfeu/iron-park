
import axios from "axios"
import { useEffect,useState, useContext } from "react"
import AuthContext from '../store/auth-context';

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
                    setReservationsList(response.data)
                })
                .catch(error => console.log(error))

            }
        })
        .catch(error => console.log(error))

    },[])

    return (
        <>
             <p>Show All Parking (Admin Only)</p>
             {resevationList.map( reservation => {
                return (<p>reservation</p>)
             })}
        </>
    )
}

export default ShowAllParkingsPage


