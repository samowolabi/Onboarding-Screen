const staticPianoEncyclopedia = "pianoencyclopedia-global-v1"
const assets = [
    "/",
    "/index.html",
    "/logo-transparent-BG.png",
    "/icons/icon-192x192.png",
    "/icons/icon-256x256.png",
    "/icons/icon-384x384.png",
    "/icons/icon-512x512.png"
]  

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticPianoEncyclopedia).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
})