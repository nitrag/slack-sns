import { Trigger } from "deno-slack-api/types.ts";
import { SNSAlarmWorkflow } from "../workflows/sns_alarm_workflow.ts";
import { TriggerTypes } from "deno-slack-api/mod.ts";

const trigger: Trigger<typeof SNSAlarmWorkflow.definition> = {
  type: TriggerTypes.Webhook,
  name: "AWS Cloudwatch Alarm via SNS Webhook",
  description: "Process AWS Cloudwatch alarm received from SNS",
  workflow: "#/workflows/process_sns",
  inputs: {
    message: {
      value: "{{data.Message}}",
    },
    subscribeUrl: {
      value: "{{data.SubscribeURL}}",
    }
  },
};

export default trigger;