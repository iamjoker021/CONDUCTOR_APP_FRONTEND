import QrReader from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom';

const QRBusIdReader = () => {
    const navigate = useNavigate();
    const handleScan = (data) => {
        if (data) {
            console.log(data);
            const busId = parseInt(data.text);
            if (busId) {
                navigate('/passenger/place-ticket/' + busId);
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
                constraints={{
                    audio: false,
                    video: { facingMode: "environment" }
                  }} 
            />
        </div>
    )
}

export default QRBusIdReader;