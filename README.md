This is a POC showing how one can interact with [Storj](https://storj.io) using S3 Client.

This repo is the accompanying code base for this blog post {BLOG_POST_URL}

# Setup

Rename `.env.example` to `.env` and provide your credentials. (see the blog post [here]({BLOG_POST_URL}))

Install dependencies

```shell
yarn
```

Run with:

```shell
yarn start
```

**Note**

Before using the **Get** button and the **Delete** button, you'll have first to provide the keys in the code by replacing `{NAME_OF_FILE}` and `{KEY_OF_FILE_TO_DELETE}` respectively.

# MISC

`@ts-check` is used to get some typescript help without using typescript.

`@aws-sdk/s3-request-presigner` isn't necessary to interact with your bucket, it's only so when you need to get a shareable url.
