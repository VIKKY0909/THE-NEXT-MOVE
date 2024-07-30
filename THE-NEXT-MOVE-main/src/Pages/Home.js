import React from 'react';
import HeroSection from '../components/Hero/HeroSection';
import SwitchR4Hub from '../components/SwitchR4Hubr';
import SwitchR4L from '../components/LeftSide';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.png';
import image6 from '../assets/image6.png';
import Pslider from '../components/productslider/Pslider';
import ReviewSlider from '../components/reviewslider/ReviewSlider';

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <SwitchR4Hub 
        image={image1} 
        experience="EXPERIENCES"
        title="Unobtrusive Design"
        description="The Switch R4 hub fits discreetly behind your switchboard or fuse panel, minimizing visible clutter and maximizing convenience."
      />
      <SwitchR4L
        image={image2}
        experience="EXPERIENCES"
        title="Remote Command"
        description="Control your Switch home applications from anywhere in the world through the user-friendly mobile app."
      />
      <SwitchR4Hub
        image={image3}
        experience="EXPERIENCES"
        title="Voice Integration"
        description="The Switch R4 seamlessly integrates with popular virtual assistants like Alexa and Google Assistant, allowing for hands-free control using voice commands."
        imageStyle={{ width: '100%', height: 'auto' }} // Custom style added here
      />
      <SwitchR4L
        image={image4}
        experience="EXPERIENCES"
        title="Energy Consumption Tracking"
        description="The Switch R4 boasts built-in energy monitoring capabilities. Gain valuable insights into individual device power usage to identify energy-hungry appliances and optimize your home's energy consumption."
        imageStyle={{ width: '312px', height: '612px' }}
      />
      <SwitchR4Hub 
        image={image5} 
        experience="EXPERIENCES"
        title="Traditional and Automated Operation"
        description="The Switch R4 offers both traditional and manual controls through existing switches and dimmers, alongside the app and voice-based automation for a user-friendly experience."
      />
      <SwitchR4L
        image={image6}
        experience="EXPERIENCES"
        title="Remote Command"
        description="Control your Switch home applications from anywhere in the world through the user-friendly mobile app."
      />
      <Pslider/>
      <ReviewSlider/>
    </div>
  )
}

export default Home;
