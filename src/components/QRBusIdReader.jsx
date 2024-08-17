import QrReader from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom';

const QRBusIdReader = () => {
    const navigate = useNavigate();
    const handleScan = (data) => {
        if (data) {
            const busId = data.text;
            if (busId && parseInt(busId)) {
                navigate('place-ticket/bus/' + busIdUrl);
            }
        }
    }

    const handleError = (error) => {
        console.warn(error);
    }

    return (
        <div className="busQrReader">
            <p>Scan the BUS Qr code</p>
            <QrReader 
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
            />
        </div>
    )
}

export default QRBusIdReader;