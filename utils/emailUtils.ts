export function generateRandomEmail(): string {
    const timestamp = new Date().getTime() + Math.floor(Math.random() * 1000)
    const random = Math.floor(Math.random() * 1000)
    return `bitAlliance${timestamp}@test${random}.com`
}