import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "@/components/sections/Hero";

describe("Hero", () => {
  it("renders the main heading and primary CTAs without crashing", () => {
    render(<Hero />);
    expect(screen.getByText(/Book Free Consultation/i)).toBeInTheDocument();
    expect(screen.getByText(/WhatsApp/i)).toBeInTheDocument();
  });
});
