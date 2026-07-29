import { ThemeProvider } from '../context/ThemeContext'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Focus } from '../components/sections/Focus'
import { ProjectsGallery } from '../components/sections/ProjectsGallery'
import { Skills } from '../components/sections/Skills'
import { Contact } from '../components/sections/Contact'
import { SectionBreak } from '../components/ui/SectionBreak'

/** Portfolio MyBucket — ruta /mybucket */
export function Portfolio() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-paper text-ink">
        <div className="noise-overlay" aria-hidden />
        <Header />
        <main className="flex flex-col">
          <Hero />

          <About />
          <SectionBreak
            from="Identidad"
            to="Señal"
            fromCode="01"
            toCode="02"
          />

          <Focus />
          <SectionBreak from="Señal" to="Trabajo" fromCode="02" toCode="03" />

          <ProjectsGallery />
          <SectionBreak from="Trabajo" to="Stack" fromCode="03" toCode="04" />

          <Skills />
          <SectionBreak
            from="Stack"
            to="Contacto"
            fromCode="04"
            toCode="05"
          />

          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
