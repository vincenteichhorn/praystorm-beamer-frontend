import React, { FunctionComponent, useEffect} from 'react';

const Loading: FunctionComponent = (props) => {

  useEffect(() => {
    const loading = document.getElementById('loading');
    if(loading) loading.style.backgroundColor = 'black'
  })

  return(
    <div id='loading' style={{height: '100vh'}}></div>
  );
}

export default Loading;