import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

/**
 * Functions are reusable building blocks of automation that accept
 * inputs, perform calculations, and provide outputs. Functions can
 * be used independently or as steps in workflows.
 * https://api.slack.com/automation/functions/custom
 */
export const SNSTransformFunctionDefinition = DefineFunction({
  callback_id: "sns_transform_function",
  title: "Transform SNS",
  description: "Transforms the SNS payload into something human readable",
  source_file: "functions/sns_transform.ts",
  input_parameters: {
    properties: {
      message: {
        type: Schema.types.string,
        description: "Alarm Message from SNS",
      },
      subscribeUrl: {
        type: Schema.types.string,
        description: "URL to acknowledge a newly created SNS Subscription",
      },
    },
    required: ["message"],
  },
  output_parameters: {
    properties: {
      channelResponse: {
        type: Schema.types.string,
        description: "Formatted response to channel",
      },
    },
    required: ["channelResponse"],
  },
});

export default SlackFunction(
  SNSTransformFunctionDefinition,
  async ({ inputs }) => {
    const { message, subscribeUrl } = inputs;
    if (subscribeUrl) {
      console.log(`Activating SNS Subscription: ${subscribeUrl}`);
      await fetch(subscribeUrl);
      return { outputs: { channelResponse: "SNS Subscription Activated!" } };
    }
    const payload = typeof message === "string" ? JSON.parse(message) : message;
    const { AlarmName, OldStateValue, NewStateValue, NewStateReason } = payload;
    const channelResponse =
      `*${AlarmName}* (_${OldStateValue}_ -> *${NewStateValue}*)\n${NewStateReason.replace('\n', '')}`;
    return { outputs: { channelResponse } };
  },
);
