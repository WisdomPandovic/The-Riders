"use client";
import React, { useState, useEffect } from "react";
import styles from './blog.module.css';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Link from 'next/link';
import Image from 'next/image';

const BlogComponent = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("/api/blog");
                const data = await response.json();

                data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                setBlogs(data);
                console.log(blogs)
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="container mt-5 mb-5">
            <p className="pt-5">Blog</p>
            <h2>News & Event</h2>

            <div className="row mt-4">
                {blogs.map((blog) => (
                    <div className="col-lg-4 col-md-6 mb-3" key={blog._id}>
                        <div className={styles.card} >
                        <div className={styles.imageContainer}>
                           
                            <Image src={`/uploads/${blog.image}`} alt="" fill objectFit="cover" />
                            </div>
                            <div className={`${styles.cardBody} p-3`}>
                                <h5 className={`${styles.cardTitle} `}>{blog.title}</h5>
                                <p className={`${styles.cardText} mb-4 `}>{blog.header}</p>
                            </div>

                            <Link href={`/blog/${blog._id}`}>
                                <div className={`nav-link mb-3 p-3 ${styles.readMore}`}>
                                    <p>Read More <AiOutlineArrowRight size={20} color="red" /></p>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}

                {/* <div className="col-lg-4 col-md-6 mb-3">
                    <div className={styles.card}>
                        <img src="/images/pix3.jpg" alt="Blog Post 1" className={styles.cardImg} />
                        <div className={`${styles.cardBody} p-3`}>
                            <h5 className={`${styles.cardTitle} `}>Top 10 Travel Destinations in 2022</h5>
                            <p className={`${styles.cardText} mb-4 `}>Explore breathtaking landscapes, vibrant cultures, and hidden gems in these must-visit destinations worldwide.</p>
                        </div>
                        <a className="nav-link mb-3 p-3" href=""><p>Read More  <AiOutlineArrowRight size={20} color="red" /></p> </a>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-3">
                    <div className={styles.card}>
                        <img src="/images/pix2.jpg" alt="Blog Post 2" className={styles.cardImg} />
                        <div className={`${styles.cardBody} p-3`}>
                            <h5 className={styles.cardTitle}>The Rise of Remote Work: Trends and Challenges</h5>
                            <p className={`${styles.cardText} mb-4 `}>Discover the evolution of remote work, its impact on industries, and strategies for successful adaptation.</p>
                        </div>
                        <a className="nav-link mb-3 p-3" href=""><p>Read More  <AiOutlineArrowRight size={20} color="red" /></p> </a>
                    </div>
                </div>

                <div className="col-lg-4 col-md-12 mb-3">
                    <div className={styles.card}>
                        <img src="/images/pix2.jpg" alt="Blog Post 3" className={styles.cardImg} />
                        <div className={`${styles.cardBody} p-3`}>
                            <h5 className={styles.cardTitle}>Navigating the Digital Transformation: Tips for Businesses</h5>
                            <p className={`${styles.cardText} mb-4 `}>Learn how businesses are embracing digital transformation, overcoming obstacles, and staying competitive in the digital age.</p>
                        </div>
                        <a className="nav-link mb-3 p-3" href=""><p>Read More  <AiOutlineArrowRight size={20} color="red" /></p> </a>
                    </div>
                </div> */}

            </div>
        </div>
    );
};

export default BlogComponent;
