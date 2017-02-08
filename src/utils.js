export const formatTime = secs => {
    let hours = Math.floor(secs / 3600) || 0;
    let minutes = Math.floor(secs / 60) || 0;
    let seconds = (secs - minutes * 60) || 0;
    let formatted = "";

    if (hours > 0) {
      minutes = (minutes - hours * 60) || 0;
      formatted += `${hours}:${(minutes < 10 ? "0" : "")}`;
    }

    formatted += `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;

    return formatted;
};
