import { Manifest } from "deno-slack-sdk/mod.ts";
import SNSAlarmWorkflow from "./workflows/sns_alarm_workflow.ts";
import { config } from 'https://deno.land/x/dotenv/mod.ts';

const awsRegion = Deno.env.get("AWS_REGION") ?? "us-east-1";

await config({export: true});
/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */
export default Manifest({
  name: "CloudWatch Alarm",
  description: "Creates a Webhook to process AWS Cloudwatch Alarms from a AWS SNS subscriptions.",
  icon: "assets/cloudwatch.png",
  workflows: [SNSAlarmWorkflow],
  outgoingDomains: [
    `sns.${awsRegion}.amazonaws.com`,
  ],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
