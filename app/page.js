"use client";
export default function Home() {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/bglanding.jpg')" }}>
      <div className="flex h-full w-full items-center justify-center bg-black bg-opacity-50">
        <div className="text-white text-4xl font-bold text-center pb-6">
            Connecting Care, Creating Community
            <div className="text-white text-2xl pt-4">
            <p className="font-semibold">Discover Seamless Care Solutions:</p>
            <p className="font-light">Find Verified PSWs: Connect with top-tier Personal Support Workers.</p>
            <p className="font-light">Tailored Assistance: Access personalized care plans.</p>
            <p className="font-light">Reliable Support: Rely on seamless communication and coordination.</p>
            <p className="font-semibold">Empowering PSWs:</p>
            <p className="font-light">Rewarding Opportunities: Explore fulfilling job opportunities.</p>
            <p className="font-light">Professional Growth: Access resources to enhance your skills.</p>
            <p className="font-light">Secure Platform: Trust in our privacy-focused environment.</p>
            Join PSW Support today for care and career satisfaction.
          </div>
        </div>
        
      </div>
    </div>
  );
}
