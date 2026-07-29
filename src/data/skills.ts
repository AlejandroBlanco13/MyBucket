export type Skill = {
  name: string
  level: 'Core' | 'Fuerte' | 'Práctica'
}

export type SkillGroup = {
  category: string
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 'Core' },
      { name: 'TypeScript', level: 'Core' },
      { name: 'Next.js', level: 'Fuerte' },
      { name: 'Tailwind CSS', level: 'Core' },
      { name: 'Motion', level: 'Fuerte' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 'Fuerte' },
      { name: 'Python', level: 'Fuerte' },
      { name: 'Java', level: 'Práctica' },
      { name: 'PostgreSQL', level: 'Fuerte' },
      { name: 'REST APIs', level: 'Core' },
    ],
  },
  {
    category: 'Producto',
    skills: [
      { name: 'UX / UI', level: 'Fuerte' },
      { name: 'Ecommerce', level: 'Core' },
      { name: 'Sistemas de gestión', level: 'Core' },
      { name: 'Git / GitHub', level: 'Core' },
      { name: 'Deploy (Vercel)', level: 'Fuerte' },
    ],
  },
]
