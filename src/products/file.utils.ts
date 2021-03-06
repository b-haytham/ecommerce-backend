import * as fs from 'fs/promises'
import * as express from 'express'
import * as path from 'path' 

export const removeFile = async (filePath: string | Array<string>) => {

    if(Array.isArray(filePath)) {
       return filePath.forEach(async (f) => await fs.unlink(path.join(__dirname, '..', '..', `public${f}`)))
    } else {
       return await fs.unlink(path.join(__dirname, '..', '..', `public${filePath}`))
    }

}

export const getPaths = (files: Array<Express.Multer.File>) => {
    return files.map(f => f.path.split('/public')[1])
}

export const pathToUrl = (path: string | Array<string>, req: express.Request) => {
    if(Array.isArray(path)) {
        return path.map(p => `${req.protocol}://${req.hostname}:3000${p}`)
    }else {
        return `${req.protocol}://${req.hostname}:3000${path}`
    }
}