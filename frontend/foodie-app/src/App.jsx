import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function ReviewCard(props) {
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
function createReview(review) {
  fetch('http://localhost:8080/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(review)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


function App() {
  const [reviews, setReviews] = useState([])
  const [userId, setUserId] = useState('')
  const [restaurants, setRestaurants] = useState('')

  useEffect(() => {
    fetch('http://localhost:8080/reviews')
      .then(res => res.json())
      .then((json) => {
        setReviews(json)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const review = {
      user_id: userId,
      restaurants: restaurants.split(',') // Convert input text to an array
    }
    createReview(review)
  }

  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder='Enter username'
        />
        <input
          type='text'
          value={restaurants}
          onChange={(e) => setRestaurants(e.target.value)}
          placeholder='Enter restaurants, separated by commas'
        />
        <button type='submit'>Submit</button>
      </form>
      {reviews.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
    </div>
  )
}

export default App
