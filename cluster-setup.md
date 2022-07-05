## Running IPFS cluster on multiple machines 
### Installation 
```
wget https://dist.ipfs.io/go-ipfs/v0.13.0/go-ipfs_v0.13.0_linux-amd64.tar.gz
wget https://dist.ipfs.io/ipfs-cluster-ctl/v1.0.1/ipfs-cluster-ctl_v1.0.1_linux-amd64.tar.gz
wget https://dist.ipfs.io/ipfs-cluster-service/v1.0.1/ipfs-cluster-service_v1.0.1_linux-amd64.tar.gz
tar -xvfz go-ipfs_v0.13.0_linux-amd64.tar.gz
tar xvfz go-ipfs_v0.13.0_linux-amd64.tar.gz
tar xvfz ipfs-cluster-ctl_v1.0.1_linux-amd64.tar.gz
tar ipfs-cluster-service_v1.0.1_linux-amd64.tar.gz
tar xvfz ipfs-cluster-service_v1.0.1_linux-amd64.tar.gz
sudo cp ipfs-cluster-service/ipfs-cluster-service  /usr/local/bin/
sudo cp go-ipfs/ipfs /usr/local/bin/
ipfs version
sudo cp ipfs-cluster-ctl/ipfs-cluster-ctl /usr/local/bin/
```


### Setup Deamon
after installation of all 3 services [download page](https://ipfscluster.io/download/)
1. go-ipfs
2.   [ipfs-cluster-service](https://dist.ipfs.io/#ipfs-cluster-service)
3. [ipfs-cluster-ctl](https://dist.ipfs.io/#ipfs-cluster-ctl	)



#### Running ipfs daemon
1. run ipfs init `ipfs init`
2.  run daemon `ipfs daemon` or `nohup ipfs daemon &` (running on the background)


#### Running ipfs cluster service Main Service
1. Initialize the service `ipfs-cluster-service init`
2. run daemon `ipfs-cluster-service daemon`


#### connect the cluster from a different machine
0. make sure ipfs daemon is running `ipfs daemon`
 1. Initialize the service `ipfs-cluster-service init`
 2. Copy the config file from the previous machine, both machines should share a secret between them
 3. run ipfs cluster with bootstrap flag `ipfs-cluster-service daemon --bootstrap  /ip4/172.31.25.182/tcp/9096/p2p/12D3KooWGsZGdMbn3AyGG7XeSNwv1LfmneLWkT6QLUViToGLhPCz`
4. run `ipfs-cluster-ctl peers ls` to view all connected peers  expected output 
``


#### View Cluster stats 
Open ssh tunnel and expose the cluster endpoints to local machine
`ssh -i  ubuntu@3.16.42.100  -L 5001:localhost:5001  -L 8080:localhost:8080`
navigate to localhost:5001