import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "@/components/sections/Hero";

describe("Hero", () => {
  it("renders the main heading, trust row, and search card without crashing", () => {
    render(<Hero />);
    expect(screen.getAllByText(/Medical Tourism/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Accredited Hospitals/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Find Treatment/i).length).toBeGreaterThan(0);
  });
});
