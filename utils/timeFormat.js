

const date = date => {
return new Date(date).toLocaleDateString("en-GB", {
  weekday: "long",
  // weekday: 'short',
  day: "numeric",
  month: "short",
  year: "numeric"
});
}

const shortDate = date => {
return new Date(date).toLocaleDateString('en-GB', {  
  day: 'numeric',
	month : 'short',
});
}


const time = time => {
  return new Date(time).toLocaleTimeString("fi-FI", {
    hour: "2-digit",
    minute: "2-digit"
  });
};


module.exports = {
  date,
  time,
  shortDate
}
