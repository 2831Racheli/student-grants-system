export const Calander = ({ basicCalender, myName, myBacColor, myColor}) => {
  const monthColors = [
    "#FF6B6B", "#00C9A7", "#4D96FF", "#FFD93D", "#C74B50",
    "#845EC2", "#6BCB77", "#F9C80E", "#F86624", "#2C73D2",
    "#F25F5C", "#3C91E6"
  ];

  return (
    <>
      <h1 className="calendar-title">{myName}</h1>
      <div className="calendar">
        {basicCalender.Mounths.map((mounths, i) => {
          const monthColor = monthColors[i % monthColors.length];
          return (
            <div className="month-section" style={{ "--month-color": monthColor }} key={i}>
              <h2 className="month-title">{mounths.name}</h2>
              <div className="month-grid">
                {Array.from({ length: mounths.Days[0].dayOfWeek - 1 }, (_, j) => (
                  <div className="day-box empty" key={`empty-${j}`}></div>
                ))}
                {mounths.Days.map((days, j) => (
                  <div
                    key={j}
                    className="day-box"
                    style={{
                      backgroundColor: myBacColor,
                      color: myColor,
                      borderColor: monthColor,
                      "--month-color": monthColor
                    }}
                  >
                    <h4>{days.name}</h4>
                    {days.events.map((e, k) => (
                      <div key={k} className="event-item">
                        <strong>{e.text}</strong>
                        <span>{e.type}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}