import { render, screen, fireEvent } from "@testing-library/react"
import { PokemonPagination } from "@/components/pokemon-pagination"

describe("PokemonPagination", () => {
  const onPageChange = jest.fn()

  beforeEach(() => {
    onPageChange.mockReset()
  })

  // ── Happy path ──

  it("renders current page and total", () => {
    render(
      <PokemonPagination totalPages={5} page={2} onPageChange={onPageChange} />
    )

    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument()
  })

  it("calls onPageChange with previous page on prev click", () => {
    render(
      <PokemonPagination totalPages={5} page={3} onPageChange={onPageChange} />
    )

    fireEvent.click(screen.getAllByRole("button")[0])

    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it("calls onPageChange with next page on next click", () => {
    render(
      <PokemonPagination totalPages={5} page={3} onPageChange={onPageChange} />
    )

    fireEvent.click(screen.getAllByRole("button")[1])

    expect(onPageChange).toHaveBeenCalledWith(4)
  })

  // ── Unhappy path ──

  it("renders nothing when totalPages is 1", () => {
    const { container } = render(
      <PokemonPagination totalPages={1} page={1} onPageChange={onPageChange} />
    )

    expect(container.innerHTML).toBe("")
  })

  it("renders nothing when totalPages is 0", () => {
    const { container } = render(
      <PokemonPagination totalPages={0} page={1} onPageChange={onPageChange} />
    )

    expect(container.innerHTML).toBe("")
  })

  it("disables prev button on first page", () => {
    render(
      <PokemonPagination totalPages={5} page={1} onPageChange={onPageChange} />
    )

    const prevButton = screen.getAllByRole("button")[0]
    expect(prevButton).toBeDisabled()
  })

  it("disables next button on last page", () => {
    render(
      <PokemonPagination totalPages={5} page={5} onPageChange={onPageChange} />
    )

    const nextButton = screen.getAllByRole("button")[1]
    expect(nextButton).toBeDisabled()
  })
})
