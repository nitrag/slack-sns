# Slack App: Amazon CloudWatch SNS (HTTPS)

This Slack app automation will provide a Webhook (HTTPS URL) which you can configure an AWS SNS (Topic Subscription). 
Allowing Cloudwatch Alarms to be posted to your Slack Channel in a human readable format.

_Please note that the features in this project requires that the workspace be part of
[a Slack paid plan](https://slack.com/pricing)._

_PRs welcome!_

---

Preview: 
![slack-cloudwatch-sns-preview](https://github.com/nitrag/slack-sns/assets/197010/c8252ad6-8bb8-4e0e-aa71-822e3ba00084)


### Install the Slack CLI

To use this sample, you need to install and configure the Slack CLI. Step-by-step instructions can be found in our
[Quickstart Guide](https://api.slack.com/automation/quickstart).

### Deployment

Start by cloning this repository:

```bash
# Install the Slack CLI and login
slack login

# Create the App for your organization
slack create CloudWatch-SNS

# Register the trigger (Required?)
slack trigger create --trigger-def "./triggers/webhook_trigger.ts"

# If you want to test locally:
#  1) create an `.env` file
#  2) Fill in the appropriate values for Channel ID and AWS Region
slack run

# Deploy and receive your webhook URL
slack deploy

# Register your CHANNEL_ID to send the notification to
slack env add CHANNEL_ID C00X00XXXXX

# At this point you can plug the webhook into Topic Subscription,
# this integration will auto-confirm the subscription if setup correctly.
```
