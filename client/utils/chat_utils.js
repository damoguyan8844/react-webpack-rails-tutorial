export function checkAndReplaceUrlIfNeeded(url) {
	if (!url) return url;
	return url.indexOf('/images/no_photo_small.png') !== -1 ? '/images/no_photo_thumb.png' : url
}