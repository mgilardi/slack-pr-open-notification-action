"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var url = process.env.SLACK_WEBHOOK_URL;
var prNum = process.env.PULL_REQUEST_NUMBER;
var prTitle = process.env.PULL_REQUEST_TITLE;
var prUrl = process.env.PULL_REQUEST_URL;
var prBody = process.env.PULL_REQUEST_BODY || "No description provided.";
var authorName = process.env.PULL_REQUEST_AUTHOR_NAME;
var authorIconUrl = process.env.PULL_REQUEST_AUTHOR_ICON_URL;
var compareBranchOwner = process.env.PULL_REQUEST_COMPARE_BRANCH_OWNER;
var compareBranchName = process.env.PULL_REQUEST_COMPARE_BRANCH_NAME;
var baseBranchOwner = process.env.PULL_REQUEST_BASE_BRANCH_OWNER;
var baseBranchName = process.env.PULL_REQUEST_BASE_BRANCH_NAME;
var requestedReviewers = process.env.PULL_REQUEST_REQUESTED_REVIEWERS;
var sendHereMention = process.env.IS_SEND_HERE_MENTION.toLowerCase() === "true" ? "<!here>\n" : "";
var prFromFork = process.env.IS_PR_FROM_FORK;
var mainSectionTitleText = prFromFork === "true" ? sendHereMention + "*<" + prUrl + "|" + prTitle + "> (" + baseBranchOwner + "#" + prNum + ")*" : sendHereMention + "*<" + prUrl + "|" + prTitle + ">*";
var compareBranchText = prFromFork === "true" ? "*Compare branch*\n" + compareBranchOwner + ":" + compareBranchName : "*Compare branch*\n" + compareBranchName;
var baseBranchText = prFromFork === "true" ? "*Base branch*\n" + baseBranchOwner + ":" + baseBranchName : "*Base branch*\n" + baseBranchName;
var message = {
    blocks: [
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: mainSectionTitleText
            },
            accessory: {
                type: "image",
                image_url: authorIconUrl,
                alt_text: "github icon"
            },
            fields: [
                {
                    type: "mrkdwn",
                    text: "*Reviewers*\n" + requestedReviewers
                },
                {
                    type: "mrkdwn",
                    text: baseBranchText
                },
                {
                    type: "mrkdwn",
                    text: "*Pull request number*\n#" + prNum
                },
                {
                    type: "mrkdwn",
                    text: compareBranchText
                },
            ]
        },
        {
            type: "section",
            text: {
                type: "plain_text",
                text: prBody,
                emoji: true
            }
        },
    ]
};
//if (requestedReviewers != null) {
    axios_1["default"].post(url, message);
//}
