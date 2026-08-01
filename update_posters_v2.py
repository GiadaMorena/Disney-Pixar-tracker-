import json

movies_path = r'C:\Users\giada\Documents\antigravity\splendid-nobel\disney-pixar-tracker\src\data\movies.json'
posters_js_path = r'C:\Users\giada\Documents\antigravity\splendid-nobel\disney-pixar-tracker\src\utils\posters.js'

with open(movies_path, 'r', encoding='utf-8') as f:
    movies = json.load(f)

# Extract existing URLs from posters.js to reuse them
import re
with open(posters_js_path, 'r', encoding='utf-8') as f:
    posters_js = f.read()
map_str = re.search(r'export const POSTER_MAP = \{(.*?)\};', posters_js, re.DOTALL).group(1)

url_map = {}
for line in map_str.split('\n'):
    line = line.strip()
    if not line or line.startswith('//'): continue
    match = re.search(r"'(.*?)':\s*'(.*?)'", line)
    if match:
        url_map[match.group(1)] = match.group(2)

new_content = "export const POSTER_MAP = {\n"

# First put all movie.id keys
for m in movies:
    movie_id = m['id']
    url = url_map.get(movie_id)
    if url:
        new_content += f"  '{movie_id}': '{url}',\n"

# Then put all movie.title keys as fallbacks
for m in movies:
    movie_id = m['id']
    url = url_map.get(movie_id)
    if url:
        # escape single quotes in title
        title_escaped = m['title'].replace("'", "\\'")
        new_content += f"  '{title_escaped}': '{url}',\n"

new_content += """};

export function getPosterUrl(movie) {
  let url = null;
  if (movie.id) {
    const idStr = String(movie.id).startsWith('movie-') ? movie.id : `movie-${movie.id}`;
    url = POSTER_MAP[idStr];
  }
  if (!url && movie.title) {
    url = POSTER_MAP[movie.title];
  }
  if (url) return url;
  if (movie.poster && movie.poster.startsWith('http')) return movie.poster;
  return null;
}
"""

with open(posters_js_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("posters.js updated with both id and title fallbacks")
