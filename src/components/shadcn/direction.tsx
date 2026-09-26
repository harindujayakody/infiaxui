import * as React from "react"

export type Direction = "ltr" | "rtl"

interface DirectionContextValue {
  direction: Direction
  setDirection: (dir: Direction) => void
  toggleDirection: () => void
}

const DirectionContext = React.createContext<DirectionContextValue>({
  direction: "ltr",
  setDirection: () => {},
  toggleDirection: () => {},
})

export function useDirection(): Direction {
  const context = React.useContext(DirectionContext)
  return context.direction
}

export function useDirectionController() {
  return React.useContext(DirectionContext)
}

export interface DirectionProviderProps {
  direction?: Direction
  defaultDirection?: Direction
  onDirectionChange?: (dir: Direction) => void
  children: React.ReactNode
}

export function DirectionProvider({
  direction: controlledDirection,
  defaultDirection = "ltr",
  onDirectionChange,
  children,
}: DirectionProviderProps) {
  const [uncontrolledDirection, setUncontrolledDirection] = React.useState<Direction>(defaultDirection)
  const isControlled = controlledDirection !== undefined
  const direction = isControlled ? controlledDirection : uncontrolledDirection

  const setDirection = React.useCallback(
    (nextDir: Direction) => {
      if (!isControlled) {
        setUncontrolledDirection(nextDir)
      }
      onDirectionChange?.(nextDir)
    },
    [isControlled, onDirectionChange]
  )

  const toggleDirection = React.useCallback(() => {
    setDirection(direction === "rtl" ? "ltr" : "rtl")
  }, [direction, setDirection])

  return (
    <DirectionContext.Provider value={{ direction, setDirection, toggleDirection }}>
      <div dir={direction} data-direction={direction} className="contents">
        {children}
      </div>
    </DirectionContext.Provider>
  )
}
