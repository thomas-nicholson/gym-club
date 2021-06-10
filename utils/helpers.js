const format_time = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('en-us', { month: 'short' });;
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  
  module.exports = {
      format_time,
    };