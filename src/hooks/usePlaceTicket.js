import { useState } from "react";
import { useLogout } from "./useLogout";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const usePlaceTicket = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user }  = useAuthContext()
    const { logout } = useLogout()

    const navigate = useNavigate();

    const placeTicket = async (sourceId, destinationId, busId, noOfPassengers) => {
        setIsLoading(true);
        setError(null);

        try {
            const SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
            let PLACE_TICKET = "/api/user/pay-for-trip";

            const jsonBody = JSON.stringify({sourceId, destinationId, busId, noOfPassengers})
            const response = await fetch(SERVER_URL+PLACE_TICKET, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${user.token}` ,
                    'Content-type': 'application/json' 
                },
                body: jsonBody
            })
            const data = await response.json();
            
            if (response.status === 401) {
                logout();
            }
            else if (!response.ok) {
                setError(data.msg);
            }
            else {
                return { 
                    success: true,
                    orderId: data.orderId, 
                    amount:data.tripDetails.fare, 
                    ticketId: data.ticketId,
                }
            }
        } 
        catch (error) {
            setError(JSON.stringify(error));
        }
        finally {
            setIsLoading(false);
        }
    }

    const displayRazorpay = async (sourceId, destinationId, busId, noOfPassengers) => {
        setIsLoading(true);
        setError(null);

        const placeTicketResponse = await placeTicket(sourceId, destinationId, busId, noOfPassengers);
        if(!placeTicketResponse || !placeTicketResponse.success) {
            return;
        }
        const { orderId, amount, ticketId } = placeTicketResponse;

        const loadScript = (src) => {
            return new Promise((resolve) => {
              const script = document.createElement('script')
              script.src = src
              script.onload = () => {
                resolve(true)
              }
              script.onerror = () => {
                resolve(false)
              }
              document.body.appendChild(script)
            })
        }

        try {
            const RAZORPAY_CHECKOUT_URL = import.meta.env.VITE_RAZORPAY_CHECKOUT_URL;
            const res = await loadScript(RAZORPAY_CHECKOUT_URL);
            if (!res){
                setError('Unable to loadScript in HTML');
                return;
            }

            const SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
            const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
            const PAYMENT_VERIFY_URL = SERVER_URL + `/api/auth/tickets/${ticketId}/verify`;
            const options = {
                "key": RAZORPAY_KEY_ID,
                "amount": amount * 100,
                "currency": "INR",
                "description": "Test Transaction",
                "order_id": orderId,
                "handler": async function (response) {
                    const paymentResponse = await fetch(PAYMENT_VERIFY_URL, {
                        method: 'POST',
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify(response),
                    })

                    const data = await paymentResponse.json();
                    if (paymentResponse.ok) {
                        navigate('/passenger/tickets');
                    }
                    else {
                        setError(data.message);
                    }
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            const paymentObject = new window.Razorpay(options); 
            paymentObject.open();
        }
        catch (error) {
            setError(JSON.stringify(error));
        }
        finally {
            setIsLoading(false);
        }
    }

    return { displayRazorpay, isLoading, error };
}