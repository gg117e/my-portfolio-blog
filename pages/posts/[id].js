import { getAllPostIds, getPostData } from '../../lib/posts'
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
  }, [postData]) // Re-run effect if postData changes

  return (
    <div className="py-5">
      <h1 className="display-4 fw-bold mb-3 text-center">{postData.title}</h1>
      <p className="text-muted text-center mb-4">{postData.date}</p>
      <div className="card bg-dark text-white border-secondary p-4">
        <div className="card-body">
          <div className="blog-content" ref={contentRef} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </div>
      </div>
    </div>
  )
}
