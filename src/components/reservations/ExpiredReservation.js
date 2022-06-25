import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ExpiredReservation  = (props) => {

    const {checkOutTime} = props
    const [counter, setCounter] = useState(5)
    const navigate = useNavigate();

    useEffect(() => {
        const id = setTimeout(() => {
            setCounter(prev => prev - 1);
            if(counter <= 0){
                navigate('/')
            }
        }, 1000);
        return () => {
            clearTimeout(id)
        }
    }, [counter])

    return (
        <div>
            <h1>Reservation Expired</h1>
            <h2>{checkOutTime}</h2>
            <h4>Thank you, for parking with us.</h4>
        </div>
    )
}

export default ExpiredReservation