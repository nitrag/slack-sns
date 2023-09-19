import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { SNSTransformFunctionDefinition } from "../functions/sns_transform.ts";
import { config } from 'https://deno.land/x/dotenv/mod.ts';

await config({export: true});

/**
 * A workflow is a set of steps that are executed in order.
 * Each step in a workflow is a function.
 * https://api.slack.com/automation/workflows
 */
const SNSAlarmWorkflow = DefineWorkflow({
  callback_id: "process_sns",
  title: "Process SNS",
  description: "Process AWS Cloudwatch alarm received from SNS",
  input_parameters: {
    properties: {
      message: {
        type: Schema.types.string,
        description: "The raw message (JSON) payload received from AWS Cloudwatch Alarm via SNS"
      },
      subscribeUrl: {
        type: Schema.types.string,
        description: "Auto-generated SNS confirmation URL"
      }
    },
    required: ["message"],
  },
});

export const channel_id = Deno.env.get("CHANNEL_ID") ?? "C00X00XXXXX";

const transformFunctionStep = SNSAlarmWorkflow.addStep(
  SNSTransformFunctionDefinition,
  {
    message: SNSAlarmWorkflow.inputs.message,
    subscribeUrl: SNSAlarmWorkflow.inputs.subscribeUrl,
  },
);

SNSAlarmWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: channel_id,
  message: transformFunctionStep.outputs.channelResponse,
});

export default SNSAlarmWorkflow;
