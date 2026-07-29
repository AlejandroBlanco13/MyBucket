import type { RealmCardData } from '../../data/alejandria'

type RealmCardProps = {
  realm: RealmCardData
  onSelect: () => void
}

/** Tamaño único para todos los reinos */
const CARD_SIZE =
  'h-[360px] w-[252px] sm:h-[380px] sm:w-[268px] md:h-[420px] md:w-[300px]'

/**
 * Card estilo galería — mismo tamaño siempre; texto sin recortes rotos.
 */
export function RealmCard({ realm, onSelect }: RealmCardProps) {
  const tags = realm.tags.filter(
    (tag) => tag.toLowerCase() !== realm.label.toLowerCase(),
  )

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative shrink-0 overflow-hidden border border-white/10 bg-neutral-900 text-left transition-transform duration-500 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${CARD_SIZE}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${realm.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/25" />

      <div className="absolute inset-x-0 bottom-0 z-10 flex min-h-[52%] flex-col justify-end p-4 sm:p-5 md:p-6">
        <span className="block truncate font-mono text-[10px] uppercase tracking-[0.24em] text-white/50">
          {realm.label}
        </span>
        <h2 className="mt-1.5 break-words font-display text-2xl font-semibold leading-tight text-white line-clamp-2 md:text-[1.75rem]">
          {realm.title}
        </h2>
        <p className="mt-2 break-words text-[13px] leading-snug text-white/65 line-clamp-3 sm:text-sm">
          {realm.description}
        </p>
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="max-w-full truncate border border-white/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/65"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  )
}
