'use client'
import React, { useState } from 'react';
import styles from './about.module.css'; 

const TeamComponent = () => {
    // Sample data for team members
    const initialTeamMembers = [
        { id: 1, name: 'John Doe', image: '../../../images/riders-team-member-2.jpg' },
        { id: 2, name: 'Jane Smith', image: '../../../images/riders-team-member.jpg' },
        { id: 3, name: 'Mike Johnson', image: '../../../images/riders-team-member-3.jpg' },
        { id: 4, name: 'Emily Brown', image: '../../../images/riders-team-member.jpg' },
        { id: 5, name: 'Johnny Doe', image: '../../../images/riders-team-member.jpg' },
        { id: 6, name: 'Jane Smith', image: '../../../images/riders-team-member.jpg' },
        { id: 7, name: 'Mike Johnson', image: '../../../images/riders-team-member.jpg' },
        { id: 8, name: 'Emily Brown', image: '../../../images/riders-team-member.jpg' }
    ];

    const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
    const [showMore, setShowMore] = useState(false);

    // Function to toggle showing more team members
    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const start = showMore ? 4 : 0;
    const end = showMore ? 8 : 4;

    return (        
            <div className={styles.teamContainer}>
                <h2 className={styles.teamHeader}>We have a team of Professional Staff</h2>
                <div className={styles.teamMembers}>
                    {teamMembers.slice(start, end).map(member => (
                        <div key={member.id} className={styles.member}>
                            <img src={member.image} alt={member.name} />
                            <p className='mt-3'>{member.name}</p>
                            {/* <p className={styles.customColorGray}></p> */}
                        </div>
                    ))}
                </div>
                {teamMembers.length > 4 && (
                    <button className={`${styles.teamButton} ${styles.roundedButton}`} onClick={toggleShowMore}>
                        {showMore ? '' : ''}
                    </button>
                )}                
            </div>
    );

}

export default TeamComponent;
