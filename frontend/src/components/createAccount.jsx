import '../App.css'
import { useState, } from 'react'
import Navbar from './Navbar';


function createHelper(review) {
    fetch('http://localhost:8080/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Tell the server we are sending JSON data in the body with application/json
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
  
  
function CreateAccount() {
  const [userId, setUserId] = useState('')
  const [restaurants, setRestaurants] = useState('')

  const handleSubmit = (e) => {
      e.preventDefault()
      const review = {
      user_id: userId,
      restaurants: restaurants.split(',') // Convert input text to an array
      }
      createHelper(review)
  }
  return (
      
      <div className='createAccount'>
        <Navbar />
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
      </div>
  );
  }

export default CreateAccount;