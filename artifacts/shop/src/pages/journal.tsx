import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";
import { articles, tagColors } from "@/data/article";

export default function Journal() {
  const [featured, ...rest] = articles;

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
        <Link href={`/journal/${featured.slug}`}>
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
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${tagColors[featured.tag]}`}>
                  {featured.tag}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {featured.readTime} read
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 leading-tight group-hover:text-primary transition-colors">
                {featured.title}
              </h2>
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
        </Link>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((post, i) => (
            <Link key={post.slug} href={`/journal/${post.slug}`}>
              <motion.article
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
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tagColors[post.tag]}`}>
                    {post.tag}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
                <h3 className="font-bold text-lg leading-snug mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{post.author}</span> · {post.date}
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}