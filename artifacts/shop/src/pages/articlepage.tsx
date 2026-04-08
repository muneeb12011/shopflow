import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { articles, tagColors } from "@/data/article";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  // Related articles (excluding current)
  const related = articles.filter((a) => a.slug !== slug).slice(0, 3);

  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Article not found</h1>
          <p className="text-muted-foreground mb-8">This article doesn't exist or has been removed.</p>
          <Link href="/journal">
            <span className="inline-flex items-center gap-2 text-primary font-semibold cursor-pointer hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to Journal
            </span>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <motion.img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-0 right-0 container mx-auto px-4">
          <Link href="/journal">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white cursor-pointer transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Journal
            </motion.span>
          </Link>
        </div>

        {/* Title area at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${tagColors[article.tag]}`}>
                {article.tag}
              </span>
              <span className="text-xs text-white/70 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {article.readTime} read
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight max-w-3xl">
              {article.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Article meta */}
      <div className="border-b border-border bg-sidebar">
        <div className="container mx-auto px-4 py-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-medium text-foreground">{article.author}</span>
              <span className="text-muted-foreground">· {article.authorRole}</span>
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {article.date}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Article body */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Excerpt / lead */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-muted-foreground leading-relaxed mb-10 font-serif italic border-l-4 border-primary/30 pl-6"
          >
            {article.excerpt}
          </motion.p>

          {/* Content sections */}
          {article.content.map((section, i) => {
            const delay = 0.35 + i * 0.04;

            if (section.type === "paragraph") {
              return (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: delay > 0.8 ? 0 : delay }}
                  className="text-base md:text-lg leading-relaxed text-foreground mb-6"
                >
                  {section.text}
                </motion.p>
              );
            }

            if (section.type === "heading") {
              return (
                <motion.h2
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0 }}
                  className="text-2xl md:text-3xl font-serif font-bold mt-12 mb-5 text-foreground"
                >
                  {section.text}
                </motion.h2>
              );
            }

            if (section.type === "quote") {
              return (
                <motion.blockquote
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0 }}
                  className="my-10 pl-8 border-l-4 border-primary"
                >
                  <p className="text-xl md:text-2xl font-serif italic text-foreground leading-snug">
                    "{section.text}"
                  </p>
                </motion.blockquote>
              );
            }

            if (section.type === "image") {
              return (
                <motion.figure
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0 }}
                  className="my-12 -mx-4 md:-mx-16"
                >
                  <div className="aspect-[16/9] rounded-2xl overflow-hidden">
                    <img
                      src={section.src}
                      alt={section.caption}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {section.caption && (
                    <figcaption className="mt-3 text-sm text-muted-foreground text-center italic px-4">
                      {section.caption}
                    </figcaption>
                  )}
                </motion.figure>
              );
            }

            return null;
          })}
        </div>

        {/* Divider */}
        <div className="max-w-2xl mx-auto mt-16 mb-16 border-t border-border" />

        {/* Author card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-sidebar border border-border rounded-2xl p-6 flex items-start gap-5 mb-20"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
            {article.author
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="font-semibold text-foreground">{article.author}</p>
            <p className="text-sm text-muted-foreground mb-2">{article.authorRole}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A contributor to The Journal with a focus on considered living, material culture, and the spaces between design and everyday life.
            </p>
          </div>
        </motion.div>

        {/* Related articles */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-serif font-bold mb-8">More from the Journal</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((post, i) => (
              <Link key={post.slug} href={`/journal/${post.slug}`}>
                <motion.article
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tagColors[post.tag]}`}>
                      {post.tag}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-base leading-snug mb-1 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{post.author}</span> · {post.date}
                  </p>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}