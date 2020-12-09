import { Spinner } from 'react-bootstrap'

function Loader() {
    return (
        <Spinner
            animation='border'
            role='status'
            style={{
                width: "100px",
                height: "100px",
                margin: "auto",
                marginBottom: "20px",
                display: 'block'
            }}>
                <span className='sr-only'></span>
        </Spinner>
    )
}

export default Loader