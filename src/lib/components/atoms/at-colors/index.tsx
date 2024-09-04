export function Colors() {
  const primaryHsl = [176, 73, 34]
  const destructiveHsl = [0, 100, 50]
  const secondaryHsl = [210, 40, 96.1]

  const renderColors = (name: string, hsl: number[]) => {
    return (
      <div className="flex items-center gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={`${name}-color-${index}`} className="flex items-center space-x-2">
            <div
              className="w-8 h-8 rounded-full"
              style={{
                backgroundColor: `hsl(${hsl[0]}, ${hsl[1] - (index - 1) * 4}%, ${hsl[2] + (index - 1) * 11}%)`
              }}></div>
            <div className="text-sm">Primary {index}</div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div>
      {/* primary */}
      {renderColors('primary', primaryHsl)}
      {/* destructive */}
      {renderColors('destructive', destructiveHsl)}
      {/* secondary */}
      {renderColors('secondary', secondaryHsl)}
    </div>
  )
}
