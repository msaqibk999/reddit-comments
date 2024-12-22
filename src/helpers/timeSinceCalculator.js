export function timeSince(timeStamp) {
  const now = new Date();

  // Ensure timeStamp is a Date object
  if (!(timeStamp instanceof Date)) {
    timeStamp = new Date(timeStamp);
  }

  const secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;

  if (secondsPast < 60) {
    return `Just now`;
  }
  if (secondsPast < 3600) {
    return `${Math.floor(secondsPast / 60)}m ago`;
  }
  if (secondsPast < 86400) {
    return `${Math.floor(secondsPast / 3600)}h ago`;
  }
  if (secondsPast >= 86400) {
    const day = timeStamp.getDate();
    const month = timeStamp.toLocaleString("default", { month: "short" }); 
    const year =
      timeStamp.getFullYear() === now.getFullYear()
        ? ""
        : ` ${timeStamp.getFullYear()}`;
    return `${day} ${month}${year}`;
  }
}
