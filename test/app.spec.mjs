
import fs from 'fs';
import http from 'http';
import {ipfsUpload, ipfsDL} from "../ipfs-cluster-api.mjs"

import { expect } from "chai";


describe("Ipfs server", () => {
    
    it("should download ipfs from cluster", async () => {
        let data = await ipfsDL("QmPbxeGcXhYQQNgsC6a36dDyYUcHgMLnGKnF8pVFmGsvqi", "dog-mayc.png");
        console.log(`IPFS download file saved at :${data}`);
        
        //expect(data.cid).to.equal("QmPbxeGcXhYQQNgsC6a36dDyYUcHgMLnGKnF8pVFmGsvqi")
    });


    it("should upload IPFS from cluster", async () => {

        let buffer = fs.readFileSync("./images/manga1.jpeg");
        let cid = await ipfsUpload(buffer);
        console.log(cid);
        expect(cid.path).to.be.eq("QmPpwApfbPPNykf39NMsRAYg9AYWbiWt3UpxwFDqdKa9Pj");
    });
})