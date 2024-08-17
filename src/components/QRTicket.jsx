import QRCode from 'react-qr-code';

const QRTicket = ({url}) => {
    return (
    <div className='qrimage'>
        <QRCode value={url} />
    </div>
    )
}

export default QRTicket