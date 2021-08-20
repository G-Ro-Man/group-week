function week(date) {
  const day = new Date(date).getUTCDay();
  const offset = day > 0 ? day - 1 : day + 6;
  return new Date(new Date(date) - offset * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
}
function groupWeeks(data) {
  const res = data
    .reduce((total, el) => {
      const weekStart = week(el.date);
      const idx = total.findIndex((e) => e.weekStart === weekStart);
      if (idx >= 0) {
        total[idx].count += el.count;
        total[idx].times += 1;
        return total;
      }
      total.push({
        weekStart,
        count: el.count,
        times: 1,
      });
      return total;
    }, [])
    .reduce((total, el) => {
      total.push({
        weekStart: el.weekStart,
        count: (el.count / el.times).toFixed(2),
      });
      return total;
    }, []);
  return res.sort((a, b) => new Date(a.weekStart) - new Date(b.weekStart));
}
