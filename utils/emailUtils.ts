export function generateRandomEmail(): string {
    const timestamp = new Date().getTime() + Math.floor(Math.random() * 1000)
    return `user${timestamp}@test.com`
}