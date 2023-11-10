import  fs from 'fs';
import meter from 'stream-meter'
export default async function writeFile(file: any, pathToSave: string ): Promise<number>{
    const m = meter();
    return new Promise((resolve, reject)=>{
        try{
            file.pipe(m).pipe(fs.createWriteStream(pathToSave));
            file.on("end", () => {
                resolve(m.bytes)
            });
        }catch(err){
            reject(err)
        }
    });
}