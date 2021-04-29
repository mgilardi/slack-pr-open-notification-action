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
var sendHereMention = process.env.IS_SEND_HERE_MENTION.toLowerCase() === "true" ? "<!here>\n" : "";
var requestedReviewers = JSON.parse(process.env.PULL_REQUEST_REQUESTED_REVIEWERS);
var requestedReviewersExist = Object.keys(requestedReviewers).length === 0 ? "false" : "true"
var prFromFork = process.env.IS_PR_FROM_FORK;
var mainSectionTitleText = prFromFork === "true" ? sendHereMention + "*<" + prUrl + "|" + prTitle + "> (" + baseBranchOwner + "#" + prNum + ")*" : sendHereMention + "*<" + prUrl + "|" + prTitle + ">*";
var compareBranchText = prFromFork === "true" ? "*Compare branch*\n" + compareBranchOwner + ":" + compareBranchName : "*Compare branch*\n" + compareBranchName;
var baseBranchText = prFromFork === "true" ? "*Base branch*\n" + baseBranchOwner + ":" + baseBranchName : "*Base branch*\n" + baseBranchName;
var requestedReviewersText = "";

if (requestedReviewersExist === "true") {
    for (var i = 0; i < requestedReviewers.length; i++) {
        if (i == requestedReviewers.length - 1) {
            requestedReviewersText = requestedReviewersText.concat(requestedReviewers[i].login);
        } else {
            requestedReviewersText = requestedReviewersText.concat(requestedReviewers[i].login + ", ");
        }
    }
}

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
                    text: "*Author*\n" + authorName
                },
                {
                    type: "mrkdwn",
                    text: baseBranchText
                },
                {
                    type: "mrkdwn",
                    text: "*Reviewers*\n#" + requestedReviewersText
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

if (requestedReviewersExist === "true") {
    axios_1["default"].post(url, message);
}
