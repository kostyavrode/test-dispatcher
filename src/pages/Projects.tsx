import './Projects.css'

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'АктивГрад',
      description: '[В разработке] Мобильное AR приложение, интегрированное с малым бизнесом, захватом достопримечательностей, кланами и прокачкой персонажа. Релиз: сентябрь 2026',
      technologies: ['C#', 'Unity', '.NET', 'REST API', 'SQLite'],
      image: '/activegrad.PNG',
      githubLink: 'https://github.com/kostyavrode/activegrad_unity',
      videoLink: 'https://www.youtube.com/shorts/hjip-nOnpuM',
      featured: true
    },
    {
      id: 2,
      title: 'ToDo',
      description: 'Простой трекер задач, бекэнд полностью на C#. Дает возможность выставлять задачам приоритет и дату их выполнения. Существует мобильная версия и веб-версия.',
      technologies: ['C#', '.NET Core', 'Entity Framework', 'PostgreSQL'],
      image: '/todo.PNG',
      githubLink: 'https://github.com/kostyavrode/ToDoService',
      webLink: 'https://todo-kostya.online/',
      mobileLink: 'https://www.rustore.ru/catalog/app/com.kostya.todo',
      featured: true
    },
    {
      id: 3,
      title: 'Retro Rally',
      description: 'Сервер-мультиплеерная гонка на Photon. Графика в стиле PSX. Возможность создавать лобби и присоединяться к другим игрокам.',
      technologies: ['Unity', 'C#', 'Photon', 'DoTween'],
      image: '/retrorally.png',
      githubLink: 'https://github.com/kostyavrode/RetroRally/tree/main',
      videoLink: 'https://www.youtube.com/watch?v=ZkUFwbMtQDQ',
      featured: false
    },
    {
      id: 4,
      title: 'Task Flow',
      description: '[В разработке] Микросервисная платформа для управления асинхронными бизнес-процессами с real-time уведомлениями. Система включает три сервиса: Task Management API для создания задач, Task Execution Worker для их выполнения и Notification Service для уведомлений.',
      technologies: ['.NET', 'PostgreSQL', 'RabbitMQ', 'SignalR', 'Entity Framework', 'MassTransit'],
      image: '/taskflow.png',
      githubLink: 'https://github.com/kostyavrode/TaskFlow',
      featured: false
    },
    {
      id: 5,
      title: 'Остальные проекты',
      description: 'За 3 года работы Unity разработчиком я создал более 100 гемблинг приложений, в ходе разработки которых было создано более 50 игр.',
      technologies: ['Unity', 'C#', 'Zenject', 'DoTween', 'UniRX', 'Webview', 'Android', 'IOS', 'PC'],
      images: ['/other1.PNG', '/other2.PNG', '/other3.PNG'],
      githubLink: 'https://github.com/kostyavrode?tab=repositories',
      videoLink: 'https://www.youtube.com/@konstantinkozlov437',
      featured: false,
      isMultipleImages: true
    }
  ]

  const featuredProjects = projects.filter(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)

  return (
    <div className="projects">
      <div className="container">
        <h1 className="page-title">Мои проекты</h1>
        <p className="page-subtitle">
          Здесь представлены проекты, над которыми я работал. Каждый проект демонстрирует 
          различные аспекты разработки и решения реальных задач.
        </p>

        {featuredProjects.length > 0 && (
          <section className="featured-projects">
            <h2 className="section-title">Рекомендуемые проекты</h2>
            <div className="projects-grid featured">
              {featuredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}

        {otherProjects.length > 0 && (
          <section className="all-projects">
            <h2 className="section-title">Остальные проекты</h2>
            <div className="projects-grid projects-grid-small">
              {otherProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

interface ProjectCardProps {
  project: {
    id: number
    title: string
    description: string
    technologies: string[]
    image?: string
    images?: string[]
    githubLink?: string
    webLink?: string
    mobileLink?: string
    videoLink?: string
    featured?: boolean
    isMultipleImages?: boolean
  }
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className={`project-card ${!project.featured ? 'project-card-small' : ''}`}>
      <div className="project-image">
        {project.isMultipleImages && project.images ? (
          <div className="project-multiple-images">
            {project.images.map((img, index) => (
              <img key={index} src={img} alt={`${project.title} ${index + 1}`} className="project-img-multiple" />
            ))}
          </div>
        ) : (
          <img src={project.image || '/todo.PNG'} alt={project.title} className="project-img" />
        )}
      </div>
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-technologies">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
        <div className="project-links">
          {project.githubLink && (
            <a 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link"
            >
              💻 GitHub
            </a>
          )}
          {project.webLink && (
            <a 
              href={project.webLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link"
            >
              🌐 Веб-версия
            </a>
          )}
          {project.mobileLink && (
            <a 
              href={project.mobileLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link"
            >
              📱 Мобильная версия
            </a>
          )}
          {project.videoLink && project.videoLink !== '' && (
            <a 
              href={project.videoLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link"
            >
              ▶️ Видео
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default Projects
