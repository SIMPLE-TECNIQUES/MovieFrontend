import React, { createContext, useState, useEffect } from "react";
import img from "../assets/back.jpg";
import back from "../assets/bg.jpg";

export const BlogContext = createContext(null);
// require('dotenv').config();



const Context = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [iconCount, setIconCount] = useState(5); 
  const [searchQuery, setSearchQuery] = useState(""); 

  const changeCategory = (category) => {
    setSelectedCategory(category);
  };


  useEffect(() => {
    const fetchBlogs = async () => {
        try {
            const response = await fetch(`https://moviebackend-o6m5.onrender.com/api/blogs`);
            if (!response.ok) {
                throw new Error('Failed to fetch blogs');
            }
            const data = await response.json();
            // console.log('dt',data)
            setBlogs([...data].reverse());
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    fetchBlogs();
}, []);



  return (
    <BlogContext.Provider
      value={{ selectedCategory, changeCategory, iconCount,blogs, setIconCount, searchQuery, setSearchQuery,}}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default Context;
