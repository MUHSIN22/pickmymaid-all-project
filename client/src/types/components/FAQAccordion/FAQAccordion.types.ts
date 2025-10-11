/**
 * The above type defines the structure of data for a FAQ accordion, which includes a question and its
 * corresponding answer.
 * @property {string} question - A string representing the question being asked in a FAQ (Frequently
 * Asked Questions) section.
 * @property {string} answer - The `answer` property is a string that represents the answer to a
 * frequently asked question (FAQ) in an accordion format. It is part of an interface called
 * `IFAQAccordionData`, which defines the structure of data for an FAQ accordion component.
 */
export type IFAQAccordionData = {
  id: string,
  question: string,
  answer: string,
  links?: {
    title: string,
    link: string
  }[],
  answer2?: string
}