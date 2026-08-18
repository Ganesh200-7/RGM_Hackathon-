/**
 * Pexels Video Integration Service with robust offline fallback URLs.
 */

// Fallback high-quality vertical/portrait MP4 video streams with 100% open CORS access
const FALLBACK_VIDEOS: Record<number, string> = {
  1: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  2: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  3: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoylikes.mp4',
  5: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  6: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
};

const CACHE_KEY = 'reelsmart_pexels_video_cache_v1';

export async function fetchReelVideoUrl(reelIndex: number, query: string): Promise<string> {
  const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

  // Check sessionStorage cache first
  try {
    const cached = sessionStorage.getItem(`${CACHE_KEY}_${reelIndex}`);
    if (cached) return cached;
  } catch (e) {
    // Ignore storage restrictions
  }

  // If no API key is provided, return high-quality fallback stream immediately
  if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_key')) {
    return FALLBACK_VIDEOS[reelIndex] || FALLBACK_VIDEOS[1];
  }

  try {
    const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&orientation=portrait&per_page=3`;
    const res = await fetch(url, {
      headers: {
        Authorization: apiKey
      }
    });

    if (!res.ok) {
      console.warn(`Pexels API returned status ${res.status}. Falling back to default video.`);
      return FALLBACK_VIDEOS[reelIndex] || FALLBACK_VIDEOS[1];
    }

    const data = await res.json();
    const video = data.videos?.[0];
    // Find HD portrait file link
    const videoFile = video?.video_files?.find((f: any) => f.quality === 'hd' || f.quality === 'sd') || video?.video_files?.[0];

    if (videoFile?.link) {
      try {
        sessionStorage.setItem(`${CACHE_KEY}_${reelIndex}`, videoFile.link);
      } catch (e) {}
      return videoFile.link;
    }
  } catch (err) {
    console.warn(`Pexels fetch failed for query "${query}":`, err);
  }

  return FALLBACK_VIDEOS[reelIndex] || FALLBACK_VIDEOS[1];
}
