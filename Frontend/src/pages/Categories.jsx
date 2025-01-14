import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {  
   const cat = [  
      {  
          name: "Comedy",  
          color: "bg-gradient-to-br from-fuchsia-600 via-fuchsia-400 to-fuchsia-200",  
          to: "/categories/Comedy",  
          img: "https://www.pngall.com/wp-content/uploads/10/Comedy-PNG-Photo-Image.png",  
      },  
      {  
          name: "Business", 
          color: "bg-gradient-to-r from-cyan-700 via-blue-500 to-indigo-600",  
          to: "/categories/Business",  
          img: "https://www.pngmart.com/files/23/Business-PNG-HD.png",  
      },  
      {  
          name: "Education",  
          color: "bg-gradient-to-b from-green-600 via-green-400 to-green-200",  
          to: "/categories/Education",  
          img: "http://clipart-library.com/images_k/education-transparent-background/education-transparent-background-21.png",  
      },  
      {  
          name: "Government",  
          color: "bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700",  
          to: "/categories/Government",  
          img: "https://cdn-icons-png.flaticon.com/512/4040/4040141.png",  
      },  
      {  
          name: "Industry Experts",  
          color: "bg-gradient-to-r from-amber-200 to-yellow-500",  
          to: "/categories/Industry Experts",  
          img: "https://i0.wp.com/hobbyfamilie.de/wp-content/uploads/2022/10/hobbytalk-rund-podcast.png?resize=736%2C736&ssl=1",  
      },  
      {  
          name: "Bollywood",  
          color: "bg-gradient-to-l from-rose-400 via-fuchsia-500 to-indigo-500",  
          to: "/categories/Bollywood",  
          img: "https://www.newsfolo.com/wp-content/uploads/2018/03/bollywood_logo.png",  
      },  
      {  
          name: "Fitness",  
          color: "bg-gradient-to-r from-teal-400 to-gray-800",  
          to: "/categories/Fitness",  
          img: "https://freepngimg.com/thumb/hand/76374-fitness-logo-vector-creative-download-hd-png.png",  
      },  
  ]; 

    return (  
        <div className='h-screen lg:h-[78vh]'>  
            <div className="px-4 lg:px-12 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">  
                {cat.map((item, i) => (   
                    <Link to={item.to} key={i} className={`rounded ${item.color} px-10 py-4 text-xl font-semibold hover:scale-105 shadow-xl transition-all relative -z-10 lg:z-0`}>  
                        <div>{item.name}</div>   
                            <div className="w-[100%] flex items-center justify-end ">  
                                <img src={item.img} alt={`${item.name} Category`} className='rounded h-[15vh] md:h-[17vh] lg:h-[18vh]' />  
                            </div>  
                         
                    </Link>  
                ))}  
            </div>  
        </div>  
    );  
}  

export default Categories;