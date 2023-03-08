export default function BookingWidget({place}) {
    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price : ${place.price} / per night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex border-b">
                    <div className="my-4 200 py-2 px-4">
                        <label>Check In:</label>
                        <input type="date" />
                    </div>
                    <div className="my-4 200 py-2 px-4 border-l">
                        <label>Check Out:</label>
                        <input type="date" />
                    </div>
                </div>
                <div className="my-4 200 py-2 px-4 border-l">
                    <label>Number of Guests:</label>
                    <input type="number" value={1} />
                </div>
            </div>
            <button className="login mt-4">Book this place</button>
        </div>
    )
}