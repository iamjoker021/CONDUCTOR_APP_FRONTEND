import QrReader from 'react-qr-scanner';

const QRBusIdReader = () => {

    const handleScan = (data) => {
        if (data) {
            console.log(data);
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