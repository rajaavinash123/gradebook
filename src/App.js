import React from 'react';
import './App.css';
import DisplayData from './Components/DisplayData';
// import MyComponent from './Components/Trail2';
const App = () =>{
  return(
  <>
  <div className='header'>
    <div className='gradebook'> The GradeBook </div>
    <div id='date'> </div>
  </div>
    <br/>
  <div className='details'>
    <div className='c1'>University : Lovely Professional University</div> 
    <div className='c1'>Department : CSE</div>
    <div className='c1'>Title : EPAM Training</div>
  </div>
  <div className='details'>
    <div className='c1'>Professor : Mir Junaid Rasool</div>
    <div className='c1'>Group : K19FE</div>
    <div className='c1'>Semester : 4-2</div>
  </div>
  <br/>
  <br/> <br/>

<br/> <br/>

<div>
  <DisplayData/>
</div> <br/>
<br/> <br/>

  </>

)}

export default App;