# rxDisplay

The robot will push pictures of cats by default.

```sh
npm install
```

## POST /in

Send your Instagram stuff to `POST /in` in this format:

```json
{
  "tag": "instagramtag",
  "url": "http://url/to/thumbnail",
  "location": {
    "latitude": 56.9714745,
    "longitude": 24.1291625
  },
  "participant": "change-me"
}
```
