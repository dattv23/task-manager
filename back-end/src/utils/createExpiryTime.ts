export default function createExpiryTime(minutes: number): Date {
  const currentTime = new Date()
  return new Date(currentTime.setMinutes(currentTime.getMinutes() + minutes))
}
