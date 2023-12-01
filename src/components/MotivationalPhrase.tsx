import { getRandomQuote } from '../helpers/getRandomQuote';

export const MotivationalPhrase = () => {

  const quote = getRandomQuote();
  return (
    <p className='motivational-phrase'>{quote}</p>
  )
}
