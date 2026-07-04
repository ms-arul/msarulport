import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaQuoteLeft } from "react-icons/fa";

const ReviewPage = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleBack = () => {
    navigate(-1);
  };

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
          message: "Thank you! Your review has been sent successfully.",
        });
        form.reset();
        setTimeout(() => {
          navigate(-1);
        }, 2500);
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
    <div className="min-h-screen flex items-center justify-center px-4 py-24 lg:py-32 relative overflow-hidden">
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #F13024 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-[15%] right-[10%] w-[300px] h-[300px] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, #A78BFA 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-lg z-10"
      >
        {/* Back Button */}
        <motion.button
          onClick={handleBack}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 mb-8 text-sm font-semibold text-white/50 hover:text-white transition-colors duration-300 group"
        >
          <FaArrowLeft className="text-xs group-hover:text-accent transition-colors duration-300" />
          <span>Back to Testimonials</span>
        </motion.button>

        {/* Card */}
        <div className="relative p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] overflow-hidden">
          {/* Top edge glow */}
          <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent" />

          {/* Header */}
          <div className="mb-8">
            <FaQuoteLeft className="text-3xl text-accent/25 mb-4" />
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">
              Share Your <span className="text-accent">Experience</span>
            </h1>
            <p className="text-sm text-white/40 font-light">
              Your feedback means the world. Let others know how it was working together.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-white/40">
                Name *
              </label>
              <input
                type="text"
                required
                name="name"
                disabled={submitting}
                className="px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-accent/50 focus:bg-accent/5 transition-all duration-300 placeholder:text-white/20"
                placeholder="John Doe"
              />
            </div>

            {/* Optional Link */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-white/40">
                Link <span className="normal-case tracking-normal text-white/25">(Optional)</span>
              </label>
              <input
                type="url"
                name="link"
                disabled={submitting}
                className="px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-accent/50 focus:bg-accent/5 transition-all duration-300 placeholder:text-white/20"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-white/40">
                Review *
              </label>
              <textarea
                required
                name="message"
                rows={5}
                disabled={submitting}
                className="px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-accent/50 focus:bg-accent/5 transition-all duration-300 resize-none placeholder:text-white/20"
                placeholder="Write your experience here..."
              />
            </div>

            {/* Status Message */}
            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl text-sm font-semibold ${
                  status.type === "success"
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                    : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
                }`}
              >
                {status.message}
              </motion.div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-1 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs text-white bg-accent hover:bg-accent/90 disabled:bg-accent/40 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_4px_20px_rgba(241,48,36,0.3)] hover:shadow-[0_4px_30px_rgba(241,48,36,0.45)]"
            >
              {submitting ? "Submitting..." : "Send Review"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewPage;
