export function LayoutCard() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-20">
      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        {cards.map((card) => (
          <button
            key={card.title}
            className="flex items-center justify-between rounded-2xl bg-white p-4 border border-neutral-200"
          >
            <div className="flex items-center gap-4">
              <img
                src={card.src}
                alt={card.title}
                className="rounded-lg aspect-square h-14"
              />

              <div className="flex flex-col items-start gap-2">

                <h2 className="text-xs font-bold text-gray-900">
                  {card.title}
                </h2>

                <p className="text-[10px] font-medium text-neutral-500">
                  {card.description}
                </p>

              </div>
            </div>

            <div className="px-2 py-1 bg-green-500 rounded-full text-white text-xs">
              {card.ctaText}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

type Card = {
  description: string;
  title: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: () => React.ReactNode;
};

const cards: Card[] = [
  {
    description: "Lana Del Rey",
    title: "Summertime Sadness",
    src: "/card.webp",
    ctaText: "Play",
    ctaLink: "https://open.spotify.com/",
    content: () => (
      <p className="max-w-md text-sm text-neutral-600">
        One of Lana Del Rey's most iconic songs, combining nostalgic lyrics with
        cinematic production.
      </p>
    ),
  },
  {
    description: "The Weeknd",
    title: "Blinding Lights",
    src: "/card.webp",
    ctaText: "Play",
    ctaLink: "https://open.spotify.com/",
    content: () => (
      <p className="max-w-md text-sm text-neutral-600">
        A global synth-pop phenomenon known for its infectious melody and retro
        production.
      </p>
    ),
  },
  {
    description: "Arctic Monkeys",
    title: "Do I Wanna Know?",
    src: "/card.webp",
    ctaText: "Play",
    ctaLink: "https://open.spotify.com/",
    content: () => (
      <p className="max-w-md text-sm text-neutral-600">
        A modern rock classic featuring hypnotic guitar riffs and introspective
        lyrics.
      </p>
    ),
  },
];
