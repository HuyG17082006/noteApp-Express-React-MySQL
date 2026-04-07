import bcrypt from 'bcrypt'

export default {
    hashing : async (data) => {

        const salt = await bcrypt.genSalt(10);
        const hashData = await bcrypt.hash(data, salt);

        return hashData;          
    },

    compare : async (data, hashData) => {
        return await bcrypt.compare(data, hashData);
    }
}