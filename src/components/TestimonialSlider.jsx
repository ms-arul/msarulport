import { FaQuoteLeft, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const testimonialData = [
  {
    image: "/testimonials/jagan.png",
    name: "Jagan",
    position: "Founder - XPOOL",
    message: "Working with Arul Prakash was an absolute game-changer for XPOOL. He designed and deployed our web platform with exceptional attention to detail, handling complex configurations, sleek animations, and responsive layouts seamlessly.",
  },
  {
    image: "/testimonials/abishek.png",
    name: "Abishek",
    position: "CTO - XPOOL",
    message: "Arul is a phenomenal developer. He took charge of developing our official Android application, delivering a high-performance client with clean architecture, smooth API integrations, and robust state management.",
  },
  {
    image: "/testimonials/nithya.png",
    name: "Nithya",
    position: "CSE student | influencer",
    message: "I've had the opportunity to see Arul Prakash's work closely, and I'm genuinely impressed by his dedication, creativity, and innovative mindset. Every project reflects clean coding practices, attention to detail, and a passion for building real-world solutions. His ability to solve problems and continuously improve his skills makes him stand out as a Full Stack Developer. I have no doubt he'll continue to deliver exceptional results in every project he takes on.",
  },
  {
    position: "User - MS Family App",
    message: "Had a great experience using the MS Family management application. It has made tracking family schedules, coordinating information, and organizing daily tasks incredibly simple and stress-free. Highly recommended utility!",
  }
];

const TestimonialSlider = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto mt-8 px-4 pb-8">
      {testimonialData.map((person, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
          className="relative flex flex-col md:flex-row items-center md:items-start gap-6 p-6 md:p-8 rounded-3xl text-left bg-white/[0.02] border border-white/[0.05] hover:border-accent/30 hover:bg-white/[0.03] transition-all duration-300 group overflow-hidden"
        >
          {/* Glow effect on hover */}
          <div className="absolute -inset-x-20 -inset-y-20 bg-accent/5 opacity-0 group-hover:opacity-100 blur-[80px] transition-opacity duration-500 pointer-events-none -z-10" />

          {/* Left side: Avatar + Details */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left min-w-[160px] gap-2">
            <div className="relative">
              {person.image ? (
                <img
                  src={person.image}
                  width="90"
                  height="90"
                  alt={person.name || "Client"}
                  className="rounded-full object-cover border-2 border-accent/30 w-[90px] h-[90px] group-hover:border-accent transition-all duration-300"
                />
              ) : (
                <div className="w-[90px] h-[90px] rounded-full border-2 border-dashed border-white/20 bg-white/[0.03] flex items-center justify-center text-white/40 group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-300">
                  <FaUser className="text-3xl" />
                </div>
              )}
              {/* subtle status/active dot */}
              <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-primary rounded-full animate-pulse" />
            </div>
            {person.name && (
              <div className="text-lg font-black text-white group-hover:text-accent transition-colors duration-300">
                {person.name}
              </div>
            )}
            <div className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors duration-300">
              {person.position || "Verified Client"}
            </div>
          </div>

          {/* Separator line for larger screens */}
          <div className="hidden md:block w-px self-stretch bg-white/10" />

          {/* Right side: Message */}
          <div className="flex-1 flex flex-col justify-start relative pt-2 md:pt-0">
            <FaQuoteLeft className="text-3xl text-accent/20 group-hover:text-accent/35 transition-colors duration-300 mb-3" aria-hidden />
            <p className="text-sm md:text-base text-white/70 font-light leading-relaxed group-hover:text-white/85 transition-colors duration-300">
              "{person.message}"
            </p>
          </div>
        </motion.div>
      ))}

      {/* Give Review Button — navigates to /review page */}
      <div className="flex justify-center mt-6">
        <motion.button
          onClick={() => navigate("/review")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest text-white border border-accent/40 bg-accent/10 hover:bg-accent/25 transition-all duration-300 shadow-[0_0_15px_rgba(241,48,36,0.15)] hover:shadow-[0_0_25px_rgba(241,48,36,0.3)] cursor-pointer"
        >
          Give Review
        </motion.button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
