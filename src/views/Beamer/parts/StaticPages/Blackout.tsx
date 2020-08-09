import React, { FunctionComponent, useEffect} from 'react';

const Blackout: FunctionComponent = (props) => {

  useEffect(() => {
    const blackout = document.getElementById('blackout');
    if(blackout) blackout.style.backgroundColor = 'black'
  })

  return(
    <div id='blackout' style={{height: '100vh'}}></div>
  );
}

export default Blackout;