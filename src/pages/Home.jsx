import React, { useEffect, useState, useRef } from 'react';
import Banner from '../components/Banner';
import Result from '../components/Result';

function Home() {
  const [scroll,setScroll] = useState(null)
  const resultRef = useRef(null);
//To make the component automatically scroll
  useEffect(() => {
   if(scroll){
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }
   }
  }, [scroll]);

  return (
    <div>
      <Banner />
      <div ref={resultRef}>
        <Result setScroll={setScroll}/>
      </div>
    </div>
  );
}

export default Home;
