// Menu mobile
const menuBtn = document.querySelector(".menu-btn")
const navLinks = document.querySelector(".nav-links")

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active")

  // Animate hamburger menu
  const spans = menuBtn.querySelectorAll("span")
  if (navLinks.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
    spans[1].style.opacity = "0"
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
  } else {
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  }
})

// Fechar menu ao clicar em um link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active")
    const spans = menuBtn.querySelectorAll("span")
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  })
})

// Animações sofisticadas com Intersection Observer
class AnimationController {
  constructor() {
    this.observers = new Map()
    this.init()
  }

  init() {
    this.setupFadeInAnimations()
    this.setupSlideAnimations()
    this.setupStaggeredAnimations()
    this.setupCounterAnimations()
    this.setupProgressAnimations()
    this.setupParallaxEffect()
  }

  // Animações de fade básicas
  setupFadeInAnimations() {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-active")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    document.querySelectorAll(".fade-in").forEach((el) => {
      fadeObserver.observe(el)
    })
  }

  // Animações de slide direcionais
  setupSlideAnimations() {
    const slideObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("slide-active")
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -30px 0px",
      },
    )

    document.querySelectorAll(".slide-up, .slide-left, .slide-right, .slide-down").forEach((el) => {
      slideObserver.observe(el)
    })
  }

  // Animações escalonadas (staggered)
  setupStaggeredAnimations() {
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll(".stagger-item")
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("stagger-active")
              }, index * 150) // 150ms de delay entre cada item
            })
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

    document.querySelectorAll(".stagger-container").forEach((el) => {
      staggerObserver.observe(el)
    })
  }

  // Animações de contador
  setupCounterAnimations() {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    document.querySelectorAll(".counter").forEach((el) => {
      counterObserver.observe(el)
    })
  }

  animateCounter(element) {
    const target = Number.parseInt(element.dataset.target)
    const duration = Number.parseInt(element.dataset.duration) || 2000
    const increment = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      element.textContent = Math.floor(current)
    }, 16)
  }

  // Animações de progresso/barras
  setupProgressAnimations() {
    const progressObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector(".progress-fill")
            const percentage = entry.target.dataset.percentage
            if (progressBar) {
              setTimeout(() => {
                progressBar.style.width = percentage + "%"
              }, 200)
            }
          }
        })
      },
      { threshold: 0.5 },
    )

    document.querySelectorAll(".progress-bar").forEach((el) => {
      progressObserver.observe(el)
    })
  }

  // Efeito parallax sutil
  setupParallaxEffect() {
    const parallaxElements = document.querySelectorAll(".parallax")

    if (parallaxElements.length > 0) {
      window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset
        const rate = scrolled * -0.5

        parallaxElements.forEach((el) => {
          el.style.transform = `translateY(${rate}px)`
        })
      })
    }
  }
}

// Inicializar animações
const animationController = new AnimationController()

// Scroll suave para as seções
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Efeito de digitação aprimorado
class TypeWriter {
  constructor(element, words, options = {}) {
    this.element = element
    this.words = words
    this.speed = options.speed || 100
    this.deleteSpeed = options.deleteSpeed || 50
    this.pauseTime = options.pauseTime || 2000
    this.currentWordIndex = 0
    this.currentText = ""
    this.isDeleting = false
    this.init()
  }

  init() {
    this.type()
  }

  type() {
    const currentWord = this.words[this.currentWordIndex]

    if (this.isDeleting) {
      this.currentText = currentWord.substring(0, this.currentText.length - 1)
    } else {
      this.currentText = currentWord.substring(0, this.currentText.length + 1)
    }

    this.element.textContent = this.currentText

    let typeSpeed = this.isDeleting ? this.deleteSpeed : this.speed

    if (!this.isDeleting && this.currentText === currentWord) {
      typeSpeed = this.pauseTime
      this.isDeleting = true
    } else if (this.isDeleting && this.currentText === "") {
      this.isDeleting = false
      this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length
      typeSpeed = 500
    }

    setTimeout(() => this.type(), typeSpeed)
  }
}

