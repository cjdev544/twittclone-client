import useTwitt from '../../hooks/useTwitt'
import BasicSpinner from '../../components/BasicSpinner'
import TwittList from '../../components/TwittList'
import './Home.scss'

const Home = () => {
  const { getAllTwitts } = useTwitt()
  const { dataAllTwitts, loadingAllTwitss, errorAllTwitts } = getAllTwitts()

  if (errorAllTwitts) {
    return (
      <h2 className='text-center mt-5'>
        Error al cargar los twitts. Intentalo de nuevo
      </h2>
    )
  }

  if (!loadingAllTwitss && dataAllTwitts?.length === 0) {
    return <h2 className='text-center mt-5'>No se encontro ningún twitt</h2>
  }

  return (
    <div className='home'>
      <div className='home__title'>
        <h2>Inicio</h2>
      </div>
      {loadingAllTwitss ? (
        <BasicSpinner />
      ) : (
        <TwittList twitts={dataAllTwitts} />
      )}
    </div>
  )
}

export default Home
