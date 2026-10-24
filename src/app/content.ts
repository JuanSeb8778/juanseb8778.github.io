export type Lang = 'es' | 'en';

export interface Service {
  name: string;
  tech: string;
  port: string;
}

export interface Project {
  id: string;
  title: string;
  kind: string;
  summary: string;
  tech: string[];
  links: { label: string; href: string }[];
  services?: Service[];
  note?: string;
}

export interface TimelineItem {
  period: string;
  title: string;
  place: string;
  detail: string;
  link?: { label: string; href: string };
}

export interface Content {
  meta: { title: string; description: string };
  nav: { about: string; work: string; projects: string; stack: string; contact: string };
  langSwitch: string;
  hero: {
    greeting: string;
    role: string;
    pitch: string;
    primary: string;
    secondary: string;
    api: Record<string, string | boolean | string[]>;
    panelLabel: string;
  };
  about: { title: string; body: string[]; facts: { label: string; value: string }[] };
  work: { title: string; items: TimelineItem[] };
  projects: {
    title: string;
    intro: string;
    serviceHead: { name: string; tech: string; port: string };
    items: Project[];
  };
  stack: { title: string; groups: { name: string; items: string[] }[] };
  contact: { title: string; body: string; emailLabel: string; copied: string; copy: string };
  footer: string;
}

const EMAIL = 'juanseb8778@gmail.com';
const GITHUB = 'https://github.com/JuanSeb8778';
const LINKEDIN = 'https://www.linkedin.com/in/juan-sebastian-angel-ramirez-44225b265/';

export const LINKS = { email: EMAIL, github: GITHUB, linkedin: LINKEDIN };

const services = (lang: Lang): Service[] => [
  { name: lang === 'es' ? 'Usuarios' : 'Users', tech: 'Spring Boot, MongoDB', port: '8080' },
  { name: lang === 'es' ? 'Reseñas' : 'Reviews', tech: 'Spring Boot, JPA', port: '8081' },
  { name: lang === 'es' ? 'Catálogo' : 'Catalog', tech: 'Node.js, Express', port: '3001' },
  { name: lang === 'es' ? 'Listas' : 'Watchlists', tech: 'Node.js, Express', port: '3002' },
  { name: lang === 'es' ? 'Agente IA' : 'AI agent', tech: 'FastAPI, Gemini, MCP', port: '8000' },
  { name: 'Chat', tech: 'React', port: '3000' },
];

