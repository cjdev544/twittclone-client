import Twitt from './Twitt'
import './TwittList.scss'

const TwittList = ({ twitts }) => {
  return (
    <div className='twitt-list'>
      {twitts?.map((twitt) => (
        <Twitt key={twitt.id} twitt={twitt} />
      ))}
    </div>
  )
}

export default TwittList
