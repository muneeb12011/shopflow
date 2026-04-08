export interface Article {
  slug: string;
  tag: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  authorRole: string;
  content: Section[];
}

interface Section {
  type: "paragraph" | "heading" | "quote" | "image";
  text?: string;
  src?: string;
  caption?: string;
}

export const articles: Article[] = [
  {
    slug: "art-of-slow-living",
    tag: "Design",
    readTime: "5 min",
    title: "The Art of Slow Living: Why Your Home Deserves More Thought",
    excerpt:
      "In a world of one-click delivery and disposable décor, we make the case for slowing down and choosing with intention.",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=1200",
    date: "March 28, 2025",
    author: "Muneeb",
    authorRole: "Creative Director",
    content: [
      {
        type: "paragraph",
        text: "There's a particular kind of exhaustion that comes from living in a space that doesn't feel like yours. You walk through the door and nothing settles. The furniture is fine. The colours are neutral. It all functions. And yet — something is absent.",
      },
      {
        type: "paragraph",
        text: "We've normalised this feeling. In the era of flat-pack everything and next-day delivery, the home has become a series of transactions rather than a series of decisions. We buy because we need, not because we love. We fill rooms because they're empty, not because we've found the right thing.",
      },
      {
        type: "heading",
        text: "The hidden cost of convenience",
      },
      {
        type: "paragraph",
        text: "Fast furniture is one of the defining aesthetics of our time — and not in the way anyone intended. Walk through any rental apartment in any European city and you'll find the same flat-pack shelves, the same grey linen sofas, the same pendant lights sourced from the same three websites. The individual has been optimised out of the equation.",
      },
      {
        type: "quote",
        text: "A home that was assembled in a weekend will feel like it was assembled in a weekend, regardless of how much it cost.",
      },
      {
        type: "paragraph",
        text: "Slow living in interiors isn't a trend — it's a recalibration. It means waiting for the dining table that suits you rather than buying the one that's available. It means living with an empty corner until you find the object that deserves to fill it. It means letting the room tell you what it needs, rather than rushing to answer before it's finished speaking.",
      },
      {
        type: "heading",
        text: "How to start slowing down",
      },
      {
        type: "paragraph",
        text: "Begin with subtraction. Walk through your home and identify the pieces that are merely functional — the ones you'd never choose again if you were starting fresh. Remove them, one at a time, or simply stop replacing them when they eventually give out.",
      },
      {
        type: "paragraph",
        text: "Then give yourself permission to leave things empty. An empty wall is not a problem to solve. It's an invitation. The right piece will reveal itself — in a market, in a friend's studio, in a city you visit on holiday. The waiting is part of the process.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=1200",
        caption: "A considered corner — only what belongs.",
      },
      {
        type: "paragraph",
        text: "Finally, buy for longevity, not for now. Ask yourself whether you can imagine the piece in your home in twenty years. If the answer is no — if it's already a compromise — it's probably not worth the floor space.",
      },
      {
        type: "paragraph",
        text: "Your home is the most intimate space you occupy. It deserves more than one click.",
      },
    ],
  },
  {
    slug: "light-and-mood",
    tag: "Lighting",
    readTime: "4 min",
    title: "How Light Changes Everything: A Room-by-Room Guide",
    excerpt:
      "The right light source doesn't just illuminate a space — it transforms how you feel inside it. Our design director explains.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200",
    date: "March 14, 2025",
    author: "Muneeb",
    authorRole: "Head of Product Design",
    content: [
      {
        type: "paragraph",
        text: "Light is the most underestimated variable in interior design. People spend months selecting the right sofa, the right rug, the right tiles — and then illuminate the entire effort with a single overhead bulb that makes everything look like a waiting room.",
      },
      {
        type: "paragraph",
        text: "Lighting is not just functional. It determines the emotional temperature of a room. The same space can feel clinical or cosy, expansive or intimate, energising or restful — purely depending on where the light comes from and what colour temperature it sits at.",
      },
      {
        type: "heading",
        text: "The kitchen: task and atmosphere, layered",
      },
      {
        type: "paragraph",
        text: "Most kitchens are over-lit. The instinct to flood the room with bright overhead light makes sense practically — you're cutting vegetables, reading recipes, checking colours. But the kitchen is also where people gather, drink wine, talk at the end of the day. A single overhead source makes all of this feel harsh.",
      },
      {
        type: "paragraph",
        text: "The answer is layering. Keep your task lighting — under-cabinet strips, a pendant over the island — but add a secondary source at lower level. A small lamp on the counter, a warm glow beneath open shelving. When cooking is done, switch off the overheads entirely.",
      },
      {
        type: "quote",
        text: "No room should rely on a single source of light. That's not a lighting scheme — that's a switch.",
      },
      {
        type: "heading",
        text: "The bedroom: go warmer than you think",
      },
      {
        type: "paragraph",
        text: "The science here is clear: blue-toned light suppresses melatonin and disrupts sleep. Your bedroom lighting should be warm — 2700K or below — and controllable. A dimmer switch is not a luxury; it's the most impactful single upgrade you can make to a bedroom.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200",
        caption: "Warm, low light in the bedroom — the simplest sleep upgrade.",
      },
      {
        type: "paragraph",
        text: "Bedside reading lights should be directional — they light the page, not the ceiling. Wall-mounted sconces work better than table lamps here: they free up surface space and position the light exactly where it's needed.",
      },
      {
        type: "heading",
        text: "The living room: think in zones",
      },
      {
        type: "paragraph",
        text: "The living room is the space most abused by overhead lighting. Think instead in zones: a floor lamp beside the reading chair, a table lamp on the console, a small light inside a bookcase. Each zone becomes its own world. You can illuminate one or all of them depending on the moment.",
      },
      {
        type: "paragraph",
        text: "The goal is a room that never needs its main light on after dark. If you achieve that, you've understood lighting.",
      },
    ],
  },
  {
    slug: "wood-grains-matter",
    tag: "Furniture",
    readTime: "6 min",
    title: "Why Wood Grain Matters More Than You Think",
    excerpt:
      "From white oak to walnut — the grain of your furniture tells a story. Here's how to read it and why it affects durability.",
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=1200",
    date: "February 22, 2025",
    author: "Muneeb",
    authorRole: "Material Specialist",
    content: [
      {
        type: "paragraph",
        text: "Walk into any furniture showroom and you'll hear the same language: 'solid wood', 'natural grain', 'hand-finished'. These words have become so routine that we've stopped examining what they mean. But grain, specifically, is worth understanding — because it tells you everything about how a piece of wood will perform, how it will age, and whether it belongs in the room you're designing.",
      },
      {
        type: "heading",
        text: "What grain actually is",
      },
      {
        type: "paragraph",
        text: "Grain refers to the pattern created by the growth rings of a tree, exposed when the wood is cut. How you cut it changes everything. A flat-sawn board produces the wavy cathedral pattern most people associate with 'wood'. A quarter-sawn board — cut perpendicular to the growth rings — produces tight, straight lines that are both more stable and, to many eyes, more refined.",
      },
      {
        type: "quote",
        text: "The grain of a piece of furniture is its biography. Learn to read it and you'll know exactly what you're buying.",
      },
      {
        type: "heading",
        text: "White oak: the craftsman's choice",
      },
      {
        type: "paragraph",
        text: "White oak has become the defining wood of considered contemporary furniture for good reason. Quarter-sawn white oak, in particular, displays a medullary ray figure — a subtle, silky fleck that catches light differently depending on the angle. It's a wood that rewards attention.",
      },
      {
        type: "paragraph",
        text: "Beyond aesthetics, white oak is exceptionally stable. It resists warping and movement, making it well-suited to the varied humidity of a domestic environment. It's hard enough to resist denting, soft enough to work with hand tools. It takes oil finishes beautifully, developing a warmth over years of use.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
        caption: "Quarter-sawn white oak — the medullary ray figure catches light at every angle.",
      },
      {
        type: "heading",
        text: "Walnut: richness that deepens with age",
      },
      {
        type: "paragraph",
        text: "American black walnut is furniture's luxury wood — rich, dark, and characterful in a way that no stain applied to a lighter timber can replicate. The heartwood ranges from chocolate brown to a deep purple-grey, often with streaks of lighter sapwood that craftsmen increasingly incorporate rather than discard.",
      },
      {
        type: "paragraph",
        text: "One important caveat: walnut lightens with exposure to sunlight, while most other woods darken. A walnut table that arrives almost black will, within a year of life near a window, settle into a warm, honeyed brown. This is not a flaw. It is walnut doing what walnut does.",
      },
      {
        type: "heading",
        text: "How to assess grain in a showroom",
      },
      {
        type: "paragraph",
        text: "Crouch down and look along the surface at an oblique angle. You're looking for consistency of grain direction — if the lines wave and change direction significantly, the board is more prone to movement. Check whether the grain runs continuously from one end to the other, or whether it's been composed of smaller pieces. Neither is wrong, but you should know which you're buying.",
      },
      {
        type: "paragraph",
        text: "Run your hand across the surface. A well-prepared piece of solid wood feels fundamentally different from veneer over MDF — there is a warmth and slight give beneath the surface. Trust your hands as much as your eyes.",
      },
    ],
  },
  {
    slug: "minimal-is-not-cold",
    tag: "Interior",
    readTime: "3 min",
    title: "Minimal Doesn't Mean Cold: Adding Warmth to a Pared-Back Home",
    excerpt:
      "The minimalist aesthetic has a reputation for being sterile. Here's how to keep the calm while adding genuine warmth.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200",
    date: "February 10, 2025",
    author: "Muneeb",
    authorRole: "Creative Director",
    content: [
      {
        type: "paragraph",
        text: "Minimalism has a PR problem. The word conjures white rooms, hard edges, and the nagging sense that if you sit down, you'll leave a mark that wasn't there before. This is not minimalism — it's austerity. And it's what happens when the reduction of objects isn't accompanied by an increase in quality and texture.",
      },
      {
        type: "paragraph",
        text: "True minimalism isn't about emptiness. It's about intentionality. Every object that remains in a pared-back room carries more visual weight, which means it must earn its place. The warmth in a minimal room comes from the quality of what's been kept, not what's been removed.",
      },
      {
        type: "heading",
        text: "Texture is warmth",
      },
      {
        type: "paragraph",
        text: "In a room without clutter, texture becomes your primary decorative language. A linen throw on a concrete-coloured sofa. A wool rug on pale oak floors. A rough-hewn ceramic bowl on a smooth marble surface. These are not decorations — they are the room speaking. The contrast of materials creates a tactile richness that a room full of objects often lacks.",
      },
      {
        type: "quote",
        text: "Warmth in an interior isn't a quality of colour or quantity. It's a quality of material and light.",
      },
      {
        type: "heading",
        text: "Organic forms soften geometry",
      },
      {
        type: "paragraph",
        text: "The coldness in many minimal interiors comes from an excess of right angles. Everything aligns, everything is flush, and the room feels like a diagram of itself. The remedy is organic form — shapes that don't resolve into straight lines. A curved sofa. A vessel with an uneven lip. A branch placed in a tall vase.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200",
        caption: "Organic forms against minimal geometry — warmth without accumulation.",
      },
      {
        type: "paragraph",
        text: "These elements don't clutter the room because they're not trying to add information. They're changing the register — from architectural precision to human imperfection. That shift is what warmth actually feels like.",
      },
      {
        type: "heading",
        text: "One personal object per room",
      },
      {
        type: "paragraph",
        text: "The most reliably warm rooms have one thing that's clearly personal — something that couldn't have been curated by a hotel or a showroom. A stack of books that reveals something about who lives there. A piece of art bought at a market rather than selected from a catalogue. An object that has a story, visible only to those who know to ask.",
      },
      {
        type: "paragraph",
        text: "This isn't about display. It's about evidence of habitation. The most beautiful minimal rooms feel lived in — quietly, carefully, but genuinely.",
      },
    ],
  },
  {
    slug: "scent-of-home",
    tag: "Lifestyle",
    readTime: "4 min",
    title: "The Scent of Home: How Fragrance Completes an Interior",
    excerpt:
      "Your home has a signature smell — whether you've designed it or not. Here's how to make it intentional.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200",
    date: "January 30, 2025",
    author: "Muneeb",
    authorRole: "Lifestyle Editor",
    content: [
      {
        type: "paragraph",
        text: "We design for sight. We consider texture and material. We agonise over colour and form. And then we come home to a space that smells of last night's cooking, or of nothing at all — which is its own kind of statement.",
      },
      {
        type: "paragraph",
        text: "Scent is the sense most directly linked to memory and emotion. It bypasses the analytical mind and lands somewhere older, faster, more immediate. A home that smells considered doesn't just feel pleasant — it feels coherent. It completes the sensory picture that the rest of the design has been building.",
      },
      {
        type: "heading",
        text: "Start with neutralisation",
      },
      {
        type: "paragraph",
        text: "Before you add fragrance, address what's already there. Cooking smells, pet smells, the faint mustiness of a room that doesn't get enough air — these can't be masked by even the most beautiful candle. Good ventilation, activated charcoal in problem areas, and regular airing of soft furnishings are the unglamorous foundations of a home that smells good.",
      },
      {
        type: "quote",
        text: "Fragrance layered over odour is not scent design. It's concealment — and the concealment always fails eventually.",
      },
      {
        type: "heading",
        text: "Choosing a scent signature",
      },
      {
        type: "paragraph",
        text: "The goal is a signature — a scent, or a family of scents, that is consistently present and becomes associated with your home. This doesn't mean everything must match, but it does mean avoiding jarring contrasts. A home that rotates between bergamot, patchouli, and synthetic vanilla is a home with no olfactory identity.",
      },
      {
        type: "paragraph",
        text: "Consider the visual character of your interior and work from there. Pale, light-filled spaces tend to suit fresh, green, or aquatic accords. Darker, warmer rooms carry wood, resin, and amber beautifully. Coastal spaces invite salt, driftwood, and white florals. Let the visual logic guide the olfactory one.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1543727771-d88cc10f0c1a?w=1200",
        caption: "A considered scent object — functional and beautiful.",
      },
      {
        type: "heading",
        text: "Format matters",
      },
      {
        type: "paragraph",
        text: "Candles are the most popular format, but they're not always the best. They work brilliantly in enclosed spaces — a bathroom, a hallway — where the scent can concentrate. In large open-plan rooms, they can burn undetected.",
      },
      {
        type: "paragraph",
        text: "Reed diffusers are better for consistent, background presence in larger spaces. Room sprays are for moments — the thirty seconds before guests arrive. Linen sprays on bedding are one of the most underrated domestic pleasures and require almost no effort.",
      },
      {
        type: "paragraph",
        text: "The best-smelling homes use all of these, thoughtfully, in concert. Not competing — composing.",
      },
    ],
  },
  {
    slug: "ceramics-revival",
    tag: "Objects",
    readTime: "5 min",
    title: "The Ceramics Revival: Why Handmade Is Having Its Moment",
    excerpt:
      "Mass production gave us convenience. But something was lost. A new generation of potters is bringing it back.",
    image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=1200",
    date: "January 12, 2025",
    author: "Muneeb",
    authorRole: "Head of Product Design",
    content: [
      {
        type: "paragraph",
        text: "Something is happening in kitchens and on dining tables across Europe and beyond. The perfectly uniform white plate — the one that has served every type of cuisine and every category of restaurant without complaint for thirty years — is being quietly displaced. In its place: something thicker, less symmetrical, glazed in a colour that changes slightly depending on where the light falls.",
      },
      {
        type: "paragraph",
        text: "The ceramics revival is real, and it's being driven by a hunger for objects that contain evidence of the person who made them. In a world of frictionless manufacturing, the slight wobble of a hand-thrown bowl has become genuinely rare. And rareness, as always, creates value.",
      },
      {
        type: "heading",
        text: "What happened to handmade",
      },
      {
        type: "paragraph",
        text: "Industrial ceramics achieved something remarkable: consistent, affordable, durable tableware available to everyone. This was not a trivial accomplishment. But the logic of consistency, taken to its conclusion, produces objects with no character — things that serve their function without communicating anything beyond it.",
      },
      {
        type: "quote",
        text: "A handmade object is evidence of a decision. Every mark on its surface was put there by someone, on purpose or by accident. Either way, it's a record.",
      },
      {
        type: "heading",
        text: "The new generation of makers",
      },
      {
        type: "paragraph",
        text: "The potters leading this revival don't fit a single profile. Some trained formally in ceramic arts programmes; others came to clay from architecture, product design, or entirely unrelated careers. What they share is a willingness to let the material speak — to work with the idiosyncrasies of clay and glaze chemistry rather than against them.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200",
        caption: "A studio potter at work — the mark of the hand is the point.",
      },
      {
        type: "paragraph",
        text: "Glaze, in particular, has become a creative frontier. The interaction between mineral oxides and kiln heat produces results that can be directed but never entirely controlled. Two bowls from the same batch will emerge slightly differently. This is not a defect to be engineered away — it is the condition that makes each piece singular.",
      },
      {
        type: "heading",
        text: "How to live with ceramics",
      },
      {
        type: "paragraph",
        text: "The best thing you can do with a handmade ceramic object is use it. The fear of damaging something beautiful leads people to display their pieces rather than use them — a kind of protective instinct that misunderstands what these objects are for.",
      },
      {
        type: "paragraph",
        text: "A hand-thrown mug used daily for ten years develops a patina. The glaze softens slightly where it meets lips and hands. The surface tells the story of every morning it has accompanied. This is not damage — it is accumulation. It is the object becoming more itself over time.",
      },
      {
        type: "paragraph",
        text: "Buy the mug. Use it. Let it age. That is the entire point.",
      },
    ],
  },
];

export const tagColors: Record<string, string> = {
  Design: "bg-primary/10 text-primary",
  Lighting: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  Furniture: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  Interior: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  Lifestyle: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  Objects: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
};