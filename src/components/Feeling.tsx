

interface Props {
    date: string,
    text: string
}
export const Feeling = ({date, text}: Props) => {
  return (
    <div className="feeling-card">
        <h2>{date}</h2>
        <p>{text}</p>
    </div>
  )
}
