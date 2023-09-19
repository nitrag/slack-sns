# Slack App: Amazon CloudWatch SNS (HTTPS)

This automation will provide a Webhook (HTTPS URL) which you can configure a SNS subscription
with, allowing Cloudwatch Alarms to be posted to your Slack Channel in a human
readable format.

*Please note that the features in this project requires that the workspace be part of
[a Slack paid plan](https://slack.com/pricing).*

---

### Install the Slack CLI

To use this sample, you need to install and configure the Slack CLI. Step-by-step instructions can be found in our
[Quickstart Guide](https://api.slack.com/automation/quickstart).

### Deployment

Start by cloning this repository:

```zsh
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
```
