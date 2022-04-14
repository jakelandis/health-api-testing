Health API testing
----------

3 node cluster with a single master elible node. Security disabled.

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

Double check the versions and send command directly to desired host

```bash
curl -v localhost:9200
curl -v localhost:9201
curl -v localhost:9202
```

Optional: In `docker-compose.yml` uncomment Kibana and point it to the desired host.


To upgrade a node, change the version then
```bash

docker-compose up -d --no-deps elasticsearch[1|2|3]
```

To stop the master node 
```
docker-compose stop elasticsearch1
```