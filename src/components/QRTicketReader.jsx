import QrReader from 'react-qr-scanner';
import { useValidateTicket } from '../hooks/useValidateTicket';

const QRTicketReader = () => {
    const { validateTicket } = useValidateTicket();

    const handleScan = (data) => {
        if (data) {
            const url = data.text;
            validateTicket(url)
            .then(data => {
                console.log('Validate Success', data);
            })
            .catch(error => {
                console.warn('Validation failed', error);
            })
        }
    }

    const handleError = (error) => {
        console.warn(error);
    }

    return (
        <div className="TicketQrReader">
            <p>Scan the Ticket Qr code</p>
            <QrReader 
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
            />
        </div>
    )
}

export default QRTicketReader;