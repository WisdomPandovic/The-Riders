import Nav from "../components/Nav"
import CreateUserForm from "../components/CreateUserForm"
function page (){
    return(
        <div>
            <Nav/>
            <h3 className="user-header">User Page</h3>
            <CreateUserForm/>
        </div>
    )
}
export default page;