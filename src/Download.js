import React, { useState, useEffect } from 'react'
import fileDownload from 'js-file-download'
const Query = require('graphql-query-builder')

export default function Download({ dataset, schema, filter, apiUri }) {
  // Remove offset and limit from filter:
  const copyOfFilter = JSON.parse(JSON.stringify(filter))
  delete copyOfFilter.limit
  delete copyOfFilter.offset

  const downloadQuery = new Query(dataset)
    .find(schema.fields.map((item) => item.name))
    .filter(copyOfFilter)

  let queryString = downloadQuery.toString()

  if (queryString.includes('asc')) {
    queryString = queryString.replace('"asc"', 'asc')
  } else {
    queryString = queryString.replace('"desc"', 'desc')
  }

  const [format, setFormat] = useState('csv')
  const options = ['json', 'csv', 'xlsx']
  const [showSpinner, setShowSpinner] = useState(false)

  const handleChange = (event) => {
    setFormat(event.target.value)
  }

  const downloadData = (extension) => {
    setShowSpinner(true)
    fetch(`${apiUri}download?format=${extension || format}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      responseType: 'blob',
      body: JSON.stringify({
        query: `query Dataset {
                    ${queryString}
                    }
                  `,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          setShowSpinner(false)
          throw new Error(response.statusText)
        }
        return response.blob()
      })
      .then((blob) => {
        fileDownload(
          blob,
          `${dataset}_${new Date().toLocaleDateString()}.${
            extension || format
          }`
        )
        setShowSpinner(false)
      })
      .catch((error) => setShowSpinner(false))
  }

  useEffect(() => {
    // Add event listener to Download buttons outside of React app
    const downloadButtons = document.getElementsByClassName('download-data')
    for (let button of downloadButtons) {
      // When query string is changed, we need to re-attach click event listner
      // to the download buttons. We also need to remove all old event listners.
      // Cloning and replacing the button is one of the options of doing so and
      // it is efficient enough as the element doesn't have children.
      const newButton = button.cloneNode(true)
      const downloadFunction = () => {
        downloadData(newButton.value)
      }
      newButton.addEventListener('click', downloadFunction, true)
      button.parentNode.replaceChild(newButton, button)
    }
  }, [queryString])

  return (
    <>
      {showSpinner && (
        <div className="spinner-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 animate-spin"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </div>
      )}
      <div className="data-download-default">
        <button
          onClick={() => downloadData()}
          data-testid="download-data"
          className="border border-black rounded py-1 px-2"
        >
          {' '}
          Download CSV{' '}
        </button>
      </div>
    </>
  )
}
