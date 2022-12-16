import fs from 'fs'
import path from 'path'

export default async function handler(req, res) {
    const jsonDirectory = await path.join(process.cwd(),'pages', 'resources',req.body+'.json')
    const fileJson = await fs.readFileSync(jsonDirectory)

    const obj = await JSON.parse(fileJson);
    console.log(obj)
    res.status(200).json(obj)
}
  