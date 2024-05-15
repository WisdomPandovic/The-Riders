import React from 'react';
import styles from './about.module.css';

const AboutUsComponent = () => {
    return (
        <div className='container mb-5'>
            <div className={`row ${styles.aboutUsContainer}`}>
                <div className="col-lg-6 col-md-12">
                    <h2 className={styles.customIconColor}>About Us</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vestibulum tortor id purus ullamcorper, eu condimentum odio molestie. Nulla facilisi. Fusce pulvinar nisl at diam convallis dictum.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, iure quam! Quo repudiandae eveniet vero
                        nostrum, voluptate nulla exercitationem impedit! Sequi earum, exercitationem dolores optio perspiciatis
                        dignissimos deleniti ipsam tempore.</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt suscipit molestiae, assumenda aspernatur
                        consectetur obcaecati explicabo laborum culpa quo omnis minus id distinctio molestias aperiam. Magnam saepe
                        veniam, quasi cumque deserunt autem quod dignissimos, temporibus mollitia incidunt nemo nesciunt consequuntur
                        cum repellendus? Eos eligendi vero, explicabo hic blanditiis consequuntur recusandae.</p>
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="row ">
                        <div className='col-md-5 mb-3'>
                            <img src="/images/about-img-2.jpg" alt="Smaller Image" className={styles.smallerImage} />
                        </div>

                        <div className="col-md-7 mb-3">
                            <img src="/images/about-us.jpg" alt="Smaller Image" className={styles.biggerImage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUsComponent;
