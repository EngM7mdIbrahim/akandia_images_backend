import { Request, Response } from "express";
import getInstaCampaign from "../../models/InstaCampaign/operations/get-instacampaign";
import { BadRequestError } from "../../errors/bad-request-error";
import getDBFile from "../../models/DBFile/operations/get-dbfile";
import resolveCampaignType from "../../utils/resolve-campaign-type";
import { IInstaDeliverable } from "../../models/InstaDeliverable/InstaDeliverable";
import { ServerError } from "../../errors/server-error";

export default async function updateInstaCampaignSharedRouter(req: Request, res: Response) {
    const {
      key,
      uploadALogo: logo,
      description,
      deliverables: rawDeliverables,
      title,
    } = req.body;
    if (logo) {
      const currFile = await getDBFile({ key: logo });
      if (!currFile) throw new BadRequestError("Logo not found!");
    }
    const currCampaign = await getInstaCampaign({ _id: key });
    if (!currCampaign) throw new BadRequestError("Campaign not found!");
    currCampaign.logo = logo ?? currCampaign.logo;
    currCampaign.description = description ?? currCampaign.description;
    currCampaign.deliverables = rawDeliverables
      ? rawDeliverables.map((deliverable: IInstaDeliverable) => ({
          ...deliverable,
          campaign: resolveCampaignType(deliverable.campaign),
          //@ts-ignore
          minFollowers: resolveToNumber(deliverable.minFollowers),
          //@ts-ignore
          maxFollowers: resolveToNumber(deliverable.maxFollowers),
        }))
      : currCampaign.deliverables;
    currCampaign.title = title ?? currCampaign.title;
    try {
      await currCampaign.save();
    } catch (e: any) {
      throw new ServerError("Error while saving your updated campaign!");
    }
    return res.status(200).send({ campaign: currCampaign });
}
