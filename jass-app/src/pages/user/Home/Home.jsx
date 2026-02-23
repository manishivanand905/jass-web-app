import Hero from "../../../components/user/Hero/Hero";
import Collections from "../../../components/user/Collections/Collections";
import WhyChooseUs from "../../../components/user/WhyChooseUs/WhyChooseUs";
import Howitworks from "../../../components/user/Howitworks/Howitworks";
import Testimonials from "../../../components/user/Testimonials/Testimonials";
import Footer from "../../../components/common/Footer/Footer";
import Sidebar from "../../../components/common/Sidebar/Sidebar";

const Home = () => {
  return (
    <Sidebar type="user">
      <Hero />
      <Collections />
      <WhyChooseUs />
      <Howitworks />
      <Testimonials />
      <Footer />
    </Sidebar>
  );
};

export default Home;
