import ServiceHeroSection from "../../components/ourService/ServiceHeroSection";
import FeaturesSection from "../../components/homeComponent/FeaturesSection";
import ServiceFocusComponent from "../../components/ourService/ServiceFocusComponent";
import CreateReview from "../../components/reviewComponent/CreateReview";

function page (){
    return(
        <div className="mb-5">
           <ServiceHeroSection/>
           < ServiceFocusComponent/>
           <FeaturesSection/>
           <CreateReview />
        </div>
    )
}
export default page;