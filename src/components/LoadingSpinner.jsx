import './LoadingSpinner.css'

function LoadingSpinner({ size = 'medium', message = 'Loading...' }) {
  return (
    <div className="loading-spinner-container">
      <div className={`spinner spinner-${size}`}></div>
      {message && <p className="spinner-message">{message}</p>}
    </div>
  )
}

export default LoadingSpinner

