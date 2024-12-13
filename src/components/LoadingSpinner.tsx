import Spinner from 'react-bootstrap/Spinner';


const LoadingSpinner = () => {
  return (
    <div className='spinnerContainer'>
    <Spinner animation="border" role="status" className='loadingspinner'>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
  )
}

export default LoadingSpinner