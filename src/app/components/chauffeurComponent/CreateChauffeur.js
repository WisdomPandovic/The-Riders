import React from 'react';
import CreateChauffeurForm from './CreateChauffeurForm';

function CreateChauffeur() {
  // Define the handleContactSubmit function
  const handleChauffeurSubmit = async (chauffeurData) => {
    try {
      // Send a POST request to your contact creation API route (/api/contact)
      const response = await fetch('/api/chauffeurApplication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(chauffeurData),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful contact creation (e.g., display success message)
        console.log('Chauffeur created successfully!');
      } else {
        // Handle potential errors during creation
        console.error('Error creating chauffeur', data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  // Log the type of onSubmit before passing it down
  console.log('Type of onSubmit in CreateChauffeur:', typeof handleContactSubmit);

  return (
    <div>
      <h1>Create Product</h1>
      <CreateChauffeurForm onSubmit={handleChauffeurSubmit} />
    </div>
  );
}

export default CreateChauffeur;
