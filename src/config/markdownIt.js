/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2018-07-30 20:22:27
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2018-07-30 20:33:38
 */
import markdownItAnchor from 'markdown-it-anchor'

export default (mavonEditor) => {
  const markdownIt = mavonEditor.markdownIt

  return () => {
    markdownIt.use(markdownItAnchor)
  }
}
