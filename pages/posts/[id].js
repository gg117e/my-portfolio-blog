import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import { useEffect, useRef } from 'react'

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}

export default function Post({ postData }) {
  const contentRef = useRef(null)

  useEffect(() => {
    if (contentRef.current) {
      const codeBlocks = contentRef.current.querySelectorAll('pre')

      codeBlocks.forEach((pre) => {
        // Check if a copy button already exists to prevent duplicates on re-renders
        if (pre.querySelector('.copy-code-button')) {
          return;
        }

        const code = pre.querySelector('code')
        if (code) {
          const button = document.createElement('button')
          button.className = 'copy-code-button btn btn-sm btn-outline-info'
          button.textContent = 'Copy'

          button.onclick = async () => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              // Modern approach
              try {
                await navigator.clipboard.writeText(code.textContent)
                button.textContent = 'Copied!'
                setTimeout(() => {
                  button.textContent = 'Copy'
                }, 2000)
              } catch (err) {
                console.error('Failed to copy (Clipboard API): ', err)
                button.textContent = 'Error!'
              } finally {
                document.body.removeChild(textarea)
              }
            } else if (document.execCommand) {
              // Fallback for older browsers
              const textarea = document.createElement('textarea')
              textarea.value = code.textContent
              textarea.style.position = 'fixed' // Avoid scrolling to bottom
              textarea.style.left = '-9999px'
              document.body.appendChild(textarea)
              textarea.focus()
              textarea.select()
              try {
                document.execCommand('copy')
                button.textContent = 'Copied!'
                setTimeout(() => {
                  button.textContent = 'Copy'
                }, 2000)
              } catch (err) {
                console.error('Failed to copy (execCommand): ', err)
                button.textContent = 'Error!'
              } finally {
                document.body.removeChild(textarea)
              }
            } else {
              console.warn('Clipboard API and execCommand not available.');
              button.textContent = 'Not Supported';
            }
          }
          pre.appendChild(button)
        }
      })
    }
  }, [postData])

  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <div className={utilStyles.postLayout}>
        {/* 目次を表示する部分 */}
        {postData.headings && postData.headings.length > 0 && (
          <div className={utilStyles.tocContainer}>
            <h3>目次</h3>
            <ul>
              {postData.headings.map((heading) => (
                <li key={heading.slug} style={{ marginLeft: `${(heading.level - 1) * 1.5}rem` }}>
                  {heading.text}
                </li>
              ))}
            </ul>
          </div>
        )}

        <article className={utilStyles.articleContent}>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            {postData.date}
          </div>
          <div className="blog-content" ref={contentRef} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </div>
    </>
  )
}