import CreateAirportForm from "../../components/airportComponet/CreateAirportForm";

function page() {
  return (
    <div className="container contact-text mt-5 mb-5">
      <div className="text-center pt-5">
        <h3>Admin Only</h3>
        <p className="customIconColor ">Create Airport</p>
      </div>
      <CreateAirportForm />
    </div>
  );
}
export default page;
