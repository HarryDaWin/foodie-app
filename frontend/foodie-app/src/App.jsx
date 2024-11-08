import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function ReviewCard(props) {
  console.log(props?.review)
  return (
    <>
      <div className='review-card'>
        <h3>Restaurant: {props?.review?.restaurant_id}</h3>
        <h5>User: {props?.review?.user_id}</h5>
        <p>{props?.review?.text}</p>
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
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newReview = {
          text: formData.get('reviewText')
        };
        createReview(newReview);
      }}>
        <input type="text" name="reviewText" placeholder="Write a review" required />
        <button type="submit">Submit</button>
      </form>
      </ul>
    </>
  )
}

export default App
