import Nav from "../components/Nav";
import CreateContactForm from "../components/CreateContactForm";
function page() {
  return (
    <div>
      <Nav />
      <h3 className="user-header">GET IN TOUCH</h3>
      <p className="text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
        vitae, assumenda voluptatum modi quas nisi animi molestiae, sunt cum sed
        suscipit rem in. Adipisci itaque ad excepturi unde autem quibusdam.
      </p>
      <CreateContactForm />
    </div>
  );
}
export default page;
