;((root) => {
  const headDom = root.document.head
  const bodyDom = root.document.body
  const scripts = [
    'https://cdn.jsdelivr.net/npm/highlight.js@9.12.0/lib/highlight.js',
    'https://cdn.jsdelivr.net/npm/katex@0.10.0-beta/dist/katex.min.js'
  ]
  scripts.forEach((link) => {
    const scriptDom = root.document.createElement('script')
    scriptDom.src = link
    bodyDom.appendChild(scriptDom)
  })
})(window)
