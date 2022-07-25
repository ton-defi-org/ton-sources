import fs from 'fs';
import {ipfsUpload, ipfsDL} from "./ipfs-cluster-api.mjs";
import express from "express";
import { exec } from 'child_process';
import cors from 'cors';
import {verify} from "./source-verifier.mjs"

const app = express()
app.use(cors());
app.use(express.json());
const port = 3003

app.get('/', async (req, res) => {
  res.send('ton-sources!')
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
    const out = exec("./ipfs-cluster-ctl pin ls ");
    res.send(out);  
})

app.post("/source-upload", async (req, res) => {
  let data = req.body
  let isVerified = verify(data);
  res.send(data)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  