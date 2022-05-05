# visual-studio w/elasticsearch plugin

GET _cat/nodes?format=text&v

GET /_internal/_health

GET /_internal/_health/data/shards_availability

POST _slm/start

GET /

GET _cat/component_templates


GET _internal/_health/data/ilm



GET /_cat/health

GET _cat/shards?format=text

# get the ip for minio 
# docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' minio
# visit http://172.29.0.2:9000/login  and create test bucket

PUT _snapshot/my_minio_repository
{
    "type": "s3",
    "settings": {
        "bucket": "test",
        "endpoint": "172.29.0.2:9000",
        "protocol": "http"
    }
}


PUT /_slm/policy/daily-snapshots
{
  "schedule": "0 30 1 * * ?", 
  "name": "<daily-snap-{now/d}>", 
  "repository": "my_minio_repository", 
  "config": { 
    "indices": ["data-*", "important"], 
    "ignore_unavailable": false,
    "include_global_state": false
  },
  "retention": { 
    "expire_after": "30d", 
    "min_count": 5, 
    "max_count": 50 
  }
}

POST data-test/_doc/1
{
    "a" : true
}


POST data-test/_forcemerge

GET data-test/_search

POST _slm/policy/daily-snapshots/_execute

GET _snapshot/_status

GET _snapshot/my_minio_repository/_current

PUT /_snapshot/my_minio_repository/snapshot_3?wait_for_completion=true
{
  "indices": "*",
  "ignore_unavailable": true,
  "include_global_state": false,
  "metadata": {
    "taken_by": "user123",
    "taken_because": "backup before upgrading"
  }
}
GET test-index

DELETE test-index

DELETE data-test

POST /_snapshot/my_minio_repository/snapshot_3/_restore?wait_for_completion=true
{
  "indices": "data-test",
  "ignore_unavailable": true,
  "include_global_state": false,
  "rename_pattern": "data-(.+)",
  "rename_replacement": "$1",
  "include_aliases": false
}

GET _cat/indices

GET _cluster/state



POST /_snapshot/my_minio_repository/_verify

DELETE test-index

GET _ingest/geoip/stats

PUT _cluster/settings
{
  "persistent" : {
    "cluster.routing.allocation.enable" : "none"
  }

}

PUT _data_stream/foo

PUT test17/_doc/1
{}

GET _cat/indices

DELETE test1*?expand_wildcards=all

PUT test-index
{
    "settings" : { 
        "index.routing.allocation.require._tier_preference": "data_warm",
                "number_of_shards" : 2,
                "number_of_replicas" : 0

    }
}

GET test-index

GET _cat/shards

GET /


PUT _cluster