export function getAssetPath(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  
  // Normalize path removing redundant prefixes
  const cleanPath = path
    .replace(/^\/?sireeshapuduru\//, '')
    .replace(/^\//, '');

  if (typeof window !== 'undefined') {
    // Check if hosted on GitHub Pages repository subpath
    if (window.location.pathname.startsWith('/sireeshapuduru')) {
      return `/sireeshapuduru/${cleanPath}`;
    }
    return `/${cleanPath}`;
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}/${cleanPath}`.replace(/\/+/g, '/');
}
