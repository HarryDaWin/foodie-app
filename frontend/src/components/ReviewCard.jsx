import '../App.css'
import { useEffect, useState, } from 'react'
import Navbar from './Navbar'

function Helper(props) {
    return (
        <>
            <div className='review-card'>
                <h5>UserID: {props?.review?.id}</h5>
                <h5>Username: {props?.review?.user_id}</h5>
                <div>
                {props?.review?.restaurants?.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
                </div>
            </div>
        </>
    )
}

function ReviewCard() {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch('http://localhost:8080/reviews')
          .then(res => res.json())
          .then((json) => {
            setReviews(json)
          })
      }, [])
    return (
        <div>
        <Navbar />
            <div className="review-container">
                
                {reviews.map((review, index) => (
                    <Helper key={index} review={review} />
                ))}
            </div>
        </div>
    )
}

export default ReviewCard;