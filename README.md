Health API testing
----------

3 node cluster , 2 data nodes and 1 master (elasticsearch1) with a snapshot repository available. 
Security disabled. 
Custom plain text logger. 

### Access Minio


Access Key:
```
AKIAIOSFODNN7EXAMPLE
```
Secret Key:
```
wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

Find the internal IP address of the minio host and set it up as repository

```
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' minio


PUT _snapshot/my_minio_repository
{
  "type": "s3",
  "settings": {
    "bucket": "test",
    "endpoint": "172.26.0.4:9000",
    "protocol" : "http"
  }
}
```

console (use found IP):
http://172.29.0.2:9000/login (use access/secret key as password ... todo: update to MINIO_ROOT_USER and MINIO_ROOT_PASSWORD)



### Custom build

```bash
./gradlew :distribution:docker:assemble
```


```bash
docker images | grep elasticsearch
```

Update `docker-compose.yml` with the desired versions 

Run
```bash
docker-compose up
```

Ensure all 3 are running and in the same cluster:
```bash
curl localhost:9200/_cat/nodes?v
```


Optional: In `docker-compose.yml` uncomment Kibana and point it to the desired host.


To change a nodes configuration (including upgrading version)
```bash

docker-compose up -d --no-deps elasticsearch[1|2|3]
```

To stop/start the master node 
```
docker-compose stop elasticsearch1
docker-compose start elasticsearch1
```