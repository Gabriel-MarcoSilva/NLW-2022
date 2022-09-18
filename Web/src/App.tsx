import './styles/main.css';

import logoImg from './assets/logo.png'

import { CreateAddBanner } from './components/CreateAddBanner';
import { GameSearchCard } from './components/GameSearchCard';
import { useEffect, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { ModalDialog } from './components/ModalDialog';

interface Game {
  id: String,
  bannerUrl: String,
  title: String,
  _cout: {
    Ads: number
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games').
      then(response => response.json()).
      then(data =>
        setGames(data)
      )
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col my-20">
      <img src={logoImg} />

      <h1 className="text-6xl text-white font-black mt-20">Seu <span className="bg-gradient bg-clip-text text-transparent"> duo</span> está aqui</h1>


      <div className="grid grid-cols-6 gap-4 mt-16">
        {
          games.map(game => (
            <CreateAddBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              conAds={game._count.Ads} />
          ))
        }
      </div>

      <Dialog.Root>
        <GameSearchCard />

        <ModalDialog />
      </Dialog.Root>

    </div>
  )
}

export default App
