interface SectionItemProps {
  label: string
  value?: string | number
}

export default function SectionItem({ label, value }: SectionItemProps) {
  return (
    <div>
      <p className="text-medium text-xs mb-1">{label}</p>
      <p className="text-medium text-xs font-semibold">{value || "-"}</p>
    </div>
  )
}
