"use client";
import { useRouter, useSearchParams } from 'next/router';
import { useState, useEffect } from 'react';

function BlogDetails() {
  const router = useRouter(); // Access router object for context
  const [searchParams] = useSearchParams(); // Destructure to get search params

  const id = searchParams?.get('id'); // Access ID parameter using optional chaining

  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Added state for loading indicator
  const [error, setError] = useState(null); // Added state for error handling

  useEffect(() => {
    if (id) {
      setIsLoading(true); // Set loading state to true initially
      setError(null); // Reset error state

      const apiUrl = `/api/blog/${id}`; // Construct API URL with ID
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch blog post');
          }
          return response.json();
        })
        .then(data => {
          setBlog(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching blog:', error); // Log error for debugging
          setError(error);
          setIsLoading(false);
        });
    } else {
      setBlog(null); // Reset blog state if ID is undefined
    }
  }, [id]); // Dependency on id ensures useEffect runs on query parameter changes

  return (
    <div>
      {isLoading && (
        <div>Loading blog details...</div> // Display loading indicator while fetching
      )}
      {error && (
        <div className="error">
          <p>Error fetching blog details: {error.message}</p>
        </div>
      )}

      {blog && (
        <>
          <h1>{blog.title}</h1>
          <p>{blog.content}</p>
          {/* Rest of your blog content rendering logic */}
        </>
      )}

      {!blog && !isLoading && ( // Display message if no blog found (no ID or error)
        <div>No blog post found.</div>
      )}

       {/* Uncomment this section to display the blog content (optional) */}
       <div className='container mb-5'>
        <div className='row'>
          <div className='col-lg-6'>
            <img src="/images/riders-photos (1).jpg" alt="Client" className="blogImage" />
            <div className='bg-customIconColor mt-3 d-flex'>
              <p>8 sep</p>
              <p className='ms-2'>-</p>
              <p className='ms-2'>by Kola Dipo</p>
            </div>
            <h3 className='mt-3 customColorGray mb-4 bold'>Navigating the Digital Transformation: Tips for Businesses</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, iure quam! Quo repudiandae eveniet vero
              nostrum, voluptate nulla exercitationem impedit! Sequi earum, exercitationem dolores optio perspiciatis
              dignissimos deleniti ipsam tempore.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt suscipit molestiae, assumenda aspernatur
              consectetur obcaecati explicabo laborum culpa quo omnis minus id distinctio molestias aperiam. Magnam saepe
              veniam, quasi cumque deserunt autem quod dignissimos, temporibus mollitia incidunt nemo nesciunt consequuntur
              cum repellendus? Eos eligendi vero, explicabo hic blanditiis consequuntur recusandae.</p>

            <h3 className='mt-5 customColorGray'>Comments</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
