const ReservationForm  = () => {
    return (
        <p>Reservation Form...</p>
    )
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