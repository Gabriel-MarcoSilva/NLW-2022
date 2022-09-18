import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Togglegroup from '@radix-ui/react-toggle-group'
import { Check, GameController } from 'phosphor-react'
import { useState, useEffect, FormEvent } from 'react'

interface Game {
    id: String,
    title: String,

}

export const ModalDialog = () => {

    const [games, setGames] = useState<Game[]>([])

    const [weekDays, setWeekDays] = useState<String[]>(['0'])

    useEffect(() => {
        fetch('http://localhost:3333/games').
            then(response => response.json()).
            then(data =>
                setGames(data)
            )
    }, [])

    function handleSubmit(e: FormEvent){
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        console.log(data)
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/50 fixed inset-0" />

            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                <Dialog.Title className="text-3xl font-black">Publique um anuncio</Dialog.Title>
                <form className="mt-8 flex flex-col gap-4" onSubmit={() => handleSubmit()}>
                    <div className=" flex flex-col gap-2">
                        <label className="font-semibold" htmlfor="game">Qual o seu game?</label>
                        <select className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500" name="game" >
                            <option>Selecione o jogo que você quer jogar</option>
                            {games.map(game => {
                                return (
                                    <option key={game.id} value={game.id}>{game.title}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className=" flex flex-col gap-2">
                        <label className="font-semibold" htmlfor="name">Qual o seu nome no jogo?</label>
                        <input className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500" name="name" placeholder="Como te chamo dentro do jogo" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold" htmlfor="yearPlaying">Há qto tempo vc joga?</label>
                            <input className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500" name="yearPlaying" type="number" placeholder="tudo bem ser ZERO" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold" htmlfor="discord">Qual o seu discord?</label>
                            <input className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500" name="discord" placeholder="Usuario#00000" />
                        </div>
                    </div>

                    <div className=" flex gap-6">

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold" htmlfor="weekDays">Que dias você joga?</label>
                            <div >
                                <Togglegroup.Root type="multiple" className="grid grid-cols-4 gap-2" onValueChange={setWeekDays} value={weekDays}>
                                    <Togglegroup.Item vlaue='0' className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('0') ? 'bg-violet-500': ''}`} title="domingo"> D</Togglegroup.Item>
                                    <Togglegroup.Item value='1' className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('1') ? 'bg-violet-500': ''}`} title="segunda"> S</Togglegroup.Item>
                                    <Togglegroup.Item value='2' className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('2') ? 'bg-violet-500': ''}`} title="terça"> T</Togglegroup.Item>
                                    <Togglegroup.Item value='3' className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('3') ? 'bg-violet-500': ''}`} title="quarta"> Q</Togglegroup.Item>
                                    <Togglegroup.Item value='4' className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('4') ? 'bg-violet-500': ''}`} title="quinta"> Q</Togglegroup.Item>
                                    <Togglegroup.Item value='5' className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('5') ? 'bg-violet-500': ''}`} title="sexta"> S</Togglegroup.Item>
                                    <Togglegroup.Item value='6' className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('6') ? 'bg-violet-500': ''}`} title="sabado"> S</Togglegroup.Item>
                                </Togglegroup.Root>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label className="font-semibold" htmlfor="hourStart">Em quais horarios você joga?</label>
                            <div className="grid grid-cols-2 gap-1">
                                <input className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500" name="hourStart" type="time" placeholder="De" />
                                <input className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500" name="hourEnd" type="time" placeholder="Até" />
                            </div>
                        </div>

                    </div>

                    <div className="mt-2 flex gap-2 text-sm">
                        <Checkbox.Root className="w-6 h-6 rounded bg-zinc-900">
                            <Checkbox.Indicator>
                                <Check className='w-4 h-4 text-emerald-400 p-1' />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz
                    </div>

                    <footer className=" mt-4 flex justify-end gap-4">
                        <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold"> Cancelar</Dialog.Close>
                        <button type="submit" className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-2">
                            <GameController size={24} />
                            Cadastrar
                        </button>
                    </footer>

                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}