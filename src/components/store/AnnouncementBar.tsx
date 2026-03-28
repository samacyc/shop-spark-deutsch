const items = [
  "AKTION ENDET HEUTE NACHT! ✨",
  "67% RABATT",
  "NUR FÜR KURZE ZEIT!",
];

const AnnouncementBar = () => {
  return (
    <div className="bg-announcement text-announcement-foreground py-2 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap gap-8" style={{ width: "200%" }}>
        {[...items, ...items, ...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="text-sm font-bold flex items-center gap-2 uppercase tracking-wider">
            {item}
            <span className="text-announcement-foreground/40">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;