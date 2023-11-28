import React, { useEffect ,useState} from "react";
import "./News.css"
const News=()=>{

    const [mynews , setMyNews] = useState([]);

    const fetchData=async ()=>{
        let response= await fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=57921f4f70e84274a2cc8fa308a96355");
        let data=await response.json();
        setMyNews(data.articles);
    }
    
    useEffect(()=>{
        fetchData();
    },[])
 
    return(
        <>
      <div className="mainDiv">
      {
            mynews.map((ele)=>{
                return(
                    <>
                     <div class="card" style={{width: "380px",height:"450px",margin:"15px"}}>
  
                     <img
  src={ele.urlToImage == null ? "https://static.vecteezy.com/system/resources/thumbnails/008/255/803/small/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg" : ele.urlToImage}
  className=""
  alt="..."
/>
<div class="card-body">
    <h5 class="card-title">{ele.author}</h5>
    <p class="card-text">{ele.title}</p>
    <a href={ele.url} target="blank" class="btn btn-primary">Read More</a>
  </div>
</div>
                    </>
                )
            })
        }
           
      </div>
        </>
    )
}

export default News