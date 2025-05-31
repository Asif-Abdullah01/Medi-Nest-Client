import React from 'react';
import { FaShippingFast, FaStar, FaTags, FaHeadset } from 'react-icons/fa';

import p1 from '../../../assets/person1.jpg';
import p2 from '../../../assets/person2.png';
import p3 from '../../../assets/person3.png';
import p4 from '../../../assets/person4.png';
import p5 from '../../../assets/person5.jpg';
import p6 from '../../../assets/person6.jpg';

const features = [
  {
    icon: <FaShippingFast size={40} className="text-sky-500 mb-4" />,
    title: "Fast & Safe Delivery",
    desc: "Receive your medicines swiftly and securely at your doorstep."
  },
  {
    icon: <FaStar size={40} className="text-sky-500 mb-4" />,
    title: "Trusted Quality",
    desc: "We offer only verified, genuine medicines from trusted vendors."
  },
  {
    icon: <FaTags size={40} className="text-sky-500 mb-4" />,
    title: "Affordable Rates",
    desc: "Competitive pricing to make healthcare more accessible."
  },
  {
    icon: <FaHeadset size={40} className="text-sky-500 mb-4" />,
    title: "24/7 Pharmacist Support",
    desc: "Have a question? Our certified pharmacists are here to help anytime."
  }
];

const feedbacks = [
  {
    img: p1,
    name: "Jahangir Alam",
    role: "Engineer",
    feedback: "MediNest made it easy to get the medicines I need without leaving home. Their delivery is super quick and reliable.",
    animation: "zoom-out-right"
  },
  {
    img: p2,
    name: "Farhan Ahmed",
    role: "Bank Officer",
    feedback: "I’m impressed with the service. Ordering insulin and other essentials has never been this simple.",
    animation: "zoom-in"
  },
  {
    img: p3,
    name: "Tanzim Sakib",
    role: "Teacher",
    feedback: "As a busy professional, MediNest saves me time and effort. I highly recommend it to everyone!",
    animation: "zoom-out-left"
  },
  {
    img: p4,
    name: "Arif Uddin",
    role: "Retired Government Officer",
    feedback: "Their support team helped me choose the right product. I’m very satisfied with the experience.",
    animation: "zoom-out-right"
  },
  {
    img: p5,
    name: "Mahmud Rahman",
    role: "Software Engineer",
    feedback: "Affordable, fast, and trustworthy. I buy my family's monthly medicines from MediNest regularly.",
    animation: "zoom-in"
  },
  {
    img: p6,
    name: "Rakib Uddin",
    role: "Entrepreneur",
    feedback: "MediNest is a blessing! They deliver even in emergencies. Thank you for this amazing service.",
    animation: "zoom-out-left"
  }
];

const WhyChooseUs = () => {
  return (
    <div className="py-12 bg-gray-100 dark:bg-gray-900">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center text-sky-700 dark:text-sky-400 mb-10">Why Choose MediNest</h2>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            {feature.icon}
            <h3 className="text-xl font-semibold text-center mb-2 text-gray-800 dark:text-gray-200">{feature.title}</h3>
            <p className="text-center text-gray-600 dark:text-gray-300">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Feedback Section */}
      <h2 className="text-3xl font-bold text-center text-sky-700 dark:text-sky-400 mt-16">Our Client's Feedback</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10 px-4">
        {feedbacks.map((client, index) => (
          <div key={index} className="bg-sky-100 border-2 border-sky-600 dark:bg-sky-900 dark:border-sky-500 p-6 rounded-xl flex flex-col items-center" data-aos={client.animation}>
            <div className="flex items-center gap-4">
              <img className="w-16 h-16 rounded-full object-cover" src={client.img} alt={client.name} />
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{client.name}</h3>
                <h4 className="text-sm text-gray-700 dark:text-gray-400">{client.role}</h4>
              </div>
            </div>
            <div className="flex flex-col items-center pt-4 space-y-3">
              <div className="flex text-yellow-400 text-2xl">
                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
              </div>
              <p className="text-center text-gray-800 dark:text-gray-200 italic">"{client.feedback}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
