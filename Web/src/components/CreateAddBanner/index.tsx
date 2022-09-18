import React from 'react'

interface Game {
    title: String,
    bannerUrl: String,
    conAds:  number
}

export const CreateAddBanner = (props: Game) =>{
    return(
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src={props.bannerUrl} className="w-[10rem]" />
          <div className="w-full pt-16 pb-14 px-4 bg-gradient-shadow absolute bottom-0 left-0">
            <strong className="font-bold text-white block">{props.title}</strong>
            <span className="text-zinc-300 text-sm block mt-1">{props.conAds} anuncios (s)</span>
          </div>
        </a>
    )
}

