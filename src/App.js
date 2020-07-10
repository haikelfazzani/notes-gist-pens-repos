import React, { useEffect } from 'react';
import { useState } from 'react';

function App () {

  const [images, setImages] = useState(null);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/icons/data.json')
      .then(r => r.json())
      .then(r => {
        setImages(r.h);
      })
      .catch(e=>{
        console.log(e);
      })

  }, []);

  return (
    <div className="App">
      {images && <img src={process.env.PUBLIC_URL + '/icons/' + images} all={images} />}
    </div>
  );
}

export default App;
