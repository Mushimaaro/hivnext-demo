import Loader from "../components/Loader"
import "../styles/AnimBg.css"

const LoaderPage = () => {
  return (
    <div className="bg-back">
      <div className="blob-outer-container">
        <div className="blob-inner-container">
          <div className="blobs"/>
        </div>
      </div>
      <Loader/>
    </div>
    
  )
}

export default LoaderPage