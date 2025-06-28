import React, { useLayoutEffect, useRef} from "react";
import "../styles/Meme.css";
import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
import {Draggable} from "gsap/all";
gsap.registerPlugin(Draggable)




const Meme = () => {
  // const [memeImage , setMemeImage] = React.useState("");

  const [meme, setMeme] = React.useState({
    topText:'',
    bottomText: '',
    randomImage:""
  })

  const [allMemes,setAllMemes] = React.useState([]);


  React.useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(memeData => setAllMemes(memeData.data.memes))
   },[])
   
   const container = useRef();
   useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // use scoped selectors
      Draggable.create(".topText", {
      });

    }, container);
    
    return () => ctx.revert();
  }, []);
   useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // use scoped selectors
      Draggable.create(".bottomText", {
      });

    }, container);
    
    return () => ctx.revert();
  }, []);


  function getMemeImage() {
  //  const allMemes = allMemes.data.memes;
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url
    setMeme(prevMeme =>({
      ...prevMeme,
      randomImage:url
    }));
  }
 
  function handleChange(event){
    const {name,value} = event.target

    setMeme(prevMeme=>({
      ...prevMeme,
      [name] : value
    }))
  }


  return (
    <>
      <main>
        <div className="form">
          <input className="form--input" placeholder="top text" type="text" name="topText" value={meme.topText} onChange={handleChange}/>
          <input
            className="form--input"
            placeholder="bottom text"
            type="text" 
            name="bottomText"
            value={meme.bottomText}
             onChange={handleChange}
          />
          <button className="form--button" onClick={getMemeImage}>
            Get a new meme 🖼️
          </button>
        </div>
        <div className="cont">
          <img src={meme.randomImage} className="meme--image" alt="" />
          <div className="container" ref={container}>
          <h2 className="topText">{meme.topText}</h2>
          <h2 className="bottomText">{meme.bottomText}</h2>
          </div>
        </div>
      </main>
    </>
  );
};

export default Meme;
