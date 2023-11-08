import fs from 'fs'

export default async function deleteFile(path: string){
    return new Promise((resolve, reject) => {
        if(!fs.existsSync(path)) resolve(null)
        fs.unlink(path, (err) => {
            if(err) reject(err)
            resolve(null)
        })
    }
    )
}