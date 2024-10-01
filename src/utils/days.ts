import dayjs from "dayjs"

const monthStrObj: { [key: string]: string } = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
}

export const getDay = (date: Date | string) => {
  const dateObj = dayjs(date)
  const [Y, M, D] = dateObj
    .format("YYYY MM DD")
    .split(" ")
    .map((str) => str.replace(/^[0]/, ""))
  return `${monthStrObj[M] ?? null} ${D} ${Y}`
}
