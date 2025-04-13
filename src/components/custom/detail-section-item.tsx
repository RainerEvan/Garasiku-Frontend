interface DetailSectionItemProps {
  label: string
  value: string | number
}

export default function DetailSectionItem({ label, value }: DetailSectionItemProps) {
  return (
    <div>
      <p className="text-medium text-sm mb-1">{label}</p>
      <p className="text-medium text-sm font-semibold">{value || "-"}</p>
    </div>
  )
}
