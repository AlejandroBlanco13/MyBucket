import { Link } from 'react-router-dom'

export function EmakiClose({ onReturn }: { onReturn: () => void }) {
  return (
    <section
      id="cierre"
      className="relative z-30 flex min-h-svh flex-col justify-center bg-[#070605] px-6 py-28 text-white sm:px-10"
    >
      <div className="mx-auto w-full max-w-xl">
        <p lang="ja" className="font-mincho text-sm tracking-[0.5em] text-[#e0b15a]">
          終
        </p>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          El rollo se cierra
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
          El emaki queda recorrido. Puedes volver a la entrada, o salir de la sala.
        </p>

        <div className="mt-14 border-t border-white/10">
          <button
            type="button"
            onClick={onReturn}
            className="flex w-full items-center justify-between gap-6 border-b border-white/10 py-6 text-left transition-colors hover:text-[#e0b15a] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#e0b15a]"
          >
            <span className="flex items-baseline gap-5">
              <span lang="ja" className="font-mincho text-xl text-white/40">
                巻頭
              </span>
              <span>
                <span className="block font-mono text-[9px] uppercase tracking-[0.28em] text-white/40">
                  Otra vez
                </span>
                <span className="mt-1 block font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  Volver al inicio
                </span>
              </span>
            </span>
            <span aria-hidden className="font-mincho text-lg text-white/35">
              ↑
            </span>
          </button>

          <Link
            to="/"
            className="flex w-full items-center justify-between gap-6 border-b border-white/10 py-6 transition-colors hover:text-[#e0b15a] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#e0b15a]"
          >
            <span className="flex items-baseline gap-5">
              <span lang="ja" className="font-mincho text-xl text-white/40">
                扉
              </span>
              <span>
                <span className="block font-mono text-[9px] uppercase tracking-[0.28em] text-white/40">
                  Alejandría
                </span>
                <span className="mt-1 block font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  Salir de esta sala
                </span>
              </span>
            </span>
            <span aria-hidden className="font-mincho text-lg text-white/35">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
