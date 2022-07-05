### Ton Sources 
Concept: Storing contract sources on ipfs with a valid proof based on the contracts code hash

### express server to expose IPFS cluster
`npm run server`



### Ipfs Commands 


#### connect to cluster 
`ipfs-cluster-service daemon --bootstrap  <multicast address>`

#### ls all pinned files in cluster 
`ipfs-cluster-ctl pin ls` 


#### tunnel to ifps machine through ssh tunnel 
`ssh  ubuntu@x.x6.42.x00  -L 5001:localhost:5001  -L 8080:localhost:8080:`

this command tunnels the vps traffic from 5001 and 8080 to local machine , so the nodejs server can communicate with cluster as if it was running on the same machine.
