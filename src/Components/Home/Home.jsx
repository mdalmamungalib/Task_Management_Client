import React from 'react';
import Banner from './Banner/Banner';
import Features from './Features/Features';
import Testimonials from './Testimonials/Testimonials';
import HowItWorks from './HowItWorks/HowItWorks';
import CallToAction from './CallToAction/CallToAction';
import TaskManagement from './TaskManagement/TaskManagement';

const Home = () => {
    return (
        <div>
           <Banner/>
           <Features/>
           <Testimonials/>
           <HowItWorks/>
           <CallToAction/>
        </div>
    );
};

export default Home;