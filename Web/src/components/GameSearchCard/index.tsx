import { MagnifyingGlassPlus } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog';

export const GameSearchCard = () => {
    return (

        <div className="pt-1 bg-gradient self-stretch rounded-lg overflow-hidden mt-8">
            <div className="bg-[#2a2634] px-8 py-6 flex justify-between items-center">
                <div>
                    <strong className="text-2xl text-white block"> Não encontrou seu duo?</strong>
                    <span className="text-zinc-400 block"> Publique um anuncio para encontrar novos players!</span>
                </div>
                {/* dialog trigger que faz o modal abrir */}
                <Dialog.Trigger className="py-3 px-4 text-white bg-violet-500 rounded-lg hover:bg-violet-600 flex items=-center gap-3">
                    <MagnifyingGlassPlus size={24} /> publicar anuncio
                </Dialog.Trigger>
            </div>
        </div>

    )
}