
/*=================================================================IMPORT FILE===================================================================*/

import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';



function App() {

/*=============================================VARIABLE DEFINED SEARHDATA, IMAGEDATA SEARCHTEXT======================================================*/  
  
  const searchData = useRef(null);
  const [searchText, setSearchText] = useState("mountains")
  const [imageData, setImageData] = useState([]);
  
  
/*===============================================METHOD KEY CAT/MOUTAIN. SORT PER PAGES IN XML/JSON FORMATE=========================================*/
  
  useEffect(()=> {
    const params = {
    method: "flickr.photos.search",
    api_key: "acf51ebcb864dd5b10654b1d8fd92698",
    text: searchText,
    sort: "",
    per_page: 40,
    license: '4',
    extras: "owner_name, license",
    format: "json",
    nojsoncallback: 1
  }
  
  /*===============================================================FARM ID SECRET SERVER============================================================*/
  
  const parameters = new URLSearchParams(params);
  
  /*====================================================================FLICKR API===================================================================*/
  
  const url = `https://api.flickr.com/services/rest/?${parameters}`
  axios.get(url).then((resp)=> {
    console.log(resp.data)
    const arr = resp.data.photos.photo.map((imgData)=> {
      return fetchFlickerImageUrl(imgData, 'q');
    });
    setImageData (arr);
  }).catch(()=> {

  }).finally(()=> {

  })

},[searchText])


/*========================================================================FARM API===================================================================*/

const fetchFlickerImageUrl =(photo, size)=> {
  let url = `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
  if(size) {
    url += `_${size}`  
  }
  url += '.jpg'
  return url
}
  return (
    <>
    <div className="heading">
      <h1>SnapShot</h1>
    </div>
    <div className='search'>
    <input className='search-bar' onChange={(e)=> {searchData.current = e.target.value} }/>
    <button className='search-btn' onClick={()=> {setSearchText(searchData.current)}}>Seach</button>
    </div>

    <section className='category'>
      <button className='category-heading' onClick={()=> {setSearchText("mountains")}}>Mountains</button>
      <button className='category-heading' onClick={()=> {setSearchText("beaches")}}>Beaches</button>
      <button className='category-heading' onClick={()=> {setSearchText("birds")}}>Birds</button>
      <button className='category-heading' onClick={()=> {setSearchText("food")}}>Food</button>
    </section>
    <div className='sub-heading'>
      <h1>Mountains Picture</h1>
    </div>
    <section className='image-container'>
      {imageData.map((imageurl, key)=> {
        return (
          <article className='flickr-image'> 
            <img src={imageurl} key={key}/>
          </article>
         )
      })}
    </section>
    </>

  );
}

export default App;
