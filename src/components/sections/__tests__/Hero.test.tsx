import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "@/components/sections/Hero";

describe("Hero", () => {
  it("renders the main heading, trust row, and quote card without crashing", () => {
    render(<Hero />);
    expect(screen.getAllByText(/Healthcare/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/50,000\+ Patients Assisted/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Let Us Help You/i).length).toBeGreaterThan(0);
  });
});
