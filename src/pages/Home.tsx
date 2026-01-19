import './Home.css'

const Home = () => {
  const copyEmailToClipboard = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const email = 'inbloomf3@gmail.com'
    try {
      await navigator.clipboard.writeText(email)
      // Временная визуальная обратная связь
      const originalText = e.currentTarget.textContent
      e.currentTarget.textContent = '📧 Скопировано!'
      setTimeout(() => {
        if (e.currentTarget) {
          e.currentTarget.textContent = originalText
        }
      }, 2000)
    } catch (err) {
      console.error('Не удалось скопировать email:', err)
      // Fallback для старых браузеров
      window.location.href = `mailto:${email}`
    }
  }
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-image-container">
              <img src="/profile_photo.png" alt="Константин Козлов" className="hero-image" />
            </div>
            <h1 className="hero-title">
              Привет, я <span className="highlight">Константин Козлов</span>
            </h1>
            <p className="hero-subtitle">
              C# разработчик с опытом создания масштабируемых веб-приложений и однопользовательских/многопользовательских игр
            </p>
            <div className="hero-buttons">
              <a href="#resume" className="btn btn-primary">
                Посмотреть резюме
              </a>
              <a href="/projects" className="btn btn-secondary">
                Мои проекты
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="resume" className="resume-section">
        <div className="container">
          <h2 className="section-title">Резюме</h2>
          
          <div className="resume-grid">
            <div className="resume-card">
              <h3 className="card-title">О себе</h3>
              <p className="card-text">
                C# разработчик с техническим бэкграундом и опытом полного цикла разработки. 
                Специализируюсь на создании enterprise-решений с использованием .NET Core, Entity Framework, 
                чистой архитектуры и современных паттернов проектирования. Имею опыт работы с SignalR, MediatR, 
                Dependency Injection и другими ключевыми технологиями экосистемы .NET.
              </p>
              <p className="card-text" style={{ marginTop: '1rem' }}>
                Unity: создание игровых механик, мультиплеера (Photon, NetCode), анимационных систем, UI, 
                интеграция SDK и выпуск проектов в App Store / Google Play. Решение merge конфликтов в Git, 
                работа с DI фреймворками, UniRX для реактивного программирования. Разработка AR-приложений, 
                работа с 3D-графикой, трекингом и оптимизацией производительности.
              </p>
            </div>

            <div className="resume-card">
              <h3 className="card-title">Опыт работы</h3>
              <p className="experience-summary" style={{ marginBottom: '2rem', color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.1rem', fontWeight: '500' }}>
                Опыт работы: 3 года 10 месяцев
              </p>
              <div className="experience-list">
                <div className="experience-item">
                  <div className="experience-header">
                    <h4 className="experience-title">Генеральный Директор / Full-Stack Developer</h4>
                    <span className="experience-date">Ноябрь 2025 - настоящее время</span>
                  </div>
                  <p className="experience-company">СРК, Санкт-Петербург</p>
                  <ul className="experience-details">
                    <li>Проектирование архитектуры и полного стека разработки проекта</li>
                    <li>Разработка backend на Django</li>
                    <li>Создание AR-приложений на Unity/C#</li>
                    <li>Победитель конкурса студенческих стартапов</li>
                    <li>Реализация гранта размером 1 миллион рублей</li>
                  </ul>
                </div>
                <div className="experience-item">
                  <div className="experience-header">
                    <h4 className="experience-title">Инженер технической поддержки</h4>
                    <span className="experience-date">Апрель 2025 - настоящее время</span>
                  </div>
                  <p className="experience-company">Альтуэра, Москва</p>
                  <ul className="experience-details">
                    <li>Администрирование рабочих процессов на Genesys</li>
                    <li>Работа с БД (PostgreSQL, SQLite, MSSQL)</li>
                    <li>Анализ кода на Python и SCXML</li>
                    <li>Анализ SIP сессий, сетевого трафика</li>
                  </ul>
                </div>
                <div className="experience-item">
                  <div className="experience-header">
                    <h4 className="experience-title">Unity/C# Developer</h4>
                    <span className="experience-date">Октябрь 2022 - Апрель 2025</span>
                  </div>
                  <p className="experience-company">Appie.tech, DatsTeam, Toxic Media — Москва</p>
                  <ul className="experience-details">
                    <li>Разработка игровых приложений, WebView Android приложений на Unity/C#</li>
                    <li>Работа с HTTP запросами, сериализацией и десериализацией данных</li>
                    <li>Интеграция SDK (Facebook, Appsflyer, Firebase, OneSignal), работа с API</li>
                    <li>Выгрузка приложений в AppStore и Google Play, настройка CI/CD (GitHub Actions)</li>
                  </ul>
                </div>
                <div className="experience-item">
                  <div className="experience-header">
                    <h4 className="experience-title">Unity Developer</h4>
                    <span className="experience-date">Февраль 2022 - Июль 2022</span>
                  </div>
                  <p className="experience-company">Tap To Fun, Москва</p>
                  <ul className="experience-details">
                    <li>Создание гиперказуальных игр на Unity/C#</li>
                    <li>Работа с чужим кодом (C#, Python), создание мультиплеера на Photon</li>
                    <li>Проектирование архитектуры игр, реактивное программирование</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="resume-card">
              <h3 className="card-title">Навыки программирования</h3>
              <div className="skills-grid">
                <div className="skill-category">
                  <h4 className="skill-category-title">Языки программирования</h4>
                  <div className="skill-tags">
                    <span className="skill-tag">C#</span>
                    <span className="skill-tag">Python</span>
                    <span className="skill-tag">SQL</span>
                    <span className="skill-tag">C++</span>
                  </div>
                </div>
                <div className="skill-category">
                  <h4 className="skill-category-title">.NET Экосистема</h4>
                  <div className="skill-tags">
                    <span className="skill-tag">.NET Core</span>
                    <span className="skill-tag">.NET Framework</span>
                    <span className="skill-tag">ASP.NET Core</span>
                    <span className="skill-tag">Entity Framework Core</span>
                    <span className="skill-tag">SignalR</span>
                    <span className="skill-tag">MediatR</span>
                    <span className="skill-tag">Dependency Injection</span>
                    <span className="skill-tag">AutoMapper</span>
                    <span className="skill-tag">FluentValidation</span>
                  </div>
                </div>
                <div className="skill-category">
                  <h4 className="skill-category-title">Архитектура и паттерны</h4>
                  <div className="skill-tags">
                    <span className="skill-tag">Clean Architecture</span>
                    <span className="skill-tag">SOLID</span>
                    <span className="skill-tag">State Machine</span>
                    <span className="skill-tag">CQRS</span>
                    <span className="skill-tag">Pooling</span>
                    <span className="skill-tag">Factory</span>
                    <span className="skill-tag">Microservices</span>
                  </div>
                </div>
                <div className="skill-category">
                  <h4 className="skill-category-title">Базы данных</h4>
                  <div className="skill-tags">
                    <span className="skill-tag">PostgreSQL</span>
                    <span className="skill-tag">MSSQL</span>
                    <span className="skill-tag">SQLite</span>
                    <span className="skill-tag">Entity Framework</span>
                    <span className="skill-tag">LINQ</span>
                  </div>
                </div>
                <div className="skill-category">
                  <h4 className="skill-category-title">DevOps и инструменты</h4>
                  <div className="skill-tags">
                    <span className="skill-tag">Git</span>
                    <span className="skill-tag">Docker</span>
                    <span className="skill-tag">CI/CD</span>
                    <span className="skill-tag">GitHub Actions</span>
                    <span className="skill-tag">NGINX</span>
                    <span className="skill-tag">Linux</span>
                    <span className="skill-tag">Jira</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="resume-card">
              <h3 className="card-title">Образование</h3>
              <div className="education-item">
                <h4 className="education-title">Бакалавр</h4>
                <p className="education-institution">Санкт-Петербургский горный университет</p>
                <p className="education-specialty">Электроника и наноэлектроника, Энергетический факультет</p>
                <span className="education-date">2024</span>
              </div>
              <div className="education-item">
                <h4 className="education-title">Магистратура (неоконченное)</h4>
                <p className="education-institution">Санкт-Петербургский горный университет</p>
                <p className="education-specialty">Энергоснабжение, Энергетический факультет</p>
                <span className="education-date">2025 (ушел по собственному желанию после первой сессии)</span>
              </div>
              <div className="education-item">
                <h4 className="education-title">Сертификаты</h4>
                <div className="certificates-list">
                  <div className="certificate-item">
                    <p className="education-institution">Unity Developer Professional (OTUS)</p>
                    <span className="education-date">2024</span>
                  </div>
                  <div className="certificate-item">
                    <p className="education-institution">Программирование на Python (Stepik)</p>
                    <span className="education-date">2025</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="resume-card">
              <h3 className="card-title">Достижения</h3>
              <ul className="achievements-list">
                <li className="achievement-item">
                  <span className="achievement-icon">🏆</span>
                  <span>Победитель конкурса студенческих стартапов №СтС-504105</span>
                </li>
                <li className="achievement-item">
                  <span className="achievement-icon">🚀</span>
                  <span>Реализация собственного проекта с backend, AR-приложением и инфраструктурой</span>
                </li>
                <li className="achievement-item">
                  <span className="achievement-icon">💼</span>
                  <span>Опыт полного цикла разработки: от проектирования до развертывания</span>
                </li>
                <li className="achievement-item">
                  <span className="achievement-icon">🎤</span>
                  <span>Выступление на митапе инди-разработчиков "Индикатор" 25 марта 2023 года с демо игры "Retro Rally"</span>
                </li>
              </ul>
            </div>

            <div className="resume-card">
              <h3 className="card-title">Контакты</h3>
              <div className="contacts">
                <a href="mailto:inbloomf3@gmail.com" className="contact-link" onClick={copyEmailToClipboard} title="Нажмите, чтобы скопировать email">
                  📧 inbloomf3@gmail.com
                </a>
                <a href="tel:+79677399167" className="contact-link">
                  📱 +7 (967) 739-91-67
                </a>
                <a href="https://t.me/kostyavrode" target="_blank" rel="noopener noreferrer" className="contact-link">
                  💬 Telegram: @kostyavrode
                </a>
                <p className="contact-location">📍 Санкт-Петербург, Россия</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
