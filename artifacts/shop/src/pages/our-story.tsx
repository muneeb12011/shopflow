import { Layout } from "@/components/layout";
import { motion } from "framer-motion";

const timeline = [
  { year: "2018", title: "The Idea", desc: "Founded in a small Copenhagen apartment by two designers who believed everyday objects deserved to be extraordinary." },
  { year: "2019", title: "First Collection", desc: "Our debut furniture line sold out in 48 hours. We knew we were onto something real." },
  { year: "2020", title: "Going Digital", desc: "Launched ShopFlow to bring our curated world to homes everywhere, shipping to 40+ countries." },
  { year: "2022", title: "Lighting Studio", desc: "Opened our dedicated lighting design studio in Malmö — bringing sculptural light to the forefront." },
  { year: "2024", title: "Today", desc: "Over 12,000 happy homes, 7 collections, and a team of 48 obsessed designers and makers." },
];

const values = [
  { title: "Intentional Design", desc: "Every piece we carry earns its place. We reject fast furniture and fast fashion in equal measure." },
  { title: "Lasting Materials", desc: "Solid wood, natural stone, hand-blown glass. We believe beauty deepens with age, not diminishes." },
  { title: "Fair Making", desc: "We work with ateliers and studios who pay fair wages, use sustainable sourcing, and care about craft." },
  { title: "Fewer, Better Things", desc: "We edit ruthlessly so you don't have to. Quality over quantity, always." },
];

export default function OurStory() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-32 bg-primary text-primary-foreground overflow-hidden">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -right-32 -top-32 w-[500px] h-[500px] rounded-full border border-white/10"
        />
        <motion.div
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -left-20 -bottom-20 w-[300px] h-[300px] rounded-full border border-white/10"
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">About ShopFlow</p>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
              Our Story
            </h1>
            <p className="text-xl text-white/75 leading-relaxed max-w-xl">
              We started with one belief: that your home should be filled only with things you truly love. Everything else is noise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-28 container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-4">Our Mission</p>
            <h2 className="text-4xl font-serif font-bold mb-6 leading-tight">Designing for the long run</h2>
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              ShopFlow is a curated marketplace for objects that matter. We travel the world to find studios and ateliers where people make things with their hands, their hearts, and decades of accumulated knowledge.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              We believe in buying less, but buying better. In choosing the chair that becomes an heirloom over the one you replace in three years.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2 aspect-[4/5] rounded-3xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"
              alt="Our studio"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-sidebar border-y border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">What we stand for</p>
            <h2 className="text-4xl font-serif font-bold">Our Values</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-background rounded-2xl p-6 border border-border shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary font-serif font-bold text-lg">
                  {i + 1}
                </div>
                <h3 className="font-bold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-28 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">How we got here</p>
          <h2 className="text-4xl font-serif font-bold">Our Journey</h2>
        </motion.div>

        <div className="max-w-2xl mx-auto relative">
          <div className="absolute left-[72px] top-0 bottom-0 w-px bg-border" />
          <div className="space-y-10">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-8 relative"
              >
                <div className="flex-shrink-0 w-16 text-right">
                  <span className="text-sm font-bold text-primary">{item.year}</span>
                </div>
                <div className="relative flex-shrink-0 mt-1">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2, type: "spring" }}
                    className="w-3 h-3 rounded-full bg-primary border-2 border-background shadow-md"
                  />
                </div>
                <div className="flex-1 pb-2">
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team photo */}
      <section className="py-0 mb-28 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden aspect-[21/9] relative"
        >
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400"
            alt="ShopFlow team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-10 left-10 text-white">
            <p className="text-xs font-bold uppercase tracking-widest mb-2 text-white/70">Copenhagen, 2024</p>
            <h3 className="text-3xl font-serif font-bold">The ShopFlow Team</h3>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
