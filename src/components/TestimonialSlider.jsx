import { useState } from "react";
import { FaQuoteLeft, FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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
    position: "User - MS Family App",
    message: "Had a great experience using the MS Family management application. It has made tracking family schedules, coordinating information, and organizing daily tasks incredibly simple and stress-free. Highly recommended utility!",
  }
];

const TestimonialSlider = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    const form = e.target;
    const name = form.name.value;
    const link = form.link.value;
    const message = form.message.value;

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, link, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Thank you! Your review has been sent to my email successfully.",
        });
        form.reset();
        setTimeout(() => {
          setIsOpen(false);
          setStatus({ type: "", message: "" });
        }, 3000);
      } else {
        throw new Error(data.message || "Failed to submit review.");
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "An error occurred. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

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

      {/* Give Review Button */}
      <div className="flex justify-center mt-6">
        <motion.button
          onClick={() => {
            setIsOpen(true);
            setStatus({ type: "", message: "" });
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest text-white border border-accent/40 bg-accent/10 hover:bg-accent/25 transition-all duration-300 shadow-[0_0_15px_rgba(241,48,36,0.15)] hover:shadow-[0_0_25px_rgba(241,48,36,0.3)]"
        >
          <span>Give Review</span>
        </motion.button>
      </div>

      {/* Dialog Box Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!submitting) setIsOpen(false);
              }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1e1f38] to-[#131424] border border-white/10 shadow-2xl z-10 overflow-hidden text-left"
            >
              {/* Subtle top edge glow */}
              <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent" />

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-white">Submit a Review</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  disabled={submitting}
                  className="text-white/40 hover:text-white disabled:opacity-30 transition-colors duration-200 text-lg"
                >
                  &times;
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/40">Name *</label>
                  <input
                    type="text"
                    required
                    name="name"
                    disabled={submitting}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-accent/50 focus:bg-accent/5 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>

                {/* Optional Link */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/40">Link (Optional)</label>
                  <input
                    type="url"
                    name="link"
                    disabled={submitting}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-accent/50 focus:bg-accent/5 transition-all duration-300"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/40">Review *</label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    disabled={submitting}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-accent/50 focus:bg-accent/5 transition-all duration-300 resize-none"
                    placeholder="Write your experience here..."
                  />
                </div>

                {/* Status Message */}
                {status.message && (
                  <div
                    className={`p-3 rounded-xl text-xs font-semibold ${
                      status.type === "success"
                        ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                        : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold uppercase tracking-wider text-xs text-white bg-accent hover:bg-accent/90 disabled:bg-accent/40 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_4px_16px_rgba(241,48,36,0.35)]"
                >
                  {submitting ? "Submitting..." : "Send Review"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TestimonialSlider;
