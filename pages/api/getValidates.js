import fs from 'fs'
import path from 'path'
export default async function handler(req, res) {
    const jsonDirectory = await path.join(process.cwd(),'pages', 'data','validate.json')
    const fileJson = await fs.readFileSync(jsonDirectory)
    const validateObj = await JSON.parse(fileJson);
    res.status(200).json({ isMozilla: validateObj.isMozilla, isEdge: validateObj.isEdge, isChrome: validateObj.isChrome })
}
  