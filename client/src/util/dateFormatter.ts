export const dateFormatter = (value: string) => {
  const date = new Date(value)
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}