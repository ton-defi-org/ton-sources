import fs from 'fs';
import {ipfsUpload, ipfsDL} from "./ipfs-cluster-api.mjs";


import express from "express";
import { exec } from 'child_process';
const app = express()
const port = 3000

app.get('/', async (req, res) => {
  res.send('Hello World!')
})


app.get('/upload-ipfs', async (req, res) => {
    let data = await ipfsDL(request.query.id, "dog-mayc.png");
    res.send('Hello World!')
  })


app.get('/download-ipfs/:cid', async (req, res) => {
    let path = await ipfsDL(req.params.cid, "dog-mayc.png");
     console.log(`path: ${path}`);
    
    fs.createReadStream(path).pipe(res);
})


app.get('/ipfs-ls', async (req, res) => {
    exec("./")
    let path = await ipfsDL(req.params.cid, "dog-mayc.png");
     console.log(`path: ${path}`);
    
    fs.createReadStream(path).pipe(res);
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  