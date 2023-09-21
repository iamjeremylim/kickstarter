import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xa5eB245e585D53d7Ee26F687cf2f1a980232dD77"
);

export default instance;
