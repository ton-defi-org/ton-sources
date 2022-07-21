### Ipfs examples

### uploading text

curl -F "image=doron124" http://localhost/add

### uploading file named dog

curl -F "image=@dog" http://localhost/add

curl -F "image=@dog" http://localhost/add?metadata=mempol:1

curl -F "text=mempoldata" http://localhost/add?metadata=mempol:1

### should run this after add

curl http://127.0.0.1:9094/pins/QmZvrCDzitAGPeuJ5GcS7q3zL8sDdPxH8VE3Yb1Cx1H3ST

curl -F "text=mempoldata2" http://localhost/add?metadata=mempol:2

curl -g '127.0.0.1:9097/pins?meta={"mempool":"1"}'

### add with meta tags

curl -F "text=mempoldata11" http://localhost/add?meta-type=mempool