// Aplicar efeito de digitação ao carregar a página
window.addEventListener("load", () => {
  const titleElement = document.querySelector(".typewriter")
  if (titleElement) {
    const words = ["Daniel Victor", "Desenvolvedor", "Estudante ADS"]
    new TypeWriter(titleElement, words, {
      speed: 150,
      deleteSpeed: 100,
      pauseTime: 2000,
    })
  }
})

// Navegação com mudança de background
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav")
  const scrolled = window.scrollY

  if (scrolled > 100) {
    nav.style.background = "rgba(24, 24, 24, 0.98)"
    nav.style.backdropFilter = "blur(20px)"
  } else {
    nav.style.background = "rgba(24, 24, 24, 0.95)"
    nav.style.backdropFilter = "blur(10px)"
  }
})

// Cursor personalizado (opcional)
class CustomCursor {
  constructor() {
    this.cursor = document.createElement("div")
    this.cursor.className = "custom-cursor"
    document.body.appendChild(this.cursor)

    this.cursorFollower = document.createElement("div")
    this.cursorFollower.className = "cursor-follower"
    document.body.appendChild(this.cursorFollower)

    this.init()
  }

  init() {
    document.addEventListener("mousemove", (e) => {
      this.cursor.style.left = e.clientX + "px"
      this.cursor.style.top = e.clientY + "px"

      setTimeout(() => {
        this.cursorFollower.style.left = e.clientX + "px"
        this.cursorFollower.style.top = e.clientY + "px"
      }, 100)
    })

    // Efeitos em elementos interativos
    document.querySelectorAll("a, button, .btn").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        this.cursor.classList.add("cursor-hover")
        this.cursorFollower.classList.add("cursor-hover")
      })

      el.addEventListener("mouseleave", () => {
        this.cursor.classList.remove("cursor-hover")
        this.cursorFollower.classList.remove("cursor-hover")
      })
    })
  }
}

// Inicializar cursor personalizado apenas em desktop
if (window.innerWidth > 768) {
  new CustomCursor()
}

// Partículas de fundo (efeito sutil)
class ParticleSystem {
  constructor() {
    this.canvas = document.createElement("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.particles = []
    this.init()
  }

  init() {
    this.canvas.className = "particle-canvas"
    document.body.appendChild(this.canvas)
    this.resize()
    this.createParticles()
    this.animate()

    window.addEventListener("resize", () => this.resize())
  }

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  createParticles() {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.particles.forEach((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy

      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1

      this.ctx.beginPath()
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      this.ctx.fillStyle = `rgba(29, 78, 216, ${particle.opacity})`
      this.ctx.fill()
    })

    requestAnimationFrame(() => this.animate())
  }
}

// Inicializar sistema de partículas apenas em desktop
if (window.innerWidth > 768) {
  new ParticleSystem()
}

// Morphing Shapes e Gradient Animations Controller
class MorphingEffects {
  constructor() {
    this.init()
  }

  init() {
    this.createMorphingBackground()
    this.setupGradientOrbs()
    this.initializeInteractiveGradients()
    this.setupMorphingCards()
    this.createGradientCursor()
  }

  // Criar background com formas morphing
  createMorphingBackground() {
    const morphingBg = document.createElement("div")
    morphingBg.className = "morphing-bg"

    // Criar 3 formas morphing
    for (let i = 1; i <= 3; i++) {
      const shape = document.createElement("div")
      shape.className = "morphing-shape"
      morphingBg.appendChild(shape)
    }

    document.body.appendChild(morphingBg)
  }

  // Configurar orbs gradientes flutuantes
  setupGradientOrbs() {
    const orbContainer = document.createElement("div")
    orbContainer.style.position = "fixed"
    orbContainer.style.top = "0"
    orbContainer.style.left = "0"
    orbContainer.style.width = "100%"
    orbContainer.style.height = "100%"
    orbContainer.style.pointerEvents = "none"
    orbContainer.style.zIndex = "-1"

    // Criar orbs gradientes
    for (let i = 1; i <= 3; i++) {
      const orb = document.createElement("div")
      orb.className = `gradient-orb gradient-orb-${i}`
      orbContainer.appendChild(orb)
    }

    document.body.appendChild(orbContainer)
  }

