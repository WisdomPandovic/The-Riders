import CreateUserForm from "../components/userComponent/CreateUserForm";
// import UserList from "../components/userComponent/UserList";

function page() {
    return (
        <div className="container mt-5">
            <div className="row pt-5 mb-3">
                <div className="col-md-6 pb-3">
                    <h3 className="user-header ">Create Account</h3>
                    <CreateUserForm />
                </div>

                <div className="col-md-6 pb-3">
                    <h3 className="user-header ">Benefits of Creating an Account</h3>
                    <ul >
                        <li className="pb-3">Book rides even faster using stored account details.</li>
                        <li className="pb-3">Modify trip details.</li>
                        <li className="pb-3">Access invoices and payment receipts.</li>
                        <li className="pb-3">Reporting tools.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default page;