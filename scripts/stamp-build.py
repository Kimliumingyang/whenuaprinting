"""Give each deployed CSS/JS resource an immutable revision URL."""
import json
import re
import sys
from pathlib import Path

root = Path(sys.argv[1])
revision = sys.argv[2]
for page in root.glob('*.html'):
    html = page.read_text()
    html = re.sub(r'((?:href|src)=[\"\'])(styles/[^\"\'?]+\.css|scripts/[^\"\'?]+\.js)(?:\?[^\"\']*)?([\"\'])',
                  lambda match: f'{match[1]}{match[2]}?build={revision}{match[3]}', html)
    html = html.replace('</head>', f'<meta name="site-build" content="{revision}"></head>')
    page.write_text(html)
(root / 'build-info.json').write_text(json.dumps({'revision': revision}))
