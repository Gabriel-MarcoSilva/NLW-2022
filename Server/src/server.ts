//usando no package json uma tag "type":"module" pode usar o express sem usar o require

//Tsc ->  define o tipo/formato das informações da aplicação

import express from 'express';
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

import { convertHourToMinute } from "./utils/convert-hour-to-minute"
import { convertMinuteToHour } from "./utils/convert-minute-to-hour"

const app = express();
const prisma = new PrismaClient({
    log: ['query']
});

//
//req ->  busca informações
//res ->  devolve uma resposta

app.use(express.json())

app.use(cors())

app.post('/games/:id/ads', async (req, res) => {

    const gameId = req.params.id;

    const body: any = req.body

    const ads = await prisma.ads.create({
        data: {
            gameId,
            name: body.name, 
            yearPlaying: body.yearPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourToMinute(body.hourStart),
            hourEnd: convertHourToMinute(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
      })

    return res.status(201).json(ads)
})

app.get('/games', async (req, res) => {

    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    Ads: true,
                }
            }
        }
    })

    return res.json(games)
})

app.get('/games/:id/ads', async (req, res) => {

    const gameId = req.params.id;

    const ads = await prisma.ads.findMany({

        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId,
        },
        orderBy: {
            createdAt: 'desc',
        }
    })


    return res.json([
        ads.map((ad) => {
            return {
                ...ad,
                weekDays: ad.weekDays.split(','),
                hourStart: convertMinuteToHour(ad.hourStart),
                hourEnd: convertMinuteToHour(ad.hourEnd)
            }
        })
    ])

});

app.get('/ads/:id/discord', async (req, res) => {

    const adId = req.params.id

    const ads = await prisma.ads.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId
        }

    })

    return res.json({ discord: ads.discord })
})

app.listen(3333)