import urllib.request

thumb_url = "https://i.pinimg.com/videos/thumbnails/originals/9f/69/d8/9f69d81c96e42e6ce711b2cc62b97c3e.0000000.jpg"
req = urllib.request.Request(thumb_url, headers={'User-Agent': 'Mozilla/5.0'})

try:
    with urllib.request.urlopen(req) as resp:
        with open("pinterest_thumb.jpg", "wb") as f:
            f.write(resp.read())
        print("Downloaded pinterest_thumb.jpg successfully!")
except Exception as e:
    print("Thumb error:", e)

# Test potential video URLs
candidates = [
    "https://v.pinimg.com/videos/mc/720p/9f/69/d8/9f69d81c96e42e6ce711b2cc62b97c3e.mp4",
    "https://v.pinimg.com/videos/mc/expMp4/9f/69/d8/9f69d81c96e42e6ce711b2cc62b97c3e_t1.mp4",
    "https://v.pinimg.com/videos/v720P/9f/69/d8/9f69d81c96e42e6ce711b2cc62b97c3e.mp4"
]

for c in candidates:
    try:
        req2 = urllib.request.Request(c, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req2) as resp:
            print(f"Success video candidate: {c} (code {resp.status})")
            with open("pinterest_video.mp4", "wb") as f:
                f.write(resp.read(5000000)) # up to 5MB
            print("Saved pinterest_video.mp4!")
            break
    except Exception as e:
        print(f"Failed candidate {c}: {e}")

