// pages/about/page.js
import React from 'react';
import { FaHeart, FaHandsHelping, FaAward, FaUserFriends} from 'react-icons/fa'; // You can choose icons that align with your content

const AboutPage = () => {
    const teamMembers = [
        { name: 'Kush Patel', role: 'Founder & CEO' },
        { name: 'Ujjval Patel', role: 'Co-founder & CTO' },
        { name: 'Harnoor Kaur', role: 'Co-founder & Lead Designer' },
        { name: 'Sumiksh Trehan', role: 'Co-founder & Marketing Director' }
      ];
  return (
    <div className="font-sans bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-green-600 mb-4">About Us</h1>
          <p className="text-xl text-gray-600">Learn more about our mission and values</p>
        </div>

        {/* Mission Statement Card */}
        <div className="bg-white rounded-lg shadow overflow-hidden p-6">
          <h2 className="flex items-center mb-3 text-2xl font-semibold text-green-600">
            <FaHeart className="mr-2" /> Our Mission
          </h2>
          <p className="text-gray-700">
            At PSW Support Finder, we’re dedicated to connecting those in need with qualified personal support workers. 
            Our mission is to create a nurturing community where care is easily accessible and highly personalized.
          </p>
        </div>

        {/* Our Values Section */}
        <div className="bg-white rounded-lg shadow overflow-hidden p-6">
          <h2 className="flex items-center mb-3 text-2xl font-semibold text-green-600">
            <FaHandsHelping className="mr-2" /> Our Values
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Compassion: We lead with kindness in every interaction.</li>
            <li>Quality: We believe everyone deserves the highest standard of care.</li>
            <li>Integrity: We operate with honesty and transparency at all times.</li>
            {/* Add more values as needed */}
          </ul>
        </div>

        {/* Awards & Recognition */}
        <div className="bg-white rounded-lg shadow overflow-hidden p-6">
          <h2 className="flex items-center mb-3 text-2xl font-semibold text-green-600">
            <FaAward className="mr-2" /> Awards & Recognition
          </h2>
          <p className="text-gray-700">
            We’re proud to be recognized for our outstanding service and the positive impact we’ve had on so many lives. 
            {/* Add specific awards and recognitions here */}
          </p>
        </div>

          {/* Team Section */}
          <div className="bg-white rounded-lg shadow overflow-hidden p-6">
          <h2 className="flex items-center mb-3 text-2xl font-semibold text-green-600">
            <FaUserFriends className="mr-2" /> Meet Our Team
          </h2>
          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between border-b-2 py-2">
                <p className="text-lg font-medium">{member.name}</p>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
        {/* More sections such as "Meet the Team", "Our Story", etc., can be added here */}
      </div>
    </div>
  );
};
export default AboutPage;
