import "@testing-library/jest-dom/vitest";

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// framer-motion's useInView (used by this app's FadeIn/StaggerContainer helpers)
// requires IntersectionObserver, which jsdom doesn't implement.
globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
