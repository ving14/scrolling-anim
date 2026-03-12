class ScrollAnimationController {
  constructor(canvasId, rivePath) {
    this.canvas = document.getElementById(canvasId);
    this.animations = {
      scroll_section_1: { min: 0, max: 0.29 },
      scroll_section_2: { min: 0.30, max: 0.66 },
      scroll_section_3: { min: 0.67, max: 1 }
    };
    this.currentAnimation = null;

    this.rive = new rive.Rive({
      canvas: this.canvas,
      src: rivePath,
      autoplay: true,
      stateMachines: "ScrollController",
      onLoad: () => this.init()
    });
  }

  init() {
    this.stateMachine = this.rive.stateMachineInputs("ScrollController");
    window.addEventListener("scroll", () => this.handleScroll());
    this.handleScroll();
  }

  handleScroll() {
    const scrollPercent =
      window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight);

    for (const [animName, range] of Object.entries(this.animations)) {
      if (scrollPercent >= range.min && scrollPercent <= range.max) {
        if (this.currentAnimation !== animName) {
          this.currentAnimation = animName;
          this.playAnimation(animName);
        }
        break;
      }
    }
  }

  playAnimation(animationName) {
    this.stateMachine.forEach((input) => {
      if (input.name === animationName) {
        input.fire();
      }
    });
  }
}

// IMPORTANT: this must match your uploaded .riv filename exactly
new ScrollAnimationController("riveCanvas", "scroll-activated-animations.riv");

// Smooth scroll
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
