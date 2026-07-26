import React from "react";
import {
  Zap,
  Package,
  Users,
  Star,
  Truck,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  Target,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  const navigate = useNavigate();

  const stats = [
    {
      icon: <Package size={24} className="text-[#FF8FC7]" />,
      value: "20K+",
      label: "Products",
    },
    {
      icon: <Users size={24} className="text-[#FF8FC7]" />,
      value: "50K+",
      label: "Happy Customers",
    },
    {
      icon: <Star size={24} className="text-[#FF8FC7]" />,
      value: "4.9",
      label: "Average Rating",
    },
    {
      icon: <Truck size={24} className="text-[#FF8FC7]" />,
      value: "99%",
      label: "On-time Delivery",
    },
  ];

  const features = [
    {
      icon: <ShieldCheck size={22} />,
      title: "Trusted Products",
      desc: "Every product is quality checked before reaching our customers.",
    },
    {
      icon: <Truck size={22} />,
      title: "Fast Delivery",
      desc: "Lightning-fast shipping with real-time order tracking.",
    },
    {
      icon: <HeartHandshake size={22} />,
      title: "Customer First",
      desc: "Dedicated support that puts customers before everything else.",
    },
    {
      icon: <Star size={22} />,
      title: "Premium Quality",
      desc: "Curated products from trusted brands around the world.",
    },
  ];

  const team = [
    {
      name: "Aryan Shah",
      role: "Founder & CEO",
      color: "bg-lime-400",
    },
    {
      name: "Priya Mehta",
      role: "Head of Product",
      color: "bg-blue-500",
    },
    {
      name: "Sahana Kadrolli",
      role: "Lead Engineer",
      color: "bg-purple-500",
    },
    {
      name: "Alexa Jhon",
      role: "Design Director",
      color: "bg-pink-500",
    },
  ];

  return (
    <div className="min-h-screen text-white" style={{ background: "var(--bg)" }}>
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="neu w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto">
            <Zap size={32} className="text-[#FF8FC7] fill-[#FF8FC7]" />
          </div>

          <h1
            className="mt-6 md:mt-8 text-4xl sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "Clash Display" }}
          >
            About <span className="text-[#FF8FC7]">SkyMart</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-[#6C6C6B]">
            SkyMart is a next-generation e-commerce platform built to make
            online shopping faster, smarter, and more enjoyable. We carefully
            curate products that combine quality, affordability, and seamless
            delivery.
          </p>

          <button
            onClick={() => navigate("/shop")}
            className="neu-accent neu-btn mt-8 md:mt-10 h-12 md:h-14 px-6 md:px-8 rounded-2xl text-black font-semibold flex items-center gap-2 mx-auto"
          >
            Browse Products
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 md:mt-20">
          {stats.map((item, index) => (
            <div
              key={index}
              className="neu neu-btn rounded-2xl p-6 md:p-8 text-center transition-all"
            >
              <div className="flex justify-center">{item.icon}</div>

              <h2
                className="text-3xl md:text-4xl mt-5"
                style={{ fontFamily: "Clash Display" }}
              >
                {item.value}
              </h2>

              <p className="text-[#6C6C6B] mt-2">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="neu rounded-2xl p-6 md:p-10">
            <h2
              className="text-3xl md:text-4xl mb-6"
              style={{ fontFamily: "Clash Display" }}
            >
              Our Story
            </h2>

            <p className="text-[#6C6C6B] leading-7 md:leading-8">
              SkyMart began with a simple idea — online shopping should feel
              effortless. We wanted to remove clutter, confusing interfaces, and
              overpriced products, replacing them with a clean shopping
              experience focused on quality and speed.
            </p>
          </div>

          <div className="neu rounded-2xl p-6 md:p-10">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="neu-sm w-14 h-14 rounded-2xl flex items-center justify-center">
                <Target className="text-[#FF8FC7]" />
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold">
                  Our Mission
                </h3>

                <p className="text-[#6C6C6B] mt-2">
                  Deliver premium products at affordable prices.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="neu-sm w-14 h-14 rounded-2xl flex items-center justify-center">
                <Eye className="text-[#FF8FC7]" />
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold">
                  Our Vision
                </h3>

                <p className="text-[#6C6C6B] mt-2">
                  Become the most trusted online shopping destination.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 md:mt-24">
          <h2
            className="text-center text-3xl md:text-5xl"
            style={{ fontFamily: "Clash Display" }}
          >
            Why Choose SkyMart
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 md:mt-12">
            {features.map((item, index) => (
              <div
                key={index}
                className="neu rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-5 transition-all"
              >
                <div className="neu-sm w-14 h-14 rounded-2xl flex items-center justify-center text-[#FF8FC7] shrink-0">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>

                  <p className="text-[#6C6C6B] mt-3 leading-7">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mt-16 md:mt-24">
          <h2
            className="text-center text-3xl md:text-5xl"
            style={{ fontFamily: "Clash Display" }}
          >
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 md:mt-12">
            {team.map((member, index) => (
              <div
                key={index}
                className="neu neu-btn rounded-2xl p-6 md:p-8 text-center transition"
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${member.color} mx-auto flex items-center justify-center text-black text-2xl font-bold`}
                >
                  {member.name.charAt(0)}
                </div>

                <h3 className="mt-5 text-xl font-semibold">{member.name}</h3>

                <p className="text-[#6C6C6B] mt-2">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="neu mt-16 md:mt-24 rounded-2xl py-10 md:py-16 px-4 text-center">
          <h2
            className="text-3xl md:text-5xl"
            style={{ fontFamily: "Clash Display" }}
          >
            Ready to shop?
          </h2>

          <p className="text-[#6C6C6B] mt-5 text-base md:text-lg">
            Discover thousands of premium products at unbeatable prices.
          </p>

          <button
            onClick={() => navigate("/shop")}
            className="neu-accent neu-btn mt-8 h-12 md:h-14 px-6 md:px-8 rounded-2xl text-black font-semibold flex items-center gap-2 mx-auto"
          >
            Browse Products
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
