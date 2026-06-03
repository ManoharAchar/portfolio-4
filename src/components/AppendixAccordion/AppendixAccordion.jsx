import { useState } from 'react'
import './AppendixAccordion.css'

import handoffPdf from '../../assets/cooperant/Cooperant Learning Hand off documentation sample.pdf'
import taskByTaskImg from '../../assets/cooperant/Task-by Task.png'
import qaChecklistImg from '../../assets/cooperant/QA Check list.png'
import rawDataImg from '../../assets/cooperant/Raw data.png'
import measurementPlanImg from '../../assets/cooperant/Measurement plan.png'

const ITEMS = [
  {
    title: 'Handoff documentation. Publishing process (V24), template guardrails, content operations brief.',
    type: 'pdf',
    src: handoffPdf,
  },
  {
    title: 'Task-by-task usability results. Completion rates, average times, and first-click accuracy for all 8 tasks. Full data from 20 sessions.',
    type: 'img',
    src: taskByTaskImg,
    alt: 'Task by task usability results',
  },
  {
    title: 'QA checklist. Testing log (V23) covering state transitions, payments, certificates, cross-browser.',
    type: 'img',
    src: qaChecklistImg,
    alt: 'QA checklist',
  },
  {
    title: 'Usability study raw data. SUS scores, NPS, qualitative findings.',
    type: 'img',
    src: rawDataImg,
    alt: 'Usability study raw data',
  },
  {
    title: 'Measurement plan. Event tracking specification for post-launch analytics.',
    type: 'img',
    src: measurementPlanImg,
    alt: 'Measurement plan',
  },
]

export default function AppendixAccordion() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="appendix-accordion">
      {ITEMS.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={i} className={`appendix-item${isOpen ? ' appendix-item--open' : ''}`}>
            <button className="appendix-item__header" onClick={() => setOpenIndex(isOpen ? -1 : i)}>
              <span className="appendix-item__num">{String(i + 1).padStart(2, '0')}</span>
              <span className={`appendix-item__arrow${isOpen ? ' appendix-item__arrow--open' : ''}`}>▸</span>
              <span className="appendix-item__title">{item.title}</span>
            </button>
            <div className={`appendix-item__body${isOpen ? ' appendix-item__body--open' : ''}`}>
              <div className="appendix-item__content">
                {item.type === 'pdf' ? (
                  <iframe src={`${item.src}#toolbar=0`} className="appendix-item__pdf" title={item.title} />
                ) : (
                  <img src={item.src} alt={item.alt} className="appendix-item__img" />
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
