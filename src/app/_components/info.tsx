const infoItems = [
  {
    title: '活動日',
    content: (
      <p>
        <span>第2,4月曜日</span> 21:00 〜 
      </p>
    ),
  },
  {
    title: '参加校',
    content: (
      <div>
        <a
          href="https://www.tech.ac.jp/"
          target="_blank"
          className="hover:underline hover:opacity-70"
        >
          東京校
        </a>
        <span>・</span>
        <a
          href="https://www.fca.ac.jp/"
          target="_blank"
          className="hover:underline hover:opacity-70"
        >
          福岡校
        </a>
      </div>
    ),
  },
]

export default function Info() {
  return (
    <div className="flex flex-col gap-2">
      {infoItems.map((item, index) => (
        <div
          key={index}
          className="flex text-center text-foreground text-sm tracking-wide"
        >
          <div className="w-full p-3 bg-border rounded-s-md grid place-items-center">
            {item.title}
          </div>
          <div className="w-full p-3 border rounded-e-md">{item.content}</div>
        </div>
      ))}
    </div>
  )
}
