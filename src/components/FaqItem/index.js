import './index.css'

const FaqItem = props => {
  const {eachData} = props
  const {question, answer} = eachData
  return (
    <li className="faq-list-container">
      <p className="question">{question}</p>
      <p className="answer">{answer}</p>
    </li>
  )
}
export default FaqItem
