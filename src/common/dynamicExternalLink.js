;((root) => {
  const headDom = root.document.head
  const bodyDom = root.document.body
  const links = [
    'https://cdn.jsdelivr.net/npm/github-markdown-css@2.10.0/github-markdown.min.css',
    'https://cdn.jsdelivr.net/npm/highlight.js@9.12.0/styles/github.css',
    'https://cdn.jsdelivr.net/npm/katex@0.10.0-beta/dist/katex.min.css'
  ]
  const scripts = [
    'https://cdn.jsdelivr.net/npm/highlight.js@9.12.0/lib/highlight.js',
    'https://cdn.jsdelivr.net/npm/katex@0.10.0-beta/dist/katex.min.js'
  ]
  links.forEach((link) => {
    const linkDom = root.document.createElement('link')
    linkDom.rel = 'stylesheet'
    linkDom.href = link
    headDom.appendChild(linkDom)
  })
  scripts.forEach((link) => {
    const scriptDom = root.document.createElement('script')
    scriptDom.src = link
    bodyDom.appendChild(scriptDom)
  })
})(window)