  // Gradientes interativos baseados no mouse
  initializeInteractiveGradients() {
    let mouseX = 0
    let mouseY = 0

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX / window.innerWidth
      mouseY = e.clientY / window.innerHeight

      // Atualizar gradientes baseado na posição do mouse
      this.updateInteractiveGradients(mouseX, mouseY)
    })
  }

  updateInteractiveGradients(x, y) {
    const gradientElements = document.querySelectorAll(".gradient-bg, .morphing-btn")

    gradientElements.forEach((element) => {
      const hue1 = Math.floor(220 + x * 60) // 220-280
      const hue2 = Math.floor(240 + y * 60) // 240-300

      element.style.background = `linear-gradient(${45 + x * 90}deg, 
        hsl(${hue1}, 70%, 55%), 
        hsl(${hue2}, 70%, 65%))`
    })
  }

  // Configurar cards com efeitos morphing
  setupMorphingCards() {
    // Aplicar classes morphing aos cards existentes
    document.querySelectorAll(".skill-card-simple").forEach((card) => {
      card.classList.add("skill-card-morphing", "morphing-card")
    })

    document.querySelectorAll(".project-card").forEach((card) => {
      card.classList.add("project-card-morphing")
    })

    document.querySelectorAll(".contact-card").forEach((card) => {
      card.classList.add("morphing-card", "gradient-border")
    })
  }

  // Cursor com gradiente
  createGradientCursor() {
    if (window.innerWidth <= 768) return // Não criar em mobile

    const cursor = document.querySelector(".custom-cursor")
    const follower = document.querySelector(".cursor-follower")

    if (cursor && follower) {
      cursor.style.background = "linear-gradient(45deg, #1d4ed8, #3b82f6)"
      follower.style.border = "2px solid transparent"
      follower.style.background = "linear-gradient(45deg, #1d4ed8, #3b82f6, #8b5cf6) border-box"
      follower.style.mask = "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)"
      follower.style.maskComposite = "xor"
    }
  }
}

// Gradient Text Animation Controller
class GradientTextAnimations {
  constructor() {
    this.init()
  }

  init() {
    this.setupGradientTexts()
    this.createTextRevealEffect()
  }

  setupGradientTexts() {
    // Aplicar gradiente aos títulos principais
    document.querySelectorAll("h1 span").forEach((span) => {
      span.classList.add("gradient-text")
    })

    // Aplicar gradiente aos subtítulos
    document.querySelectorAll("h4").forEach((h4) => {
      h4.classList.add("text-gradient-reveal")
    })
  }

  createTextRevealEffect() {
    const textElements = document.querySelectorAll(".text-gradient-reveal")

    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running"
          }
        })
      },
      { threshold: 0.5 },
    )

    textElements.forEach((el) => {
      el.style.animationPlayState = "paused"
      textObserver.observe(el)
    })
  }
}

// Morphing Button Effects
class MorphingButtons {
  constructor() {
    this.init()
  }

  init() {
    this.setupMorphingButtons()
    this.addHoverEffects()
  }

  setupMorphingButtons() {
    document.querySelectorAll(".btn, .btn-small").forEach((btn) => {
      btn.classList.add("morphing-btn")
    })
  }

  addHoverEffects() {
    document.querySelectorAll(".morphing-btn").forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        btn.style.background = "linear-gradient(45deg, #3b82f6, #8b5cf6)"
      })

      btn.addEventListener("mouseleave", () => {
        btn.style.background = "linear-gradient(45deg, #1d4ed8, #3b82f6)"
      })
    })
  }
}

// Liquid Morphing Timeline
class LiquidTimeline {
  constructor() {
    this.init()
  }

  init() {
    this.setupLiquidDots()
    this.addTimelineAnimations()
  }

  setupLiquidDots() {
    document.querySelectorAll(".timeline-dot").forEach((dot) => {
      dot.classList.add("timeline-dot-morphing", "liquid-shape")
    })
  }

