import { useState, useEffect } from 'react'
import './RandomQuoteMachine.css'
import { useQuery } from 'react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const colors = ["#16a085", "#27ae60", "#2c3e50", "#f39c12", "#e74c3c", "#9b59b6", "#FB6964", "#342224", "#472E32", "#BDBB99", "#77B1A9", "#73A857"] as const

interface Quote {
  quote: string
  author: string
}

type Color = typeof colors[number]

interface Style {
  textColor: {color: string}
  backgroundColor: { backgroundColor: string}
}

function RandomQuoteMachine() {
  const [quotes, setQuotes] = useState<Quote[]>([{quote: "", author: ""}])
  const [index, setIndex] = useState<number>(nextRandomIndex)
  const [randomColor, setRandomColor] = useState<Color>(nextRandomColor)
  const [styles, setStyles] = useState<Style>(nextStyles)

  const { isLoading, error, isSuccess, data } = useQuery('quotes', () => {
    return fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json').then(res => {
      return res.json()
    })
  })

  useEffect(() => {
    if (isSuccess) {
      setQuotes(data.quotes)
      nextQuote()
    }
  }, [data])

  function nextRandomIndex(): number {
    return Math.floor(Math.random() * quotes.length)
  }
  function nextRandomColor(): Color {
    return colors[Math.floor(Math.random() * colors.length)]
  }
  function nextStyles(): Style {
    return { textColor: { color: randomColor }, backgroundColor: { backgroundColor: randomColor } }
  }

  function nextQuote(): void {
    setIndex(nextRandomIndex())
    setRandomColor(nextRandomColor())
    setStyles(nextStyles())
    const root = document.getElementById("root")
    if (root) root.style.backgroundColor = randomColor;
  }

  return (
    <>
    <div id="quote-box" style={styles.textColor}>
      {isLoading
        ? (<FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: "5rem" }} />)
        : error
          ? (<h3>Unable to fetch quotes :(</h3>)
          : (
            <div id="inner-container">

              <div id="quote-container">
                <p id="text">"{quotes[index]["quote"]}"</p>{" "}
                <p id="author">
                  - {quotes[index]["author"]}
                </p>
              </div>
              <div id="buttons-container">
                <a
                  id="tweet-quote"
                  href={"https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                    encodeURIComponent(
                      '"' +
                      quotes[0] +
                      '" ' +
                      quotes[0]
                    )}
                  target="_top"
                  title="Tweet this quote!"
                >
                  <FontAwesomeIcon icon={faTwitter} style={styles.textColor} />
                </a>
                <button
                  id="new-quote"
                  onClick={nextQuote}
                  style={styles.backgroundColor}
                >
                  Next Quote
                </button>
              </div>
            </div>
          )}
      <p id="codeAuthor">
        Coded By <b>Raiquen Guidotti</b>
      </p>
    </div>
    <div style={{ position: "absolute", bottom: 0, right: 0, display: "flex", alignItems: "center" }}>
      <p style={{ marginRight: "0.5em" }}>Source Code</p>
      <a href="https://github.com/Kenny1291/random-quote-machine-fcc" target="_blank">
        <FontAwesomeIcon icon={faGithub} style={{ fontSize: "1.5em", color: "black" }} />
      </a>
    </div>
    </>
  )
}

export default RandomQuoteMachine
