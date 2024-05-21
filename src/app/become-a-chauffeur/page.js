import CreateChauffeurForm from "../components/chauffeurComponent/CreateChauffeurForm";
import { FaMoneyBillAlt } from 'react-icons/fa'; // Earn icon
import { IoMdCalendar } from 'react-icons/io'; // Schedule icon
import { HiOutlineShieldCheck } from 'react-icons/hi';

function page() {
    return (
        <div className="container contact-text mt-5 mb-5">
            <div className="mb-5">
                <h2>Be a chauffeur with The Riders</h2>
            </div>

            <div className="row mb-5">
                <div className="col-md-4">
                    <FaMoneyBillAlt size={70} color="black" /> 
                    <p className="mt-2 bold customIconColor">Earn anytime, anywhere</p>
                    <p className="customColorGray ">Drive as much as you&apos;d like and earn accordingly. The more you drive, the more you can earn. Additionally, your earnings are automatically deposited on a weekly basis</p>
                </div>


                <div className="col-md-4">
                    <IoMdCalendar size={70} color="black" />
                    <p className="mt-2 bold customIconColor">Set your own schedule</p>
                    <p className="customColorGray ">Choose to drive whenever it suits your schedule. There's no fixed office or supervisor. This means you have the flexibility to start and stop according to your own timetable—because with the Riders, you&apos;re the one calling the shots.</p>
                </div>

                <div className="col-md-4">
                    <HiOutlineShieldCheck size={70} color="black" />
                    <p className="mt-2 bold customIconColor">Safety behind the wheel</p>
                    <p className="customColorGray ">We are committed to ensuring the safety of everyone on the road. Our advanced technology allows us to prioritize driver safety at every stage of the journey—before, during, and after each trip.</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8 mb-4">
                    <h3> Signup as a chauffeur</h3>
                    <p>Complete the form below and a member of our team will get in touch.</p>
                </div>

                <div className="col-md-6">
                    <CreateChauffeurForm />
                </div>
            </div>

        </div>
    );
}
export default page;
