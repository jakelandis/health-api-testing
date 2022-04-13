Mixed Cluster Docker for testing
----------

Build local docker distribution for both master and latest-1 (ie. if master is 8.0.0 then latest-1 is the 7.x branch)

Do this for both the master branch and latest-1 branch
```bash
./gradlew :distribution:docker:assemble
```

Ensure docker images are installed, we should have the latest and latest-1 images (also ensure create time is correct)
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