Health API testing
----------

3 node cluster with a single master elible node. Security disabled.


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