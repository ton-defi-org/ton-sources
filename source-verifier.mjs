import { promisify } from 'util';
import { exec } from 'child_process'
const execAsync = promisify(exec);
import {Cell} from "ton"
import { writeFile, readFile } from 'fs/promises';
import fs from 'fs';
import https from "https"
import { rejects } from 'assert';

function randomStr(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function dlFiles(files) {
    let downloadedFiles = [];
    for (let i = 0; i < files.length; i++) {
        const url = files[i];
        downloadedFiles.push(await downloadFile(url))
    }
    return downloadedFiles;
}


async function downloadFile(url) {
    return new Promise((resolve, reject) => {
        
        const filename = url.split('/').pop();
        const filePath = `./tmp/${filename}`;
        const file = fs.createWriteStream(filePath);
        
        const request = https.get(url, function(response) {
            response.pipe(file);
            
            // after download completed close filestream
            file.on("finish", () => {
                file.close();
                console.log("Download Completed");
                resolve(filePath)
            });
        });
    })
}


async function compileFuncToCodeHash(funcExecutable ,funcFiles) {
    let out = randomStr(10);
    let fiftOutFile = `build/${out}.fif`;
    try {
        
        await execAsync(`${funcExecutable} -o ${fiftOutFile}  -SPA ${funcFiles.join(" ")}`);
    } catch (e) {
        console.log(e.message);
    }
    const codeCell = await fiftToCodeCell(fiftOutFile);
    return codeCell.hash().toString('base64');
}


async function fiftToCodeCell(fiftFile) {
    let b64OutFile = `${fiftFile}-b64.cell`;

    let fiftCellSource = `"${fiftFile}" include \n
boc>B "${b64OutFile}" B>file`;

    const tmpB64Fift = `./tmp/${randomStr(10)}.cell.tmp.fif`;
    try {
        await writeFile(tmpB64Fift, fiftCellSource)
    } catch (e) {
        console.log(e);
    }
   
    
    await execAsync(`fift -s ${tmpB64Fift}`);
    //await unlink(fiftCellSource);
    //await unlink(fiftOutFile);

    const codeCellHex = Cell.fromBoc(await readFile(b64OutFile))[0];
    return codeCellHex;
}




export async function verify(data) {
    let downloadedFiles = await dlFiles(data.sources);
    console.log({downloadedFiles});
    let codeCellHash = (await compileFuncToCodeHash(`func`, downloadedFiles)).toString("base64");
    
    console.log(`codeCellHash: ${codeCellHash}  === ${data.codeHash}`);
    return codeCellHash == data.sourcesHash;
}