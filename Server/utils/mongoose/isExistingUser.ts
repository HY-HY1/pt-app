import UserModel from "@models/userModel";

export default async function isExistingUser(_id:string) {
    try {
        const existingUser = await UserModel.findOne({_id: _id})

        if(!existingUser) {
            throw new Error('User was not found')
        }

        return existingUser
    } catch (error) {
        console.error(error)
        return
    }
}