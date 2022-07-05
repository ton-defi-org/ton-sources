import { writeFileSync } from 'fs';
import { create } from 'ipfs-http-client'
import fs from 'fs';
import http from 'http';

const DOWNLOAD_FOLDER = "./dl/";

// connect to the default API address http://localhost:5001
const client = create(); //

async function ipfsAdd() {
    
    
    const data  = await client.get('QmPbxeGcXhYQQNgsC6a36dDyYUcHgMLnGKnF8pVFmGsvqi')
    
    let contents = ""
    let chunks = []
    
    for await(const item of data){
        console.log('chunck');
        // turn string buffer to string and append to contents
        chunks.push(item)
    }
    
    writeFileSync("./monkey.png",  Buffer.concat(chunks))
}

export async function ipfsDL(cid, fileName) {
    
    const file = fs.createWriteStream(`${DOWNLOAD_FOLDER}${fileName}`);
    console.log(`ipfsDL => filename: ${fileName}`);
    return new Promise( (resolve)=> {
        http.get("http://127.0.0.1:8080/ipfs/" + cid, function (response) {
            console.log('res ... waiting for pipe end');
            response.pipe(file, { end: true}).on("finish", ()=> {
                console.log('pipe end');
                console.log("end !!!");
                resolve(`${DOWNLOAD_FOLDER}${fileName}`);
            });
        });
    })

    
}



export async function ipfsUpload(fileData) {
    
    const backedUpFile = {
        content: Buffer.from(fileData)
    };

    let file = await client.add(backedUpFile);

    return file
}




console.log('done');