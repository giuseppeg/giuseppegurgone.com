export default function Time(props) {
  const date = new Date(props.date);
  return (
    <time dateTime={date.toJSON()}>
      {date
        .toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        .toUpperCase()}
    </time>
  );
}
