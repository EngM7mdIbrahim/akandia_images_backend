import { Request, Response } from "express";
import getInstaCampaign from "../../../models/InstaCampaign/operations/get-instacampaign";

export default async function getSingleInstaCampaignSharedRouter(req: Request, res: Response) {
    const { id } = req.params;
    const currCampaign = await getInstaCampaign({ _id: id });
    return res.status(200).send({ ...currCampaign });
}