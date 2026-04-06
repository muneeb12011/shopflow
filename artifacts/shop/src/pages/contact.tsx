import { Layout } from "@/components/layout";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, MessageSquare, Package, HelpCircle, Building2, Send, CheckCircle } from "lucide-react";
import { useState } from "react";

const topics = [
  { icon: Package, label: "Order & Shipping" },
  { icon: MessageSquare, label: "Product Question" },
  { icon: Building2, label: "Trade & Wholesale" },
  { icon: HelpCircle, label: "Something else" },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email us",
    value: "muneeb.fullstack.dev46@gmail.com",
    link: "mailto:muneeb.fullstack.dev46@gmail.com",
    desc: "We reply within 24 hours",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+45 33 12 45 67",
    link: "tel:+4533124567",
    desc: "Mon–Fri, 9am–6pm CET",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: "Bredgade 24, Copenhagen",
    link: "#stores",
    desc: "Our flagship store",
  },
];

export default function Contact() {
  const [topic, setTopic] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build mailto link
    const subject = encodeURIComponent(`ShopFlow Contact: ${topic || "General Inquiry"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nTopic: ${topic || "General"}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:muneeb.fullstack.dev46@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-28 bg-sidebar border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold text-accent uppercase tracking-widest mb-4"
          >
            Get in touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-lg mx-auto text-lg"
          >
            A real person will read your message and get back to you — usually the same day.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Contact info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-serif font-bold mb-2">Let's talk</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Whether you have a question about a product, need help with an order, or want to discuss a trade account — we're here.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.link}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-4 p-4 rounded-2xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group block"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground break-all">{item.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="bg-sidebar border border-border rounded-2xl p-5">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Response time</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-sm font-medium">Usually within a few hours</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center h-full min-h-[400px] bg-sidebar border border-border rounded-3xl p-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                    className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl font-serif font-bold mb-3">Message sent!</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Your email client should have opened. We'll get back to you at{" "}
                    <span className="font-semibold text-foreground">{form.email || "your email"}</span> soon.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); setTopic(null); }}
                    className="mt-8 text-sm font-semibold text-primary hover:text-accent transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Topic selector */}
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-3">
                      What can we help with?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {topics.map((t) => (
                        <motion.button
                          type="button"
                          key={t.label}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setTopic(t.label)}
                          className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all text-sm font-medium ${
                            topic === t.label
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border hover:border-primary/30 text-foreground/70"
                          }`}
                        >
                          <t.icon className="w-4 h-4 flex-shrink-0" />
                          {t.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                        Your name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Jane Smith"
                        className="w-full bg-secondary/50 border border-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                        Email address
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="jane@example.com"
                        className="w-full bg-secondary/50 border border-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                      Your message
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tell us how we can help..."
                      className="w-full bg-secondary/50 border border-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 hover:shadow-xl"
                  >
                    Send Message <Send className="w-4 h-4" />
                  </motion.button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting you agree to our privacy policy. We never share your data.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
