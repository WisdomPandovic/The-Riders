import ServiceHeroSection from "../components/ourService/ServiceHeroSection";
import FeaturesSection from "../components/homeComponent/FeaturesSection";
import ServiceFocusComponent from "../components/ourService/ServiceFocusComponent";

function page (){
    return(
        <div>
           <ServiceHeroSection/>
           < ServiceFocusComponent/>
           <FeaturesSection/>
           
        </div>
    )
}
export default page;