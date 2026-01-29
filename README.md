# 🚀 MyBucket - Portfolio Personal Interactivo

MyBucket es un portfolio personal moderno y completamente responsive construido con React, TypeScript y Tailwind CSS. Incluye animaciones suaves, modo oscuro y un diseño profesional que destacará tu perfil ante reclutadores.

![MyBucket Preview](https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200)

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz limpia y profesional con gradientes y animaciones
- 🌙 **Modo Oscuro**: Toggle entre modo claro y oscuro con persistencia en localStorage
- 📱 **Totalmente Responsive**: Optimizado para todos los dispositivos (móvil, tablet, desktop)
- ⚡ **Rendimiento Optimizado**: Construido con Vite para carga rápida
- 🎭 **Animaciones Suaves**: Transiciones y efectos con Framer Motion
- 🎯 **SEO Friendly**: Meta tags y estructura semántica
- 🔧 **TypeScript**: Código type-safe y mantenible
- 🎨 **Tailwind CSS**: Estilos modernos y personalizables

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de CSS utility-first
- **Framer Motion** - Animaciones
- **React Icons** - Iconos

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tuusuario/mybucket.git
cd mybucket
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

## 🏗️ Construcción para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

## 📝 Personalización

### Cambiar Información Personal

1. **Hero Section** (`src/components/Hero.tsx`):
   - Actualiza tu nombre, título y descripción
   - Modifica los enlaces de redes sociales

2. **About Section** (`src/components/About.tsx`):
   - Edita la biografía y estadísticas

3. **Skills Section** (`src/components/Skills.tsx`):
   - Agrega o modifica tus habilidades y niveles de competencia

4. **Projects Section** (`src/components/Projects.tsx`):
   - Reemplaza los proyectos de ejemplo con tus proyectos reales
   - Actualiza imágenes, descripciones y enlaces

5. **Contact Section** (`src/components/Contact.tsx`):
   - Actualiza información de contacto
   - Configura el formulario para enviar emails (puedes usar servicios como EmailJS, Formspree, etc.)

### Cambiar Colores

Los colores principales se pueden modificar en `tailwind.config.js`:

```js
colors: {
  primary: {
    // Modifica estos valores para cambiar el color principal
  }
}
```

### Agregar CV

1. Coloca tu archivo PDF en la carpeta `public/`
2. Actualiza la ruta en `src/components/Hero.tsx`:
```tsx
<a href="/cv.pdf" download>
```

## 📁 Estructura del Proyecto

```
mybucket/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio de GitHub a Vercel
2. Vercel detectará automáticamente el proyecto y lo desplegará

### Netlify

1. Ejecuta `npm run build`
2. Arrastra la carpeta `dist` a Netlify Drop
3. O conecta tu repositorio de GitHub

### GitHub Pages

1. Instala `gh-pages`: `npm install --save-dev gh-pages`
2. Agrega al `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
3. Ejecuta `npm run deploy`

## 🎯 Próximas Mejoras

- [ ] Integración con EmailJS para formulario de contacto
- [ ] Blog section con MDX
- [ ] Certificaciones y logros
- [ ] Testimonios de clientes
- [ ] Multiidioma (i18n)
- [ ] PWA support

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - siéntete libre de usarlo para tu propio portfolio con MyBucket.

## 👤 Autor

**Tu Nombre**
- GitHub: [@tuusuario](https://github.com/tuusuario)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tuusuario)
- Email: tuemail@ejemplo.com

## 🙏 Agradecimientos

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
