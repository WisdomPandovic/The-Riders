// "use client";
// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import axios from 'axios'; // Assuming you're using Axios for API calls

// function BlogPostDetail() {
//   const router = useRouter();
//   console.log(router, "blogpostdetail")
//   const { id } = router.query; // Destructure ID from query parameters

//   const [blogPost, setBlogPost] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         const response = await axios.get(`/api/blog/${id}`); // Adjust API endpoint URL
//         setBlogPost(response.data);
//       } catch (error) {
//         console.error('Error fetching blog post:', error);
//         setError(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (id) {
//       fetchData();
//     }
//   }, [id]); // Re-run effect when ID changes

//   if (isLoading) {
//     return <div>Loading blog post...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   if (!blogPost) {
//     return <div>Blog post not found</div>;
//   }

//   // Display blog post details here
//   return (
//     <div>
//       <h1>{blogPost.title}</h1>
//       <p>{blogPost.content}</p>
//       {/* Display other blog post details as needed */}
//     </div>
//   );
// }

// export default BlogPostDetail;

"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

const BlogPost = () => {
  const { id } = useParams(); // Get id from route parameters
  const [blogPost, setBlogPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/api/blog/${id}`);
        setBlogPost(response.data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchBlogPost();
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading blog post...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!blogPost) {
    return <div>Blog post not found</div>;
  }

  return (
    <div>
      <h1>{blogPost.title}</h1>
      <p>{blogPost.content}</p>
      {/* Additional details */}
    </div>
  );
};

export default BlogPost;
