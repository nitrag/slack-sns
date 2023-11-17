import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assert } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import SNSTransform from "./sns_transform.ts";

const { createContext } = SlackFunctionTester("sns_transform_function");


Deno.test("Test Subscribe", async () => {
  const inputs = { message: "You have chosen to subscribe to the topic arn:aws:sns:us-west-2:123456789012:MyTopic.\nTo confirm the subscription, visit the SubscribeURL included in this message", subscribeUrl: "https://sns.us-west-2.amazonaws.com/?Action=ConfirmSubscription" };
  const { outputs } = await SNSTransform(createContext({ inputs }));
  assert(outputs?.channelResponse.includes("SNS Subscription"));
});


Deno.test("Test Alarm", async () => {
  const inputs = { message: "{\"AlarmName\":\"RDS Prod - CPU Util\",\"AlarmDescription\":\"## RDS Prod - CPU Util %\",\"AWSAccountId\":\"682846136134\",\"AlarmConfigurationUpdatedTimestamp\":\"2023-08-31T13:00:37.714+0000\",\"NewStateValue\":\"OK\",\"NewStateReason\":\"Thresholds Crossed: 1 out of the last 3 datapoints [40.609605060341245 (08/09/23 15:36:00)] was not greater than the upper thresholds [44.47595391472755] (minimum 1 datapoint for ALARM -> OK transition).\",\"StateChangeTime\":\"2023-09-08T15:47:04.677+0000\",\"Region\":\"US West (N. California)\",\"AlarmArn\":\"arn:aws:cloudwatch:us-west-1:12341234:alarm:RDS Prod - CPU Util\",\"OldStateValue\":\"ALARM\",\"OKActions\":[\"arn:aws:sns:us-west-1:12341234:ops-us-west-1\"],\"AlarmActions\":[\"arn:aws:sns:us-west-1:12341234:ops-us-west-1\"],\"InsufficientDataActions\":[],\"Trigger\":{\"Period\":300,\"EvaluationPeriods\":3,\"DatapointsToAlarm\":3,\"ComparisonOperator\":\"GreaterThanUpperThreshold\",\"ThresholdMetricId\":\"ad1\",\"TreatMissingData\":\"missing\",\"EvaluateLowSampleCountPercentile\":\"\",\"Metrics\":[{\"Id\":\"m1\",\"MetricStat\":{\"Metric\":{\"Dimensions\":[{\"value\":\"trailsoffroad-prod-v3\",\"name\":\"DBInstanceIdentifier\"}],\"MetricName\":\"CPUUtilization\",\"Namespace\":\"AWS/RDS\"},\"Period\":300,\"Stat\":\"Average\"},\"ReturnData\":true},{\"Expression\":\"ANOMALY_DETECTION_BAND(m1, 12)\",\"Id\":\"ad1\",\"Label\":\"CPUUtilization (expected)\",\"ReturnData\":true}]}}" };
  const { outputs } = await SNSTransform(createContext({ inputs }));
  assert(outputs?.channelResponse.includes("RDS Prod - CPU Util"));
});
