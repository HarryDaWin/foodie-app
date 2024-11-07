import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function ReviewCard(props) {
  console.log(props.review)
  return (
    <>
      <div className='review-card'>
        <h3>Restaurant: {props.review?.restaurant_id}</h3>
        <h5>User: {props.review?.user_id}</h5>
        <p>{props.review?.text}</p>
      </div>
    </>
  )
}

function App() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/reviews')
      .then(res => res.json())
      .then((json) => {
        setReviews(json)
      })
      .catch(err => console.log(err));
  }, []);

  // const reviewItems = reviews.map((item) => {
  //   <ReviewCard key={item.id} review={item} />
  // })

  return (
    <>
      <h1>
        Reviews
      </h1>
      <ul>
        {
          reviews.map(review => (
            <ReviewCard key={review?.id} review={review} />
          ))
        }
      </ul>
    </>
  )
}

export default App
