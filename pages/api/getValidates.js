import { setgetValidateBrowser } from "../../public/trustStore/setValidate";

export default async function handler(req, res) {
    const validateObj = setgetValidateBrowser("get");
    console.log(validateObj);
    res.status(200).json({ isMozilla: validateObj.isMozilla, isEdge: validateObj.isEdge, isChrome: validateObj.isChrome })
}
  