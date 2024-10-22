import bcrypt from 'bcrypt'


export default async function hashString(string:string) {
    const hashedString = await bcrypt.hash(string, 10)

    return hashedString
}