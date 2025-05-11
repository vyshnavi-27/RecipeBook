import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import { useState,useEffect} from 'react';

function RecipeBook(){
  const [search,setSearch] = useState('');
  const [recipe,setRecipe] = useState([]);

  useEffect(()=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`).then(res=>res.json()).then(data=>{setRecipe(data.meals || []);

    })
  },[search]);
      
  function handleSearch(e){
    e.preventDefault();
    const value= e.target.elements.search.value.trim();
    setSearch(value);
  }
    
  return (
    <div className='container'>
      <h1>🍽 Simple Recipe App</h1>
      <form onSubmit={handleSearch}>
      <input placeholder='Search Recipe....' name='search'/>
      <button type='Submit'>Search</button>
      </form>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {
          recipe.map(meal=>
            (
          <div 
            key={meal.idMeal}
            style={{
        border: "1px solid #ccc",
        margin: "10px",
        padding: "10px",
        maxWidth: "300px",
         flex: '1 1 300px'
      }}>
        <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{ width: "100%" }}
      />
      <h3>{meal.strMeal}</h3>
      <p>{meal.strCategory}</p>
      <a href={meal.strSource || "#"} target="_blank" rel="noopener noreferrer">
        View Recipe
      </a>
          </div>
            ))
        }
      </div>
    </div>
  )
  }


  


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RecipeBook/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