  addTimelineAnimations() {
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const dot = entry.target.querySelector(".timeline-dot-morphing")
            if (dot) {
              dot.style.animationDelay = "0s"
              dot.style.animationPlayState = "running"
            }
          }
        })
      },
      { threshold: 0.3 },
    )

    document.querySelectorAll(".timeline-item").forEach((item) => {
      timelineObserver.observe(item)
    })
  }
}

// Gradient Loading Effects
class GradientLoaders {
  constructor() {
    this.init()
  }

  init() {
    this.createPageLoader()
    this.setupSectionLoaders()
  }

  createPageLoader() {
    const loader = document.createElement("div")
    loader.className = "gradient-loader"
    loader.style.position = "fixed"
    loader.style.top = "0"
    loader.style.left = "0"
    loader.style.zIndex = "10000"

    document.body.appendChild(loader)

    // Remover loader após carregamento
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.style.opacity = "0"
        setTimeout(() => loader.remove(), 500)
      }, 1000)
    })
  }

  setupSectionLoaders() {
    // Adicionar loaders nas seções quando necessário
    document.querySelectorAll(".progress-bar").forEach((bar) => {
      bar.classList.add("gradient-loader")
    })
  }
}

// Wave Animation Controller
class WaveAnimations {
  constructor() {
    this.init()
  }

  init() {
    this.setupWaveBackgrounds()
    this.createInteractiveWaves()
  }

  setupWaveBackgrounds() {
    document.querySelectorAll(".skill-card-simple, .project-card").forEach((card) => {
      card.classList.add("wave-bg")
    })
  }

  createInteractiveWaves() {
    document.querySelectorAll(".wave-bg").forEach((element) => {
      element.addEventListener("mouseenter", () => {
        element.style.setProperty("--wave-duration", "1s")
      })

      element.addEventListener("mouseleave", () => {
        element.style.setProperty("--wave-duration", "3s")
      })
    })
  }
}

// Inicializar todos os efeitos morphing
document.addEventListener("DOMContentLoaded", () => {
  // Aguardar um pouco para garantir que outros scripts carregaram
  setTimeout(() => {
    new MorphingEffects()
    new GradientTextAnimations()
    new MorphingButtons()
    new LiquidTimeline()
    new GradientLoaders()
    new WaveAnimations()
  }, 100)
})

// Performance monitoring for animations
class AnimationPerformance {
  constructor() {
    this.fps = 0
    this.lastTime = performance.now()
    this.frameCount = 0
    this.monitor()
  }

  monitor() {
    const now = performance.now()
    this.frameCount++

    if (now - this.lastTime >= 1000) {
      this.fps = this.frameCount
      this.frameCount = 0
      this.lastTime = now

      // Reduzir animações se FPS baixo
      if (this.fps < 30) {
        this.reduceMorphingEffects()
      }
    }

    requestAnimationFrame(() => this.monitor())
  }

  reduceMorphingEffects() {
    document.querySelectorAll(".morphing-shape, .gradient-orb").forEach((el) => {
      el.style.animationDuration = "30s" // Tornar mais lento
    })
  }
}

// Inicializar monitor de performance apenas em desktop
if (window.innerWidth > 768) {
  new AnimationPerformance()
}

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-links a")

  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Typing effect for code block (optional enhancement)
const codeLines = document.querySelectorAll(".code-content .line")
let delay = 0

codeLines.forEach((line, index) => {
  line.style.opacity = "0"
  setTimeout(() => {
    line.style.opacity = "1"
    line.style.animation = "fadeInUp 0.5s ease forwards"
  }, delay)
  delay += 200
})

// Add CSS for the typing animation
const style = document.createElement("style")
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .nav-links a.active {
    color: var(--accent);
  }
  
  .nav-links a.active::after {
    width: 100%;
  }
`
document.head.appendChild(style)

// Performance optimization: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.documentElement.style.setProperty("--transition", "none")
}

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active")
    const spans = menuBtn.querySelectorAll("span")
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  }
})
