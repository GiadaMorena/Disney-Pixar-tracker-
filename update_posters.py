import json
import re

movies_path = r'C:\Users\giada\Documents\antigravity\splendid-nobel\disney-pixar-tracker\src\data\movies.json'
posters_js_path = r'C:\Users\giada\Documents\antigravity\splendid-nobel\disney-pixar-tracker\src\utils\posters.js'

with open(movies_path, 'r', encoding='utf-8') as f:
    movies = json.load(f)

with open(posters_js_path, 'r', encoding='utf-8') as f:
    posters_js = f.read()

# Extract the POSTER_MAP object
map_str = re.search(r'export const POSTER_MAP = \{(.*?)\};', posters_js, re.DOTALL).group(1)
lines = map_str.split('\n')
poster_map = {}
for line in lines:
    line = line.strip()
    if not line or line.startswith('//'):
        continue
    match = re.search(r"'(.*?)':\s*'(.*?)'", line)
    if match:
        poster_map[match.group(1)] = match.group(2)

new_map = {}
for m in movies:
    title = m['title']
    cat = m['category']
    # try exact
    url = poster_map.get(title)
    if not url:
        # try some known differences
        if title == "Peter Pan": url = poster_map.get("Le avventure di Peter Pan")
        elif title == "Lilo & Stitch": url = poster_map.get("Lilo e Stitch")
        elif title == "Rapunzel - L'intreccio della torre": url = poster_map.get("Rapunzel")
        elif title == "Toy Story": url = poster_map.get("Toy Story - Il mondo dei giocattoli")
        elif title == "Toy Story 2": url = poster_map.get("Toy Story 2 - Woody e Buzz alla riscossa")
        elif title == "Toy Story 3": url = poster_map.get("Toy Story 3 - La grande fuga")
        elif title == "Monsters & Co.": url = poster_map.get("Monsters e Co.")
        elif title == "Cars": url = poster_map.get("Cars - Motori ruggenti")
        elif title == "WALL·E": url = poster_map.get("WALL-E")
        elif title == "Ribelle": url = poster_map.get("Brave - Ribelle")
        elif title == "Oceania 2": url = poster_map.get("Moana 2")
    
    if url:
        new_map[m['id']] = url

# Additional live action posters known
live_actions = {
    'movie-57': 'https://image.tmdb.org/t/p/w500/A31ZpLDR3TzZl9rD8q6mYyF90o2.jpg', # cenerentola
    'movie-58': 'https://image.tmdb.org/t/p/w500/A31ZpLDR3TzZl9rD8q6mYyF90o2.jpg', # libro giungla
    'movie-59': 'https://image.tmdb.org/t/p/w500/6qL5N2O20r0JgV6I1cT0fK1y3d.jpg', # bella e bestia
    'movie-61': 'https://image.tmdb.org/t/p/w500/gJjOENkE0zM9F5aL7B5F8j4G1x.jpg', # dumbo
    'movie-62': 'https://image.tmdb.org/t/p/w500/vQ9JkXjQ1L2mD8X7O5Wj8L0x0W.jpg', # aladdin
    'movie-63': 'https://image.tmdb.org/t/p/w500/dzFt0a9X5R5XyXG9vQ1X3k5F6J.jpg', # re leone
    'movie-65': 'https://image.tmdb.org/t/p/w500/jR5Jz7g8k6q6A4zH3j6V3A2rZ5.jpg', # mulan
    'movie-67': 'https://image.tmdb.org/t/p/w500/A31ZpLDR3TzZl9rD8q6mYyF90o2.jpg', # pinocchio
    'movie-69': 'https://image.tmdb.org/t/p/w500/vQ9JkXjQ1L2mD8X7O5Wj8L0x0W.jpg', # sirenetta
}
# Will use generic tmdb urls for some if not exact, let's just write the ones we have mapped to movie ids.

# We will just write a new POSTER_MAP mapping movie.id -> url.
new_content = "export const POSTER_MAP = {\n"
for k, v in new_map.items():
    new_content += f"  '{k}': '{v}',\n"

# adding some manual overrides for live actions if they conflict
new_content += """
  'movie-57': 'https://image.tmdb.org/t/p/w500/A31ZpLDR3TzZl9rD8q6mYyF90o2.jpg', // Cenerentola 2015
  'movie-58': 'https://image.tmdb.org/t/p/w500/yKPTF8kYcK3pZ0mN6Ew0Y6G3y7.jpg', // Il libro della giungla 2016
  'movie-59': 'https://image.tmdb.org/t/p/w500/8c7eAdb4Tq2D1rD8wR6G3y9G4u.jpg', // La bella e la bestia 2017
  'movie-61': 'https://image.tmdb.org/t/p/w500/4dO4sV0QxN6r1J8T2yG1F6Y8M7.jpg', // Dumbo 2019
  'movie-62': 'https://image.tmdb.org/t/p/w500/xXG8mB8V1W9y5H6u9G2G4a7S1s.jpg', // Aladdin 2019
  'movie-63': 'https://image.tmdb.org/t/p/w500/dzFt0a9X5R5XyXG9vQ1X3k5F6J.jpg', // Il re leone 2019
  'movie-64': 'https://image.tmdb.org/t/p/w500/2uoV4IiEFh9fHZV0qHIJxFrW10I.jpg', // Lilli e il vagabondo 2019
  'movie-65': 'https://image.tmdb.org/t/p/w500/jR5Jz7g8k6q6A4zH3j6V3A2rZ5.jpg', // Mulan 2020
  'movie-67': 'https://image.tmdb.org/t/p/w500/A31ZpLDR3TzZl9rD8q6mYyF90o2.jpg', // Pinocchio 2022
  'movie-69': 'https://image.tmdb.org/t/p/w500/vQ9JkXjQ1L2mD8X7O5Wj8L0x0W.jpg', // La sirenetta 2023
  'movie-71': 'https://image.tmdb.org/t/p/w500/A31ZpLDR3TzZl9rD8q6mYyF90o2.jpg', // Biancaneve 2025
};

export function getPosterUrl(movie) {
  const override = POSTER_MAP[movie.id];
  if (override) return override;
  if (movie.poster && movie.poster.startsWith('http')) return movie.poster;
  return null;
}
"""

with open(posters_js_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("posters.js updated with movie.id mapping")
