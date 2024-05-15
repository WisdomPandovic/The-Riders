// // pages/blog-details/[id].js

// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';

// function BlogDetails() {
//   const router = useRouter();
//   const { id } = router.query;
//   const [blog, setBlog] = useState(null);

//   useEffect(() => {a
//     // Fetch blog post details based on ID
//     if (id) {
//       fetch(`/api/blog/${id}`)
//         .then(response => response.json())
//         .then(data => setBlog(data));
//     }
//   }, [id]);

//   if (!blog) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{blog.title}</h1>
//       <p>{blog.content}</p>
//     </div>
//   );
// }

// export default BlogDetails;
