import ClientReviews from '../../components/homeComponent/ClientReviews';
import TeamComponent from '../../components/aboutComponent/TeamComponent';
import StatisticsComponent from '../../components/aboutComponent/StatisticsComponent';
import AboutHero from '../../components/aboutComponent/AboutHero';
import AboutUsComponent from '../../components/aboutComponent/AboutUsComponent';
function page (){
    return(
        <div>
            <AboutHero/>
            <AboutUsComponent/>
            <TeamComponent/>
            <StatisticsComponent/>
           <ClientReviews/>
        </div>
    )
}
export default page;