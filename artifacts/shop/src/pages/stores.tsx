import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";

const stores = [
  {
    city: "Copenhagen",
    country: "Denmark",
    address: "Bredgade 24, 1260 Copenhagen K",
    phone: "+45 33 12 45 67",
    hours: "Mon–Sat 10:00–19:00 · Sun 11:00–17:00",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    tag: "Flagship",
    description: "Our original showroom, where it all began. Four floors of curated furniture, lighting, and objects.",
  },
  {
    city: "Stockholm",
    country: "Sweden",
    address: "Biblioteksgatan 12, 114 46 Stockholm",
    phone: "+46 8 660 12 34",
    hours: "Mon–Fri 10:00–18:00 · Sat 10:00–17:00 · Sun Closed",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
    tag: "Studio",
    description: "A more intimate space focused on our Scandinavian furniture collection and bespoke commissions.",
  },
  {
    city: "Amsterdam",
    country: "Netherlands",
    address: "Keizersgracht 313, 1016 EE Amsterdam",
    phone: "+31 20 627 89 10",
    hours: "Mon–Sat 11:00–19:00 · Sun 12:00–17:00",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800",
    tag: "Gallery",
    description: "Set in a historic canal house, our Amsterdam gallery showcases lighting installations and art objects.",
  },
  {
    city: "London",
    country: "United Kingdom",
    address: "27 Chiltern Street, Marylebone W1U 7PA",
    phone: "+44 20 7935 6789",
    hours: "Mon–Sat 10:00–18:00 · Sun 11:00–16:00",
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800",
    tag: "Showroom",
    description: "Our London home in the heart of Marylebone, featuring the full ShopFlow range and seasonal installations.",
  },
];

const tagColors: Record<string, string> = {
  Flagship: "bg-primary text-primary-foreground",
  Studio: "bg-accent text-white",
  Gallery: "bg-foreground text-background",
  Showroom: "bg-secondary text-secondary-foreground border border-border",
};

export default function Stores() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-28 bg-sidebar border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold text-accent uppercase tracking-widest mb-4"
          >
            Find us in person
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-6"
          >
            Our Stores
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto text-lg"
          >
            Come and touch the materials, sit in the chairs, feel the quality. We'd love to meet you.
          </motion.p>
        </div>
      </section>

      {/* Stores */}
      <div className="container mx-auto px-4 py-20 space-y-8">
        {stores.map((store, i) => (
          <motion.div
            key={store.city}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image — alternates side */}
            <div className={`aspect-[4/3] md:aspect-auto overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}>
              <motion.img
                src={store.image}
                alt={store.city}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
              />
            </div>

            {/* Info */}
            <div className={`p-8 md:p-12 bg-background flex flex-col justify-center gap-6 ${i % 2 === 1 ? "md:order-1" : ""}`}>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${tagColors[store.tag]}`}>{store.tag}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{store.country}</span>
              </div>

              <div>
                <h2 className="text-3xl font-serif font-bold mb-3">{store.city}</h2>
                <p className="text-muted-foreground leading-relaxed">{store.description}</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                  <span>{store.address}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                  <span>{store.phone}</span>
                </div>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                  <span>{store.hours}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ x: 4 }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary self-start"
              >
                Get directions <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Book a visit CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 bg-primary text-primary-foreground text-center mx-4 mb-20 rounded-3xl relative overflow-hidden"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -right-20 -top-20 w-64 h-64 rounded-full border border-white/10"
        />
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4">Exclusive experience</p>
          <h2 className="text-4xl font-serif font-bold mb-4">Book a Private Viewing</h2>
          <p className="text-white/70 max-w-md mx-auto mb-8">
            Let one of our design consultants walk you through our showroom personally. By appointment only.
          </p>
          <motion.a
            href="mailto:muneeb.fullstack.dev46@gmail.com?subject=Private Viewing Request"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-white/95 transition-colors shadow-xl"
          >
            Request Appointment <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </motion.section>
    </Layout>
  );
}
