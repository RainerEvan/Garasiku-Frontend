interface SectionItemProps {
  label?: string
  value?: string | number
  className?: string
}

export default function SectionItem({ 
  label = "Label", 
  value = "-",
  className = ""
}: SectionItemProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <p className="text-medium text-xs mb-1">{label}</p>
      <p className="text-medium text-xs font-semibold">{value}</p>
    </div>
  )
}
