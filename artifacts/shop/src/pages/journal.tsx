import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";

const posts = [
  {
    slug: "art-of-slow-living",
    tag: "Design",
    readTime: "5 min",
    title: "The Art of Slow Living: Why Your Home Deserves More Thought",
    excerpt: "In a world of one-click delivery and disposable décor, we make the case for slowing down and choosing with intention.",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800",
    date: "March 28, 2025",
    author: "Astrid Nilsson",
  },
  {
    slug: "light-and-mood",
    tag: "Lighting",
    readTime: "4 min",
    title: "How Light Changes Everything: A Room-by-Room Guide",
    excerpt: "The right light source doesn't just illuminate a space — it transforms how you feel inside it. Our design director explains.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
    date: "March 14, 2025",
    author: "Erik Larsen",
  },
  {
    slug: "wood-grains-matter",
    tag: "Furniture",
    readTime: "6 min",
    title: "Why Wood Grain Matters More Than You Think",
    excerpt: "From white oak to walnut — the grain of your furniture tells a story. Here's how to read it and why it affects durability.",
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800",
    date: "February 22, 2025",
    author: "Maja Karlsson",
  },
  {
    slug: "minimal-is-not-cold",
    tag: "Interior",
    readTime: "3 min",
    title: "Minimal Doesn't Mean Cold: Adding Warmth to a Pared-Back Home",
    excerpt: "The minimalist aesthetic has a reputation for being sterile. Here's how to keep the calm while adding genuine warmth.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
    date: "February 10, 2025",
    author: "Astrid Nilsson",
  },
  {
    slug: "scent-of-home",
    tag: "Lifestyle",
    readTime: "4 min",
    title: "The Scent of Home: How Fragrance Completes an Interior",
    excerpt: "Your home has a signature smell — whether you've designed it or not. Here's how to make it intentional.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800",
    date: "January 30, 2025",
    author: "Lena Berg",
  },
  {
    slug: "ceramics-revival",
    tag: "Objects",
    readTime: "5 min",
    title: "The Ceramics Revival: Why Handmade Is Having Its Moment",
    excerpt: "Mass production gave us convenience. But something was lost. A new generation of potters is bringing it back.",
    image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=800",
    date: "January 12, 2025",
    author: "Erik Larsen",
  },
];

const tagColors: Record<string, string> = {
  Design: "bg-primary/10 text-primary",
  Lighting: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  Furniture: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  Interior: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  Lifestyle: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  Objects: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
};

export default function Journal() {
  const [featured, ...rest] = posts;

  return (
    <Layout>
      {/* Header */}
      <section className="py-24 bg-sidebar border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold text-accent uppercase tracking-widest mb-4"
          >
            Ideas & Inspiration
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-6"
          >
            The Journal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto text-lg"
          >
            Stories, guides, and ideas from the world of considered living.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        {/* Featured post */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="group grid grid-cols-1 md:grid-cols-2 gap-10 mb-20 cursor-pointer"
        >
          <div className="aspect-[4/3] rounded-3xl overflow-hidden">
            <motion.img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${tagColors[featured.tag]}`}>{featured.tag}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" /> {featured.readTime} read
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 leading-tight group-hover:text-primary transition-colors">{featured.title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{featured.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{featured.author}</span> · {featured.date}
              </div>
              <motion.span
                whileHover={{ x: 4 }}
                className="flex items-center gap-2 text-sm font-semibold text-primary cursor-pointer"
              >
                Read article <ArrowRight className="w-4 h-4" />
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                <motion.img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tagColors[post.tag]}`}>{post.tag}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.readTime}
                </span>
              </div>
              <h3 className="font-bold text-lg leading-snug mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{post.author}</span> · {post.date}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
