import './alerts.css'

const AlertFirebase = ({text, error}) => {
  return (
    <p className={`alert_firebase ${error ? `alert_firebase_error` : 'alert_firebase_success'}`}>{text}</p>
  )
}

export default AlertFirebase