export const CONTENT: Record<Lang, Content> = {
  es: {
    meta: {
      title: 'Juan Sebastián Ángel Ramírez | Desarrollador web full stack',
      description:
        'Desarrollador web full stack en formación. Angular, Vue y TypeScript en el frontend; Java y Spring Boot en el backend.',
    },
    nav: { about: 'Sobre mí', work: 'Experiencia', projects: 'Proyectos', stack: 'Tecnologías', contact: 'Contacto' },
    langSwitch: 'Cambiar idioma a inglés',
    hero: {
      greeting: 'Hola, soy',
      role: 'Desarrollador web full stack',
      pitch:
        'Construyo aplicaciones de punta a punta: interfaces en Angular y Vue, y APIs en Java y Spring Boot. Estudio Ingeniería de Software y trabajo con clientes reales en Crear Solutions.',
      primary: 'Ver proyectos',
      secondary: 'Escríbeme',
      panelLabel: 'Respuesta de la API con mi perfil',
      api: {
        nombre: 'Juan Sebastián Ángel Ramírez',
        rol: 'Desarrollador web full stack',
        ubicacion: 'Armenia, Quindío, Colombia',
        trabajo: 'Crear Solutions',
        estudios: 'Ingeniería de Software, EAM',
        stack: ['Java', 'Spring Boot', 'Angular', 'Vue', 'TypeScript'],
        disponible: true,
      },
    },
    about: {
      title: 'Sobre mí',
      body: [
        'Me interesa entender el problema completo, desde cómo se guardan los datos hasta el botón que toca el usuario, y encontrar la solución más simple que funcione.',
        'En la universidad he trabajado en equipo en proyectos con microservicios, aplicaciones móviles e inteligencia artificial. En Crear Solutions diseño y desarrollo sitios para negocios que necesitan vender en línea.',
      ],
      facts: [
        { label: 'Ubicación', value: 'Armenia, Quindío, Colombia' },
        { label: 'Modalidad', value: 'Presencial, híbrido o remoto' },
        { label: 'Estudios', value: 'Ingeniería de Software, hasta 2027' },
      ],
    },
    work: {
      title: 'Experiencia',
      items: [
        {
          period: 'abr. 2026 – hoy',
          title: 'Desarrollador web',
          place: 'Crear Solutions, remoto y medio tiempo',
          detail:
            'Diseño y desarrollo de sitios web para clientes, con navegación clara y pensados para convertir visitas en ventas.',
          link: { label: 'Ver Marlow Mens USA', href: 'https://marlowmensusa.com/' },
        },
        {
          period: 'feb. 2023 – jun. 2027',
          title: 'Ingeniería de Software',
          place: 'Institución Universitaria EAM, en curso',
          detail:
            'Diseño de software, estructuras de datos, bases de datos y gestión de proyectos, con proyectos en equipo cada semestre.',
        },
      ],
    },
    projects: {
      title: 'Proyectos',
      intro: 'Proyectos académicos hechos en equipo, de principio a fin.',
      serviceHead: { name: 'Servicio', tech: 'Tecnología', port: 'Puerto' },
      items: [
        {
          id: 'peliculiando',
          title: 'Peliculiando',
          kind: 'Plataforma de películas con microservicios',
          summary:
            'Seis servicios independientes para gestionar películas, usuarios, reseñas y listas personales. Un agente con Google Gemini responde preguntas sobre el catálogo usando el Model Context Protocol, y se conversa con él desde un chat en React.',
          tech: ['Java 21', 'Spring Boot', 'Node.js', 'Python', 'React', 'Swagger'],
          services: services('es'),
          links: [{ label: 'Ver código', href: `${GITHUB}/proyectoPeliculasMicroservicios` }],
        },
        {
          id: 'unilocal',
          title: 'uniLocal',
          kind: 'App Android de lugares locales',
          summary:
            'Los usuarios publican lugares de su ciudad, los encuentran en un mapa, dejan reseñas y guardan sus favoritos. Un panel de administración aprueba o rechaza cada lugar nuevo.',
          tech: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Mapbox', 'Cloudinary'],
          links: [{ label: 'Ver código', href: 'https://github.com/Diyued/uniLocal' }],
        },
        {
          id: 'susanoo',
          title: 'Susanoo Web',
          kind: 'Sitio web temático',
          summary:
            'Sitio sobre Susanoo, el dios de la tormenta en la mitología japonesa, y su presencia en Naruto Shippuden, con galería de ilustraciones.',
          tech: ['HTML', 'CSS'],
          links: [
            { label: 'Ver sitio', href: 'https://juanseb8778.github.io/Susanoo-Web/' },
            { label: 'Ver código', href: `${GITHUB}/Susanoo-Web` },
          ],
        },
      ],
    },
    stack: {
      title: 'Tecnologías',
      groups: [
        { name: 'Frontend', items: ['Angular', 'Vue', 'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'] },
        { name: 'Backend', items: ['Java', 'Spring Boot', 'Node.js', 'Express', 'Python', 'FastAPI'] },
        { name: 'Datos', items: ['SQL', 'PostgreSQL', 'MongoDB', 'Firebase'] },
        { name: 'Móvil', items: ['Kotlin', 'Jetpack Compose'] },
        { name: 'Herramientas', items: ['Git', 'GitHub', 'Figma', 'Swagger'] },
      ],
    },
    contact: {
      title: 'Contacto',
      body: '¿Tienes un proyecto o una vacante? Escríbeme y te respondo pronto.',
      emailLabel: 'Enviar un correo',
      copy: 'Copiar correo',
      copied: 'Correo copiado',
    },
    footer: 'Hecho con Angular y publicado en GitHub Pages.',
  },

  en: {
    meta: {
      title: 'Juan Sebastián Ángel Ramírez | Full stack web developer',
      description:
        'Full stack web developer and software engineering student. Angular, Vue and TypeScript on the frontend; Java and Spring Boot on the backend.',
    },
    nav: { about: 'About', work: 'Experience', projects: 'Projects', stack: 'Stack', contact: 'Contact' },
    langSwitch: 'Switch language to Spanish',
    hero: {
      greeting: "Hi, I'm",
      role: 'Full stack web developer',
      pitch:
        'I build applications end to end: interfaces in Angular and Vue, and APIs in Java and Spring Boot. I study Software Engineering and work with real clients at Crear Solutions.',
      primary: 'See projects',
      secondary: 'Get in touch',
      panelLabel: 'API response with my profile',
      api: {
        name: 'Juan Sebastián Ángel Ramírez',
        role: 'Full stack web developer',
        location: 'Armenia, Quindío, Colombia',
        work: 'Crear Solutions',
        studies: 'Software Engineering, EAM',
        stack: ['Java', 'Spring Boot', 'Angular', 'Vue', 'TypeScript'],
        available: true,
      },
    },
    about: {
      title: 'About',
      body: [
        'I like understanding the whole problem, from how the data is stored to the button the user taps, and finding the simplest solution that works.',
        'At university I have worked in teams on projects with microservices, mobile apps and artificial intelligence. At Crear Solutions I design and build websites for businesses that need to sell online.',
      ],
      facts: [
        { label: 'Location', value: 'Armenia, Quindío, Colombia' },
        { label: 'Work mode', value: 'On-site, hybrid or remote' },
        { label: 'Studies', value: 'Software Engineering, until 2027' },
      ],
    },
    work: {
      title: 'Experience',
      items: [
        {
          period: 'Apr 2026 – now',
          title: 'Web developer',
          place: 'Crear Solutions, remote and part time',
          detail:
            'Design and development of client websites with clear navigation, built to turn visits into sales.',
          link: { label: 'See Marlow Mens USA', href: 'https://marlowmensusa.com/' },
        },
        {
          period: 'Feb 2023 – Jun 2027',
          title: 'Software Engineering',
          place: 'Institución Universitaria EAM, in progress',
          detail:
            'Software design, data structures, databases and project management, with team projects every semester.',
        },
      ],
    },
    projects: {
      title: 'Projects',
      intro: 'Academic team projects, built from start to finish.',
      serviceHead: { name: 'Service', tech: 'Technology', port: 'Port' },
      items: [
        {
          id: 'peliculiando',
          title: 'Peliculiando',
          kind: 'Movie platform built on microservices',
          summary:
            'Six independent services to manage movies, users, reviews and personal watchlists. An agent powered by Google Gemini answers questions about the catalog through the Model Context Protocol, and you talk to it from a React chat.',
          tech: ['Java 21', 'Spring Boot', 'Node.js', 'Python', 'React', 'Swagger'],
          services: services('en'),
          links: [{ label: 'View code', href: `${GITHUB}/proyectoPeliculasMicroservicios` }],
        },
        {
          id: 'unilocal',
          title: 'uniLocal',
          kind: 'Android app for local places',
          summary:
            'Users publish places in their city, find them on a map, leave reviews and save favorites. An admin panel approves or rejects every new place.',
          tech: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Mapbox', 'Cloudinary'],
          links: [{ label: 'View code', href: 'https://github.com/Diyued/uniLocal' }],
        },
        {
          id: 'susanoo',
          title: 'Susanoo Web',
          kind: 'Themed website',
          summary:
            'A site about Susanoo, the storm god of Japanese mythology, and his role in Naruto Shippuden, with an illustration gallery.',
          tech: ['HTML', 'CSS'],
          links: [
            { label: 'Visit site', href: 'https://juanseb8778.github.io/Susanoo-Web/' },
            { label: 'View code', href: `${GITHUB}/Susanoo-Web` },
          ],
        },
      ],
    },
    stack: {
      title: 'Stack',
      groups: [
        { name: 'Frontend', items: ['Angular', 'Vue', 'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'] },
        { name: 'Backend', items: ['Java', 'Spring Boot', 'Node.js', 'Express', 'Python', 'FastAPI'] },
        { name: 'Data', items: ['SQL', 'PostgreSQL', 'MongoDB', 'Firebase'] },
        { name: 'Mobile', items: ['Kotlin', 'Jetpack Compose'] },
        { name: 'Tools', items: ['Git', 'GitHub', 'Figma', 'Swagger'] },
      ],
    },
    contact: {
      title: 'Contact',
      body: 'Have a project or a role in mind? Send me an email and I will get back to you soon.',
      emailLabel: 'Send an email',
      copy: 'Copy email',
      copied: 'Email copied',
    },
    footer: 'Built with Angular and published on GitHub Pages.',
  },
};
