import  fs from 'fs';
export default async function writeFile(file: any, pathToSave: string ){
    return new Promise((resolve, reject)=>{
        try{
            file.pipe(fs.createWriteStream(pathToSave));
            file.on("end", () => {
                console.log("File upload completed!");
                console.log("file: ", file)
                resolve(true)
            });
        }catch(err){
            reject(err)
        }
    });
}