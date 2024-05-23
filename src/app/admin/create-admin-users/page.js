import CreateAdminUserForm from "../../components/userComponent/CreateAdminUserForm";

function page() {
  return (
    <div className="container contact-text mt-5 mb-5">
      <div className="text-center pt-5">
        <h3>Admin Only</h3>
        <p className="customIconColor ">Create Users</p>
      </div>
      <CreateAdminUserForm />
    </div>
  );
}
export default page;
