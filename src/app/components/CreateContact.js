import React from 'react';
import CreateContactForm from './CreateContactForm';

function CreateContact() {
  // Define the handleContactSubmit function
  const handleContactSubmit = async (contactData) => {
    try {
      // Send a POST request to your contact creation API route (/api/contact)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful contact creation (e.g., display success message)
        console.log('Contact created successfully!');
      } else {
        // Handle potential errors during creation
        console.error('Error creating contact', data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  // Log the type of onSubmit before passing it down
  console.log('Type of onSubmit in CreateContact:', typeof handleContactSubmit);

  return (
    <div>
      <h1>Create Product</h1>
      {/* Pass handleContactSubmit as the onSubmit prop */}
      <CreateContactForm onSubmit={handleContactSubmit} />
    </div>
  );
}

export default CreateContact;
