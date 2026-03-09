import Hero from "../../../components/user/Hero/Hero";
import Collections from "../../../components/user/Collections/Collections";
import WhyChooseUs from "../../../components/user/WhyChooseUs/WhyChooseUs";
import Howitworks from "../../../components/user/Howitworks/Howitworks";
import MobileComparison from "../../../components/user/MobileComparison/MobileComparison";
import Testimonials from "../../../components/user/Testimonials/Testimonials";
import Sidebar from "../../../components/common/Sidebar/Sidebar";

const Home = () => {
  return (
    <Sidebar type="user">
      <Hero />
      <Collections />
      <WhyChooseUs />
      <Howitworks />
      <MobileComparison />
      <Testimonials />
    </Sidebar>
  );
};

export default Home;
