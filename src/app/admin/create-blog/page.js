import CreateBlogForm from "../../components/blogComponent/createBlogForm";

function page() {
  return (
    <div className="container contact-text mt-5 mb-5">
      <div className="text-center pt-5">
        <h3>Admin Only</h3>
        <p className="customIconColor ">Create Blog Post</p>
      </div>
      <CreateBlogForm />
    </div>
  );
}
export default page;
