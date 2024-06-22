import Profile from "../../../components/userComponent/Profile";

function page() {
    return(
        <div className="container-fluid mt-5 whitesmokes rounded">
            <div className="p-5">
            <p className="customIconColor">Customer Account Details</p>
            </div>
            <Profile/>
        </div>
    )
}
export default page;